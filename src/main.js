// src/main.js or src/app.js
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router/index.js';
import store from './store'; // Import Vuex store correctly

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // Import Element Plus styles
import * as ElIcons from '@element-plus/icons-vue'; // Import Element Plus icons

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

// Create Vue app instance
const app = createApp(App);

// Use Vuetify, Router, and Vuex in the Vue app instance
app.use(vuetify);
app.use(router);
app.use(store); // Use Vuex store

// Use Element Plus and register icons globally
app.use(ElementPlus);
Object.keys(ElIcons).forEach(key => {
  app.component(key, ElIcons[key]);
});

// Mount the app to the DOM element with id 'app'
app.mount('#app');
