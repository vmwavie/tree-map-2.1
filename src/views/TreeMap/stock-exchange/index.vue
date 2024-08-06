<template>
  <div>
    <div
      class="notification fixed top-5 left-1/2 transform -translate-x-1/2 bg-primaryLight dark:bg-primaryDark text-center p-5 z-50 flex items-center md:flex hidden"
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
    <div v-if="fetchDataError" class="flex justify-center items-center min-h-screen">
      <p class="text-black dark:text-white text-xl font-bold">
        Ocorreu um erro ao obter os dados, tente com outros parâmetros ou mais tarde.
      </p>
    </div>
    <div v-else>
      <div class="w-screen h-screen relative font-sans overflow-hidden" id="treemap"></div>
      <ModalItem v-if="selectedNode" :item="selectedNode" :closeModal="closeModal"></ModalItem>
    </div>
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
  fetchDataError = false;

  async mounted() {
    const params = this.getUrlParams();
    const brapiData = await this.fetchStockData(params);

    window.addEventListener('keydown', this.handleEscKey);

    if (!brapiData) {
      this.fetchDataError = true;
      return;
    }

    const stockExchangeData = this.transformStockData(brapiData);
    this.renderTreemap(stockExchangeData);
  }

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscKey);
  }

  getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      sortBy: urlParams.get('sort_by') || 'close',
      sortOrder: (urlParams.get('order') || 'desc') as 'desc' | 'asc',
      limit: parseInt(urlParams.get('limit') || '50', 10),
      type: urlParams.get('type') || 'stock',
      sector: urlParams.get('sector') || 'Miscellaneous',
    };
  }

  async fetchStockData(params: any): Promise<BrapiResponse | null> {
    try {
      return await fetchBrapiData(params);
    } catch (error) {
      console.error('Erro fetchstockdata', error);
      return null;
    }
  }

  transformStockData(brapiData: BrapiResponse) {
    return brapiData.stocks.map((stock) => ({
      name: stock.stock,
      value: stock.close,
      data: stock,
    }));
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
    const width = treemap.clientWidth;
    const height = treemap.clientHeight;

    const blocks = this.calculateBlocks(data, totalValue, width, height);
    this.placeBlocks(treemap, blocks, width, height);
  }

  calculateBlocks(
    data: { name: string; value: number; data: any }[],
    totalValue: number,
    width: number,
    height: number
  ) {
    data.sort((a, b) => b.value - a.value);
    return data.map((item) => {
      const area = (item.value / totalValue) * (width * height);
      const blockWidth = Math.sqrt(area * (width / height));
      const blockHeight = area / blockWidth;
      return { ...item, blockWidth, blockHeight };
    });
  }

  placeBlocks(treemap: HTMLElement, blocks: Block[], width: number, height: number) {
    let currentRow: Block[] = [];
    let currentRowWidth = 0;
    let currentRowHeight = 0;
    let y = 0;

    const placeRow = () => {
      let rowX = 0;
      currentRow.forEach((block) => {
        const blockElement = this.createBlockElement(
          block,
          currentRowHeight,
          rowX,
          y,
          width,
          height,
          blocks
        );
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

  createBlockElement(
    block: Block,
    currentRowHeight: number,
    rowX: number,
    y: number,
    width: number,
    height: number,
    blocks: Block[]
  ) {
    const blockElement = document.createElement('div');
    blockElement.className = 'block';
    blockElement.style.width = `${block.blockWidth}px`;
    blockElement.style.height = `${currentRowHeight}px`;
    blockElement.style.left = `${rowX}px`;
    blockElement.style.top = `${y}px`;
    blockElement.style.backgroundColor = `rgb(255, ${Math.round(
      (block.value / Math.max(...blocks.map((b: Block) => b.value))) * 255
    )}, 0)`;

    blockElement.addEventListener('click', () => {
      this.selectedNode = { stock: block.name, close: block.value, data: block.data };
    });

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = `nome: ${block.name} | close:${block.value}`;
    blockElement.appendChild(label);

    return blockElement;
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
  font-size: 14px;
  padding: 2px;
  color: rgb(17, 17, 17);
}
</style>
