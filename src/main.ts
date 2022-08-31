import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon/index.vue'
// import ColorPicker from 'colorpicker-v3' // 注册组件
// import 'colorpicker-v3/dist/style.css' // 引入样式文件

import store from './store'

const app = createApp(App)
app.component('svg-icon', svgIcon)
app.use(store)
// .use(ColorPicker)
app.mount('#app')
