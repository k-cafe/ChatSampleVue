import Vue from 'vue';
import VueRouter from 'vue-router';

import Top from '../components/Top.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top,
    },
  ],
});
