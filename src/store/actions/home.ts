import { Commit } from 'vuex';

const homeActions = {
  setSearchInput({ commit }: { commit: Commit }, searchInput: string) {
    commit('SET_SEARCH_INPUT', searchInput);
  },
  updateIntegrationsList({ commit }: { commit: Commit }, searchInput: string) {
    commit('UPDATE_INTEGRATIONS_LIST', searchInput);
  },
  setIntegrationId({ commit }: { commit: Commit }, integrationId: number) {
    commit('SET_INTEGRATION_ID', integrationId);
  },
};

export default homeActions;
