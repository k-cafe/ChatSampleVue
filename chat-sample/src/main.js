import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueFire from 'vuefire'; // if u don't use Vue.Store, u use it, but if no, u use vuexfire
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false

Vue.use(VueMaterial);
Vue.use(VueFire);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
