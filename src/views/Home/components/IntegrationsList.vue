<template>
  <div class="mt-7 w-11/12 md:w-8/12">
    <ul class="list-none p-0 w-full" v-if="integrations.length > 0">
      <li
        v-for="item in integrations"
        :key="item.id"
        class="flex items-center mb-3 list-border p-3 w-full select-none cursor-pointer"
        @click="$emit('open-filter', item.id)"
        @keydown.enter="$emit('open-filter', item.id)"
        role="button"
        tabindex="0"
      >
        <img alt="Vue logo" :src="item.logo" class="w-10 h-10 mr-2.5" />
        <p class="text-black dark:text-white">{{ item.name }}</p>
      </li>
    </ul>
    <p v-else class="text-center text-gray-500 dark:text-gray-400">Nenhum gráfico encontrado.</p>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import '@/styles/components/IntegrationList.scss';

export default {
  computed: {
    ...mapGetters({
      integrations: 'getIntegrationsList',
    }),
  },
};
</script>
