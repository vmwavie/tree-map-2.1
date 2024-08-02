import integrationsList from '@/constants/integrationsList';
import State from '@/interface/store';
import { stripAccents } from '@/utils/str';

const homeMutations = {
  SET_SEARCH_INPUT(state: State, searchInput: string) {
    state.home.searchInput = searchInput;
  },
  UPDATE_INTEGRATIONS_LIST(state: State, searchInput: string) {
    const formattedSearchInput = stripAccents(searchInput);
    state.home.integrationsList = integrationsList.filter((integration) =>
      stripAccents(integration.name).includes(formattedSearchInput)
    );
  },
  SET_INTEGRATION_ID(state: State, integrationId: number) {
    state.home.integrationId = integrationId;
  },
};

export default homeMutations;
