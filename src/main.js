import Vue from 'vue'
import App from './App.vue'
import UI from '../packages';
//use自动执行install方法
Vue.use(UI);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
