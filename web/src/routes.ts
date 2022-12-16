import Login from '@/pages/login/login.vue';
import Home from '@/pages/dashboard/home.vue';
import useAuth from '@/hooks/useAuth';
import { createRouter, createWebHistory } from 'vue-router';

const checkAuthentication = async () => {
  const { getLocalSession } = useAuth();
  const session = getLocalSession();
  if (session) return true;
  return { path: '/login', component: Login };
};

const routes = [
  { path: '/', component: Home, beforeEnter: checkAuthentication },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
