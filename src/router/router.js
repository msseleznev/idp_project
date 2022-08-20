import MainPage from '@/pages/MainPage';
import { createRouter, createWebHistory } from 'vue-router';
import PostsPage from '@/pages/PostsPage';
import PostPage from '@/pages/PostPage';
import AboutPage from '@/pages/AboutPage';
import PostsPageWishStore from '@/pages/PostsPageWishStore';
import PostsPageCompositionApi from '@/pages/PostsPageCompositionApi';

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/posts/:id',
    component: PostPage
  },
  {
    path: '/store',
    component: PostsPageWishStore
  },
  {
    path: '/composition',
    component: PostsPageCompositionApi
  }
];
const router = createRouter({
  routes,
  history: createWebHistory()

});
export default router;
