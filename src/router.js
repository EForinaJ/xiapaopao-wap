/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2021-12-06 10:27:18
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-11 02:33:46
 * @FilePath: \wap\src\router.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// router.js
import {RouterMount,createRouter} from 'uni-simple-router';
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES,{
		path: '*',
		redirect:(to)=>{
			return {path:'/404'}
		}
	  },]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束')
})

export {
	router,
	RouterMount
}