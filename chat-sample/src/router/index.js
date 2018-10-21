import Vue from 'vue';
import VueRouter from 'vue-router';

import Top from '../components/Top.vue';
import Chat from '../components/Chat.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
    },
  ],
});
