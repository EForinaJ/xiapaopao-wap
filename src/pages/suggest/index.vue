<template>
    <view >
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="false"
			title="意见反馈"
			:border="false">
		</u-navbar>

        <view class="u-page">
            <u-gap height="20" bg-color="#ffffff" />
            <u-form :model="form"
                :rules="rule"
                ref="uForm">
                <u-form-item 
                :border-bottom="false" 
                prop="content">
                    <u--textarea
                    border="surround"
                    :placeholder="'请输入反馈内容'"
                    :clearable="false"
                    :type="'text'"
                    v-model="form.content" />
                </u-form-item>
                <u-form-item 
                label="联系方式"
                labelWidth="80"
                :border-bottom="false" 
                prop="connectMode">
                    <u-radio-group 
                        v-model="form.connectMode"
                        placement="row">
                        <u-radio 
                        :customStyle="{marginRight: '16px'}"
                        name="1" 
                        label="QQ"/>
                        <u-radio 
                        name="2" 
                        label="微信"/>
                    </u-radio-group>
                </u-form-item>
                <u-form-item 
                :border-bottom="false" 
                prop="connectNumber">
                    <u--input
                    border="surround"
                    :placeholder="'请输入联系号码'"
                    :clearable="false"
                    :type="'text'"
                    v-model="form.connectNumber" />
                </u-form-item>

            </u-form>
            <u-gap height="10" bg-color="#ffffff" />
			<view class="image-list">
				<Upload @uploadFile="uploadFile" :maxCount="9"/>
			</view>
			<u-gap height="10" bg-color="#ffffff" />
            <u-button @click="submit" 
            type="primary" 
            text="确认修改"></u-button>
        </view>
    </view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
import Upload from "@/components/upload/index"
export default {
    components:{
		Upload,
	},
    data() {
        return {
			form: {
				content: '',
				connectMode: null,
                connectNumber: null,
                images: [],
			},
            rule: {
                content: [
                    { 
                        required: true, 
                        message: '请输入反馈内容', 
                        trigger: ['change','blur'],
                    }
                ],
                connectMode: [
                    { 
                        required: true, 
                        message: '请选择联系方式', 
                        trigger: ['change','blur'],
                    }
                ],
                connectNumber: [
                    { 
                        required: true, 
                        message: '请输入联系号码', 
                        trigger: ['change','blur'],
                    }
                ],
            },
        }
    },
    computed:{
		...mapState('user',["token"]),
        ...mapState('app',["base"]),
	},
    onLoad(){
        if (this.token == null) {
			// uni.$u.http.route({
			// 	url: '/login'
			// })
			this.$Router.push({path:'/login'})
			return
		}
    },
    methods:{
        submit(){
             this.$refs.uForm.validate().then(async (valid)=>{
                
                const formData = {
                    content:this.form.content,
                    connectMode:parseInt(this.form.connectMode),
                    connectNumber:this.form.connectNumber,
                    images:""
                }
                if (this.form.images.length > 0) {
					const imagList = this.form.images.map((item)=>{
						return item.url
					})
					formData.images = JSON.stringify(imagList)
				}

                const res = await uni.$u.http.post(api.postSuggestCreate,formData,{
                    custom: {auth: true},
                })
                if (res.code!=1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                this.form.content = null
                this.form.connectMode = null
                this.form.connectNumber = null
                this.form.images = []
                
                this.$refs.uToast.show({
                    message: "修改成功",
                    type: 'success',
                })
                this.$Router.back()
            }).catch(err=>{
                console.log(err)
            })
        },
        uploadFile(e){
            this.images = e
        }
    }
}
</script>

<style lang="scss" scoped>
.u-page{
    margin: 0 30rpx;
    .balance-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
        border-radius: 5px;
        padding: 20rpx;
        box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
        .balance-r{
            font-size: 32rpx;
            font-weight: bold;
            .balance{
                margin-left: 20rpx;
            }
        }
    }
    .list{
        .item{
            background-color: rgba(53, 73, 94, 0.05);
            padding: 20rpx;
            margin-bottom: 20rpx;
            .orderNum{
                font-size: 28rpx;
                font-weight: 700;
                margin-bottom: 10rpx;
            }
            .orderType{
                font-size: 28rpx;
                font-weight: 700;
            }
            .orderStatus{
                font-size: 28rpx;
                font-weight: 700;
            }
            .content{
                font-size: 28rpx;
                font-weight: 700;
            }
        }
    }
}
.cash-pop{
    padding: 20rpx;
    height: 300rpx;
}
</style>