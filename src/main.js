import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

Vue.config.productionTip = false

import 'bulma/css/bulma.css'; 

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
