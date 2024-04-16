<!--
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-07-27 10:44:08
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-11 03:16:04
 * @FilePath: \wap\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
import { mapActions } from "vuex"
import api from "@/api/index"
export default {
	data(){
		return{

		}
	},

	async onLaunch() {
		try {
			const systemInfo = await uni.$u.http.get(api.getSystemInfo)
			this.A_UPDATE_BASE(systemInfo.data.info.base)
			this.A_UPDATE_FILE(systemInfo.data.info.file)
			this.A_UPDATE_PAY(systemInfo.data.info.pay)



			// 这里小程序可能需要处理
		
			// #ifdef H5
			// if (this.$route.path == '/') {
			// 	this.A_UPDATE_CURRENT(0)
			// }
			// if (this.$route.path == '/feed') {
			// 	this.A_UPDATE_CURRENT(1)
			// }
			// if (this.$route.path == '/notice') {
			// 	this.A_UPDATE_CURRENT(2)
			// }
			// if (this.$route.path == '/account') {
			// 	this.A_UPDATE_CURRENT(3)
			// }
			// #endif 
			const value = await uni.getStorageSync('xpp-token');
			if (value) {
				this.A_UPDATE_TOKEN(value)
				// 获取用户信息
				const res = await uni.$u.http.get(api.getAccountInfo,{custom: {auth: true}})
				if (res.code != 1) {
					console.log(res.message)
				}
				this.A_UPDATE_USER(res.data.info)

				//通知消息
				const noticeRes = await uni.$u.http.get(api.getNoticeCount,{custom: {auth: true}})
				
				this.A_UPDATE_HAVE_NOTICE(noticeRes.data.info)
				
				// let noticeInfo = noticeRes.data.info
				// let count = noticeInfo.follow + noticeInfo.like + noticeInfo.comment + noticeInfo.system
				// this.A_UPDATE_NOTICECOUNT(count)
			}else{
				// this.$Router.push("/login")
			}
		} catch (e) {
			console.log(e)
		}
	},
	onShow(){
		// uni.hideTabBar()
	},
	methods:{
		...mapActions("app",["A_UPDATE_BASE","A_UPDATE_FILE","A_UPDATE_PAY"]),
		...mapActions("user",["A_UPDATE_TOKEN","A_UPDATE_USER"]),
		...mapActions("notice",["A_UPDATE_HAVE_NOTICE"]),
		// ...mapActions("tabbar",["A_UPDATE_NOTICECOUNT","A_UPDATE_CURRENT"]),
	}
}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
