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
import '@/styles/components/TreeMap.scss';

import { Options, Vue } from 'vue-class-component';
import ModalItem from '@/components/ModalItem.vue';
import * as d3 from 'd3';
import fetchBrapiData from '@/api/brapi';
import { BrapiResponse } from '@/interface/brapi';

interface StockData {
  stock: string;
  close: number;
}

interface ExtendedHierarchyNode extends d3.HierarchyNode<StockData> {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

@Options({
  components: {
    ModalItem,
  },
})
export default class TreeMapStockExchangeView extends Vue {
  showNotification = true;

  selectedNode: ExtendedHierarchyNode | null = null;

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

    const stockExchangeData = brapiData.stocks;

    const renderTreemap = (data: StockData[]) => {
      const treemap = document.getElementById('treemap');
      if (!treemap) return;

      const width = treemap.clientWidth;
      const height = treemap.clientHeight;

      const hierarchy = d3
        .hierarchy<{ children: StockData[] }>({ children: data })
        .sum((d) => (d as unknown as StockData).close)
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

      const createTreemap = d3
        .treemap<{ children: StockData[] }>()
        .size([width, height])
        .paddingInner(1)
        .round(true);

      createTreemap(hierarchy);
      const nodes = hierarchy.leaves() as unknown as ExtendedHierarchyNode[];

      const svg = d3.select('#treemap').append('svg').attr('width', width).attr('height', height);

      const colorScale = d3
        .scaleSequential(d3.interpolateYlOrRd)
        .domain([d3.max(nodes, (d) => d.value ?? 0) ?? 0, 0]);
      const node = svg
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
        .attr('class', 'treemap-node')
        .on('click', (event, d) => {
          this.selectedNode = d;
        });

      node
        .append('rect')
        .attr('class', 'treemap-item')
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .attr('fill', (d) => colorScale(d.value ?? 0));

      node
        .append('text')
        .attr('x', 5)
        .attr('y', 20)
        .text((d) => d.data.stock);

      node
        .append('text')
        .attr('x', 5)
        .attr('y', 40)
        .text((d) => d.data.close);
    };

    renderTreemap(stockExchangeData);

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
</style>
