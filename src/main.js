import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
window.axios =axios

import './assets/style.css'

import { 
            Button, 
            Drawer,
            List,
            Menu,
            Table,
            Card,
            Tag,
            Form,
            Input,
            Select,
            Radio,
            Avatar,
            Space,
            message,
            Checkbox,
            Modal,
            Upload,
            InputNumber,
            Tabs,
           
        } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)
app.use(Drawer)
app.use(List)
app.use(Menu)
app.use(Card)
app.use(Table)
app.use(Tag)
app.use(Form)
app.use(Input)
app.use(Select)
app.use(Radio)
app.use(Avatar)
app.use(Space)
app.use(message)
app.use(Checkbox)
app.use(Modal)
app.use(Upload)
app.use(InputNumber)
app.use(Tabs)
app.mount('#app')

app.config.globalProperties.$message = message;
