import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router/index.js'; 

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

// Create the Vue app instance
const app = createApp(App);

// Use Vuetify and Router in the Vue app instance
app.use(vuetify);
app.use(router);

// Mount the app to the DOM element with id 'app'
app.mount('#app');
