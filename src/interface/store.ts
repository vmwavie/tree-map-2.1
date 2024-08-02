import integrationsList from '@/interface/integrations';

interface HomeState {
  integrationsList: integrationsList[];
  searchInput: string;
  integrationId: number | null;
}

interface State {
  home: HomeState;
}

export default State;
