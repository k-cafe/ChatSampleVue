import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '@/views/SignIn.vue';
import Chat from '@/views/Chat.vue';
import store from './store';
import types from './store/modules/mutation-types/user';
import { auth } from './repositories/database';
import { User } from './models';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: { requiresAuth: true }
    },
  ],
});

// auth.onAuthStateChangedはObserverのため、
// unsubscribeをしなければ残り続けメモリリークの可能性があるため、
// 逐一unsubscribeする
let authWatcher = null;

router.beforeEach((to, from, next) => {
  const isAuthRequired = to.matched.some(record => record.meta.requiresAuth);
  if (!isAuthRequired) {
    next();
    return;
  }

  if (authWatcher !== null) {
    authWatcher();
  }

  authWatcher = auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser === null) {
      next({path: '/', query: { redirect: to.fullPath }});
      return;
    }

    // store内のデータは初回起動時には初期化されていないため自分でデータをセットする
    const user = store.getters['user/user'];
    if (user === null || typeof user === 'undefined') {
      store.commit(`user/${types.ADD}`, new User(firebaseUser.uid, firebaseUser.displayName, firebaseUser.email));
    }
    next();
  });
});