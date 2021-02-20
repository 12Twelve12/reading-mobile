import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import moment from 'moment'//导入文件

Vue.prototype.$moment = moment;//赋值使用

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
