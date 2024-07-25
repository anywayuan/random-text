import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router'
import {clearPending} from './utils'

import 'animate.css';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

router.beforeEach((to, from, next) => {
  clearPending()
  next()
})

app.use(router)
app.mount('#app')
