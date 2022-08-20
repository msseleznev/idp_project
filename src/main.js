import { createApp } from 'vue';
import components from '@/components/UI/index';
import directives from '@/directives';
import router from '@/router/router';
import store from '@/store';
import App from './App.vue';

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});
directives.forEach(directive => {
  app.directive(directive.name, directive);
});

app
  .use(router)
  .use(store)
  .mount('#app');
