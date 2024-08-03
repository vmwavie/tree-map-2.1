<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @keydown.esc="closeModal"
    tabindex="0"
    @focus="focusModal"
  >
    <div
      class="w-full h-full md:w-6/12 md:h-auto p-6 border border-gray-300 dark:border-gray-700 bg-primaryLight dark:bg-primaryDark relative md:max-w-6/12 md:rounded-lg"
    >
      <i
        class="pi pi-times absolute top-4 right-4 cursor-pointer text-black dark:text-white"
        @click="closeModal"
        @keydown.enter="closeModal"
        role="button"
        tabindex="0"
      ></i>
      <h1 class="text-center text-black dark:text-white mb-4">
        Parâmetros de busca ( {{ selectedIntegrationName }} )
      </h1>
      <div class="flex flex-col space-y-4">
        <div class="text-left" v-if="selectedIntegrationId == 1">
          <label class="text-sm p-0 font-semibold text-black dark:text-white"> Filtrar Por: </label>
          <select
            class="select-none modal-input bg-primaryLight dark:bg-primaryDark text-black dark:text-white p-2 rounded"
            v-model="sortBy"
          >
            <option
              v-for="sortByOption in brapiSortby"
              :key="sortByOption.value"
              :value="sortByOption.value"
            >
              {{ sortByOption.friendly_text }}
            </option>
          </select>
        </div>
        <div class="text-left">
          <label class="text-sm p-0 font-semibold text-black dark:text-white"> Limite: </label>
          <input
            type="number"
            class="select-none modal-input bg-primaryLight dark:bg-primaryDark text-black dark:text-white p-2 rounded"
            v-model="limit"
          />
        </div>
        <div class="text-left" v-if="selectedIntegrationId == 1">
          <label class="text-sm p-0 font-semibold text-black dark:text-white"> Tipo: </label>
          <select
            class="select-none modal-input bg-primaryLight dark:bg-primaryDark text-black dark:text-white p-2 rounded"
            v-model="type"
          >
            <option
              v-for="typeOption in brapiTypes"
              :key="typeOption.value"
              :value="typeOption.value"
              :disabled="typeOption.disabled"
            >
              {{ typeOption.friendly_text }}
            </option>
          </select>
        </div>
        <div class="text-left" v-if="selectedIntegrationId == 1">
          <label class="text-sm p-0 font-semibold text-black dark:text-white"> Setor: </label>
          <select
            class="select-none modal-input bg-primaryLight dark:bg-primaryDark text-black dark:text-white p-2 rounded"
            v-model="sector"
          >
            <option
              v-for="sectorOption in brapiSectors"
              :key="sectorOption.value"
              :value="sectorOption.value"
            >
              {{ sectorOption.friendly_text }}
            </option>
          </select>
        </div>
        <div class="text-left">
          <label class="text-sm p-0 font-semibold text-black dark:text-white"> Ordenar por: </label>
          <select
            class="select-none modal-input bg-primaryLight dark:bg-primaryDark text-black dark:text-white p-2 rounded"
            v-model="order"
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decendente</option>
          </select>
        </div>
        <button
          class="filter-input dark:bg-secondaryDark dark:hover:bg-secondaryDarkHover rounded-default w-full text-dark py-2 transition duration-200 font-semibold"
          @click="handleFilter"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import '@/styles/components/FilterModal.scss';
import { mapGetters } from 'vuex';
import { useToast } from 'vue-toastify';
import { brapiSectors, brapiTypes, brapiSortby } from '@/constants/brapi-params';
import router from '@/router';

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      selectedIntegrationName: 'getIntegrationName',
      selectedIntegrationId: 'getIntegrationId',
    }),
  },
  setup() {
    const modalRef = ref<HTMLElement | null>(null);
    const order = ref<string>('asc');
    const limit = ref<number | null>(25);
    const type = ref<string>(brapiTypes[0]?.value || '');
    const sector = ref<string>(brapiSectors[0]?.value || '');
    const sortBy = ref<string>(brapiSortby[0]?.value || '');

    function focusModal() {
      if (modalRef.value) {
        modalRef.value.focus();
      }
    }

    onMounted(() => {
      if (modalRef.value) {
        focusModal();
      }
    });

    return {
      modalRef,
      sortBy,
      order,
      limit,
      type,
      sector,
      focusModal,
      brapiSectors,
      brapiTypes,
      brapiSortby,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    handleFilter() {
      try {
        if (this.selectedIntegrationId === 1) {
          console.log('Filtrando resultados com os seguintes parâmetros:');
          console.log('Order:', this.order);
          console.log('Limit:', this.limit);
          console.log('Type:', this.type);
          console.log('Sector:', this.sector);
          console.log('Sort By:', this.sortBy);

          router.push(
            `${'/tree-map/stock-exchange?sort_by='}${this.sortBy}&order=${this.order}&limit=${
              this.limit
            }&type=${this.type}&sector=${this.sector}`
          );
        }
      } catch (error) {
        console.error(error);

        useToast().error({
          body: 'Ocorreu um erro ao filtrar os resultados.',
          canTimeout: true,
        });
      }
    },
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.focusModal();
      }
    },
  },
});
</script>
