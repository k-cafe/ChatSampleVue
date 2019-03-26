import Vue from 'vue';
import VueRouter from 'vue-router';

import Top from '@/views/Top.vue';
import Chat from '@/views/Chat.vue';

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
