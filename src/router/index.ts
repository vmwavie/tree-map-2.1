import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/Home/index.vue';
import TreeMapView from '../views/TreeMap/index.vue';
import TreeMapStockExchangeView from '../views/TreeMap/stock-exchange/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tree-map',
    name: 'tree-map',
    component: TreeMapView,
  },
  {
    path: '/tree-map/stock-exchange',
    name: 'tree-map-stock-exchange',
    component: TreeMapStockExchangeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
