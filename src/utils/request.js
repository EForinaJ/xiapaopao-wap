module.exports = (vm) => {
	uni.$u.http.setConfig((config) => {
        // /* config 为默认全局配置*/
        // config.baseURL = "http://localhost:8199/v1/index"; /* 根域名 */
		config.baseURL = "/v1/index"; 
		// config.baseURL = vm.BaseUrl; /* 根域名 */
		// config.baseURL = vm.BaseUrl; /* 根域名 */
		// config.baseURL = vm.BaseUrl; /* 根域名 */
		// #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
		config.timeout = 60000 // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
		// #endif
        return config
    })


	
	// 请求拦截
	uni.$u.http.interceptors.request.use(async(config) => { // 可使用async await 做异步操作
		const value = await uni.getStorageSync('xpp-token');
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if(value != '') {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header['Authorization'] = `Bearer ${value}` 
		}
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		if (data.code == -996) { 
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			uni.$u.toast(data.message)
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				// vm.$u.route('/login')
			}, 1500)

			return Promise.reject(data)
		}
		return data === undefined ? {} : data
	}, (response) => { 
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
	
}

// export default {
// 	install
// }