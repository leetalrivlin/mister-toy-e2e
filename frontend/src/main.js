import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps'
import './scss/main.scss'

Vue.use(ElementUI);
Vue.use(require('vue-moment'));
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyATvXgiBOmv7oHOuec8yoUdOx_4cxw-PYo',
    libraries: 'places',
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
