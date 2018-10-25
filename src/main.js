import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router'
import VueCookie from 'vue-cookie'

import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

// require('./assets/css/bootstrap.min.css');
// require('./assets/css/font-awesome.min.css');
// require('./assets/css/nouislider.min.css');
// require('./assets/css/slick-theme.css');
// require('./assets/css/slick.css');
// require('./assets/css/style.css');

// require('./assets/js/bootstrap.min.js');
// require('./assets/js/jquery.min.js');
// require('./assets/js/jquery.zoom.min.js');
// require('./assets/js/main.js');
// require('./assets/js/nouislider.min.js');
// require('./assets/js/slick.min.js');

Vue.use(SuiVue);
Vue.use(VueCookie);
Vue.use(VueResource);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')