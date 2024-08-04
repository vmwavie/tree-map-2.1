<template>
  <div class="modal fixed inset-0 flex items-center justify-center z-50 p-4">
    <div
      class="modal-content bg-white text-black dark:text-white dark:bg-gray-800 p-5 rounded shadow-lg w-full max-w-md relative"
    >
      <button
        @click="closeModal()"
        class="absolute top-2 right-2 text-dark dark:text-white hover:scale-110 transition-transform duration-200"
      >
        <i class="pi pi-times"></i>
      </button>
      <h2 class="text-xl font-bold mb-4 text-center">{{ item.data.stock }}</h2>
      <img :src="item.data.logo" alt="Logo" class="mx-auto mb-4" style="width: 30%" />
      <p>Close: {{ item.data.close }}</p>
      <p>Market Cap: {{ item.data.market_cap }}</p>
      <p>Name: {{ item.data.name }}</p>
      <p>Sector: {{ item.data.sector }}</p>
      <p>Type: {{ item.data.type }}</p>
      <p>Volume: {{ item.data.volume }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
  },
});
</script>
