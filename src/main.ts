import { createApp } from 'vue'
import { createPinia } from 'pinia' // pinia
import piniaPluginPersist from 'pinia-plugin-persist'   // pinia 持久化存储
import App from './App.vue'
import router from './router/index'
import '@/assets/base.scss'    // 引入tailwind css文件
import moment from 'moment' // moment.js
import 'moment/dist/locale/zh-cn'   // 引入本土化
import IconSvg from '@/components/common/IconSvg.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)
app.use(router)
moment.locale('zh-cn')  // 本土化
app.config.globalProperties.$moment = moment
app.component('icon-svg', IconSvg)
app.mount('#app')
