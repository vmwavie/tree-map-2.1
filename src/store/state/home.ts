import integrationsList from '@/constants/integrationsList';
import State from '@/interface/store';

const homeState: State['home'] = {
  integrationsList,
  searchInput: '',
  integrationId: null,
};

export default homeState;
