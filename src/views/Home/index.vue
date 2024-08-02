<template>
  <div class="flex pt-12 flex-col items-center min-h-screen bg-primaryLight dark:bg-primaryDark">
    <transition name="fade">
      <FilterModal
        v-if="isModalOpen"
        @close="isModalOpen = false"
        :isVisible="isModalOpen"
        :selectedIntegrationId="selectedIntegrationId"
      />
    </transition>
    <SearchInput />
    <IntegrationsList @open-filter="openFilterModal" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Action, State } from 'vuex-class';
import SearchInput from './components/SearchInput.vue';
import IntegrationsList from './components/IntegrationsList.vue';
import FilterModal from './components/FilterModal.vue';

@Options({
  components: {
    SearchInput,
    IntegrationsList,
    FilterModal,
  },
})
export default class HomeView extends Vue {
  isModalOpen = false;

  @State('integrationId') selectedIntegrationId!: number;

  @Action('setIntegrationId') setIntegrationId!: (integrationId: number) => void;

  openFilterModal(integrationId: number) {
    this.setIntegrationId(integrationId);
    this.isModalOpen = true;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
