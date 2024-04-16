<template>
    <view >
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="false"
			title="绑定手机"
			:border="false">
		</u-navbar>

        <view class="u-page">
            <u-gap height="20" bg-color="#ffffff" />
            <u-form :model="form"
                :rules="rule"
                ref="uForm">
                <u-form-item :border-bottom="false" prop="account">
                    <u-input 
                    border="surround"
                    :placeholder="'请输入邮箱'"
                    :clearable="false"
                    :type="'text'"
                    v-model="form.account" />
                </u-form-item>
                <u-form-item :border-bottom="false" prop="code">
                    <u-input 
                        border="surround"
                        :clearable="false"
                        type="number"
                        maxlength="6"
                        placeholder="请输入验证码"
                        v-model="form.code">
                        <template slot="suffix">
                            <u-code
                                ref="uCode"
                                @change="codeChange"
                                seconds="60"
                                changeText="X秒重新获取"
                            ></u-code>
                            <u-button
                                @click="getCode"
                                :text="form.tips"
                                type="success"
                                size="mini"
                            ></u-button>
                        </template>
                    </u-input>
                </u-form-item>
            </u-form>
            <u-gap height="20" bg-color="#ffffff" />
            <u-button @click="submit" 
            type="primary" 
            text="确认修改"></u-button>
        </view>
    </view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
export default {
    data() {
        return {
			form: {
				account: '',
				code: '',
                tips: '',
			},
            rule: {
                account: [
                    { 
                        required: true, 
                        message: '请输入账号', 
                        trigger: ['change','blur'],
                    }
                ],
                code: [
                    { 
                        required: true, 
                        message: '请输入验证码', 
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
                    account:this.form.account,
                    code:this.form.code,
                }
                const res = await uni.$u.http.post(api.postAccountEditEmail,formData,{
                    custom: {auth: true},
                })
                if (res.code!=1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                this.form.account = null
                this.form.code = null

                this.$refs.uToast.show({
                    message: "修改成功",
                    type: 'success',
                })
                this.$Router.back()
            }).catch(err=>{
                console.log(err)
            })
        },
        codeChange(text) {
            this.form.tips = text;
        },
        async getCode() {
            this.$refs.uForm.validateField('account',async (err)=>{
                if (err.length > 0) {
                    return
                }

                if (this.$refs.uCode.canGetCode) {
                // 模拟向后端请求验证码
                    uni.showLoading({
                        title: '正在获取验证码'
                    })

                    const res = await uni.$u.http.post(api.sendCaptcha,{
                        account:this.form.account
                    }) 
                    if (res.code != 1) {
                        uni.hideLoading();          
                        this.$refs.uToast.show({
                            message: res.message,
                            type: 'error',
                        })
                        return
                    }

                    uni.hideLoading();
                    // 这里此提示会被this.start()方法中的提示覆盖
                    uni.$u.toast('验证码已发送');
                    // 通知验证码组件内部开始倒计时
                    this.$refs.uCode.start();

                } else {
                    uni.$u.toast('倒计时结束后再发送');
                }
            })
        },
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