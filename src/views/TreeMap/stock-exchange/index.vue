<template>
  <div>
    <div
      class="notification fixed top-5 left-1/2 transform -translate-x-1/2 bg-primaryLight dark:bg-primaryDark text-center p-5 z-50 flex items-center"
      v-if="showNotification"
    >
      <p class="text-black dark:text-white flex-grow select-none">
        Pressione a tecla ESC para voltar à tela anterior
      </p>
      <button
        @click="closeNotification"
        class="ml-2 hover:scale-110 transition-transform duration-200"
      >
        <i class="pi pi-times text-black dark:text-white"></i>
      </button>
    </div>
    <div class="w-screen h-screen relative font-sans overflow-hidden" id="treemap"></div>
    <ModalItem v-if="selectedNode" :item="selectedNode" :closeModal="closeModal"></ModalItem>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import '@/styles/components/TreeMap.scss';

import { Options, Vue } from 'vue-class-component';
import ModalItem from '@/components/ModalItem.vue';
import fetchBrapiData from '@/api/brapi';
import { BrapiResponse } from '@/interface/brapi';

interface StockData {
  stock: string;
  close: number;
  data: any;
}

interface Block {
  name: string;
  value: number;
  blockWidth: number;
  blockHeight: number;
  data: any;
}

@Options({
  components: {
    ModalItem,
  },
})
export default class TreeMapStockExchangeView extends Vue {
  showNotification = true;

  selectedNode: StockData | null = null;

  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const sortBy = urlParams.get('sort_by') || 'close';
    const sortOrder = (urlParams.get('order') || 'desc') as 'desc' | 'asc';
    const limit = parseInt(urlParams.get('limit') || '50', 10);
    const type = urlParams.get('type') || 'stock';
    const sector = urlParams.get('sector') || 'Miscellaneous';

    const brapiData: BrapiResponse = await fetchBrapiData({
      sortBy,
      sortOrder,
      limit,
      type,
      sector,
    });

    console.log('Fetched Brapi data:', brapiData);

    if (!brapiData) return;

    const stockExchangeData = brapiData.stocks.map((stock) => ({
      name: stock.stock,
      value: stock.close,
      data: stock,
    }));

    this.renderTreemap(stockExchangeData);

    window.addEventListener('keydown', this.handleEscKey);
  }

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscKey);
  }

  handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.$router) {
        this.$router.push('/');
      } else {
        window.location.href = window.location.origin;
      }
    }
  }

  closeNotification() {
    this.showNotification = false;
  }

  closeModal() {
    this.selectedNode = null;
  }

  renderTreemap(data: { name: string; value: number; data: any }[]) {
    const treemap = document.getElementById('treemap');
    if (!treemap) return;

    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const x = 0;
    let y = 0;
    const width = treemap.clientWidth;
    const height = treemap.clientHeight;

    data.sort((a, b) => b.value - a.value);
    const blocks: Block[] = data.map((item) => {
      const area = (item.value / totalValue) * (width * height);
      const blockWidth = Math.sqrt(area * (width / height));
      const blockHeight = area / blockWidth;
      return { ...item, blockWidth, blockHeight };
    });

    let currentRow: Block[] = [];
    let currentRowWidth = 0;
    let currentRowHeight = 0;

    const placeRow = () => {
      let rowX = 0;
      currentRow.forEach((block) => {
        const blockElement = document.createElement('div');
        blockElement.className = 'block';
        blockElement.style.width = `${block.blockWidth}px`;
        blockElement.style.height = `${currentRowHeight}px`;
        blockElement.style.left = `${rowX}px`;
        blockElement.style.top = `${y}px`;
        blockElement.style.backgroundColor = `rgb(255, ${Math.round(
          ((block.value * width) / block.blockWidth) * 2
        )}, 0)`;

        blockElement.addEventListener('click', () => {
          this.selectedNode = { stock: block.name, close: block.value, data: block.data };
        });

        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = `${block.name}\n${block.value}`;
        blockElement.appendChild(label);
        treemap.appendChild(blockElement);

        rowX += block.blockWidth;
      });
      y += currentRowHeight;
      currentRow = [];
      currentRowWidth = 0;
      currentRowHeight = 0;
    };

    blocks.forEach((block) => {
      if (currentRowWidth + block.blockWidth > width) {
        const scaleFactor = width / currentRowWidth;
        currentRow = currentRow.map((rowBlock) => ({
          ...rowBlock,
          blockWidth: rowBlock.blockWidth * scaleFactor,
          blockHeight: rowBlock.blockHeight * scaleFactor,
        }));
        placeRow();
      }
      currentRow.push(block);
      currentRowWidth += block.blockWidth;
      currentRowHeight = Math.max(currentRowHeight, block.blockHeight);
    });

    if (currentRow.length > 0) {
      const scaleFactor = width / currentRowWidth;
      currentRow = currentRow.map((rowBlock) => ({
        ...rowBlock,
        blockWidth: rowBlock.blockWidth * scaleFactor,
        blockHeight: rowBlock.blockHeight * scaleFactor,
      }));
      placeRow();
    }
  }
}
</script>

<style scope>
.treemap-node {
  cursor: pointer;
}
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  max-width: 30%;
}
.block {
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #000;
}
.label {
  font-size: 12px;
  padding: 2px;
}
</style>
