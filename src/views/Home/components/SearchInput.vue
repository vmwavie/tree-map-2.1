<template>
  <div class="mt-7 w-11/12 md:w-8/12">
    <input
      type="text"
      class="search-input bg-primaryLight dark:bg-primaryDark text-black dark:text-white"
      placeholder="Qual gráfico você deseja ver?"
      v-model="searchInput"
      @blur="handleChangeSearchInput"
    />
  </div>
</template>

<script lang="ts">
import '@/styles/components/SearchInput.scss';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      searchInput: '',
    };
  },
  methods: {
    ...mapActions(['setSearchInput', 'updateIntegrationsList']),
    handleChangeSearchInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.setSearchInput(target.value);
      this.updateIntegrationsList(target.value);
    },
  },
};
</script>
