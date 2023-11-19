import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'hover.css'
import { Message } from "element-ui";
import './permission'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(Antd);
Vue.prototype.$message = Message
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;

  if (reason instanceof Error) {
    console.error(reason.message);

  } else {
    Message.error(reason)
  }
}
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
