<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
		<!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="false"
	
			:border="false">
			<view class="u-nav-slot"
				slot="right">
				<u-button 
				type="primary"
				size="mini"
				text="发布" 
				@click="submit"></u-button>
			</view>
		</u-navbar>
		
		<view class="u-page">
			<u--form
					labelPosition="top"
					labelWidth="100"
					:model="form"
					:rules="rules"
					ref="uForm"
			>
				<u-form-item
					label="标题"
					prop="title"
					borderBottom
					ref="item1"
				>
					<u--input
						v-model="form.title"
						border="none"
						placeholder="请输入标题"
					></u--input>
				</u-form-item>
				<u-form-item
					label="描述"
					prop="description"
					borderBottom
					ref="item1"
				>
					<u--textarea 
						v-model="form.description"
						border="none"
						placeholder="请输入描述"
					></u--textarea>
				</u-form-item>
				<u-form-item
					label="类型"
					prop="type"
					borderBottom
					@click="showType = true;"
					ref="item1"
				>
					<u--input
							v-model="form.type"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择需求类型"
							border="none"
					></u--input>
					<u-icon
							slot="right"
							name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
					label="直播"
					prop="isLive"
					borderBottom
					@click="showIsLive = true;"
					ref="item1"
				>
					<u--input
							v-model="form.isLive"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择是否需要直播"
							border="none"
					></u--input>
					<u-icon
							slot="right"
							name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
					label="游戏登录平台"
					prop="gamePlatform"
					borderBottom
					ref="item1"
				>
					<u--input
						v-model="form.gamePlatform"
						border="none"
						placeholder="请输入游戏登录平台"
					></u--input>
				</u-form-item>
				<u-form-item
					label="任务周期"
					prop="timeLimit"
					borderBottom
					ref="item1"
				>
					<u--input
						type="number"
						v-model="form.timeLimit"
						border="none"
						placeholder="请输入周期（类型为代练单位是天，陪玩则是小时）"
					></u--input>
				</u-form-item>
				<u-form-item
					label="联系方式"
					prop="type"
					borderBottom
					@click="showContactMode = true;"
					ref="item1"
				>
					<u--input
						v-model="form.contactMode"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择需求类型"
						border="none"
					></u--input>
					<u-icon
						slot="right"
						name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
					label="联系号码"
					prop="contactNumber"
					borderBottom
					ref="item1"
				>
					<u--input
						v-model="form.contactNumber"
						border="none"
						placeholder="请输入联系号码"
					></u--input>
				</u-form-item>
				<u-form-item
					label="需求预算"
					prop="price"
					borderBottom
					ref="item1"
				>
					<u--input
						type="number"
						v-model="form.price"
						border="none"
						placeholder="请输入需求预算"
					></u--input>
				</u-form-item>
				<u-form-item
					label="分类"
					prop="type"
					borderBottom
					@click="showCate = true;"
					ref="item1"
				>
					<u--input
						v-model="form.cate"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择分类"
						border="none"
					></u--input>
					<u-icon
						slot="right"
						name="arrow-right"
					></u-icon>
				</u-form-item>
			</u--form>
		</view>
		<view>
			<u-action-sheet
					:show="showType"
					:actions="typeList"
					title="请选择需求类型"
					@close="showType = false"
					@select="typeSelect"
			>
			</u-action-sheet>
			<u-action-sheet
					:show="showIsLive"
					:actions="isLiveList"
					title="请选择是否需要直播"
					@close="showIsLive = false"
					@select="isLiveSelect"
			>
			</u-action-sheet>
			<u-action-sheet
					:show="showContactMode"
					:actions="contactModeList"
					title="请选择联系方式"
					@close="showContactMode = false"
					@select="contactModeSelect"
			>
			</u-action-sheet>
			<u-picker
			@cancel="showCate = false"
			 @confirm="cateSelect"
			  :show="showCate" 
			  :columns="cateList" 
			  keyName="name"></u-picker>
		</view>
	</view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
export default {
	components:{
	},

	data() {
		return {
			showType: false,
			showIsLive: false,
			showContactMode: false,
			showCate: false,
			typeList: [
				{
					name: '代打',
					value: 1
				},
				{
					name: '陪玩',
					value: 2
				}
			],
			isLiveList: [
				{
					name: '否',
					value: 1
				},
				{
					name: '是',
					value: 2
				}
			],
			contactModeList: [
				{
					name: 'QQ',
					value: 1
				},
				{
					name: '微信',
					value: 2
				}
			],
			cateList: [],

			form: {
				title:'',
				description: '',
				type: '',
				typeValue: '',
				isLive: '',
				isLiveValue: '',
				gamePlatform: '',
				timeLimit: '',
				contactMode: '',
				contactModeValue: '',
				contactNumber: '',
				price: '',
				cateId: '',
				cate: '',
			},
			rules: {
				'title': {
					type: 'string',
					required: true,
					message: '请输入标题',
					trigger: ['blur', 'change']
				},
				gamePlatform:{ required: true, message: '请设置游戏启动平台', trigger: ['blur', 'change'] },
				cateId:{ required: true, message: '请设置分类',  trigger: ['blur', 'change'] },
				contactMode:{ required: true, message: '请设置联系方式',  trigger: ['blur', 'change'] },
				contactNumber:{ required: true, message: '请设置联系号码',  trigger: ['blur', 'change'] },
				type:{ required: true, message: '请设置需求类型',  trigger: ['blur', 'change'] },
				price:{ required: true, message: '请设置需求费用',  trigger: ['blur', 'change'] },
				isLive:	{ required: true, message: '请设置是否直播',  trigger: ['blur', 'change'] },
				timeLimit:{ required: true, message: '请设置需求周期',  trigger: ['blur', 'change'] },
			},
		}
	},
	computed:{
		...mapState("app",["file"]),
		...mapState("user",["token"]),
		// ...mapState("topic",["groupInfo","files","title"])
	},
	onLoad() {
		if (this.token == null) {
			// uni.$u.http.route({
			// 	url: '/login'
			// })

			this.$Router.push({ path: '/login'})
			return
		}
		this.getData()
	},
	methods: {
		async getData(){
            try {
				const res = await uni.$u.http.get(api.getProjectMeta,{

					custom: {auth: true},
				})
				if (res.code != 1) {
					this.$refs.uToast.show({
						title: res.message,
						type: 'error',
					})
					return
				}
				
                const catelist = res.data.cateList == null ? [] : res.data.cateList.map((item)=>{
					return {
						"name":item.title,
						"id":item.cateId,
					}
				})
				this.cateList = [catelist]
                
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },

		async submit() {
			try {
				if (this.token == null) {
					uni.$u.http.route({
						url: '/login'
					})
					return
				}
				this.$refs.uForm.validate().then(res => {
					let formData = {}
				
					formData = Object.assign(formData,this.form)
			
					formData.isLive= formData.isLiveValue
					formData.contactMode= formData.contactModeValue
					formData.type= formData.typeValue
				
					this.postCreate(formData)
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			
			} catch (error) {
				console.log(error)
			}
		},
		typeSelect(e) {
			this.form.type = e.name
			this.form.typeValue = e.value
			this.$refs.uForm.validateField('form.type')
		},
		isLiveSelect(e) {
			this.form.isLive = e.name
			this.form.isLiveValue = e.value
			this.$refs.uForm.validateField('form.isLive')
		},
		contactModeSelect(e) {
			this.form.contactMode = e.name
			this.form.contactModeValue = e.value
			this.$refs.uForm.validateField('form.contactMode')
		},
		cateSelect(e) {
			this.form.cate = e.value[0].name
			this.form.cateId =e.value[0].id
			this.$refs.uForm.validateField('form.cate')
			this.showCate = false
		},
		customBack(){
			this.$Router.back()
		},
		async postCreate(formData){
            try {
                const res = await uni.$u.http.post(api.postProjectCreate,formData,{
                    custom: {auth: true},
                })
                if (res.code!=1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
				this.$Router.push("/")
            } catch (error) {
                setTimeout(() => {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                }, 1000)
            }
        },
	}
}
</script>

<style lang="scss" scoped>
.u-page{
	margin: 0 30rpx;

}
</style>