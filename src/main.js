import { createApp } from 'vue';
import components from '@/components/UI/index';
import router from '@/router/router';
import App from './App.vue';

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});
app.use(router).mount('#app');
