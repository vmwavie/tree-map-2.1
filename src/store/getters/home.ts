import State from '@/interface/store';

const homeGetters = {
  getIntegrationsList: (state: State) => state.home.integrationsList,
  getIntegrationId: (state: State) => state.home.integrationId,
  getIntegrationName: (state: State) =>
    state.home.integrationId !== null
      ? state.home.integrationsList[state.home.integrationId - 1].name
      : '',
};

export default homeGetters;
