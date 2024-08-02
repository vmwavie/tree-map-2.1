import { createApp } from 'vue';
import type { Settings } from 'vue-toastify';
import plugin from 'vue-toastify';
import App from './App.vue';
import 'vue-toastify/index.css';

import router from './router';
import store from './store';
import './styles/globals.scss';

createApp(App)
  .use(store)
  .use(router)
  .use<Settings>(plugin, {
    theme: 'dark',
    hideProgressbar: false,
    position: 'top-right',
    pauseOnHover: true,
    draggable: true,
  })
  .mount('#app');
