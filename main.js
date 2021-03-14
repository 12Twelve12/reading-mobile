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

const addLog = (val)=>{
	let websiteUrl = getApp().globalData.base_ip + 'log/insert';
	uni.request({
		url: websiteUrl,
		method: 'POST',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
			// 'Content-Type': 'application/json',
			// token : uni.getStorageSync("TOKEN")
		},
		dataType: 'json',
		data: val,
		success: res => {
	
		},
		fail: () => {},
		complete: () => {}
	});
}

Vue.prototype.$uniApi={addLog};
