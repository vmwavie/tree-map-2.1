import { createStore } from 'vuex';
import State from '@/interface/store';
import homeState from './state/home';
import homeGetters from './getters/home';
import homeMutations from './mutations/home';
import homeActions from './actions/home';

export default createStore<State>({
  state: {
    home: {
      ...homeState,
    },
  },
  getters: {
    ...homeGetters,
  },
  mutations: {
    ...homeMutations,
  },
  actions: {
    ...homeActions,
  },
});
