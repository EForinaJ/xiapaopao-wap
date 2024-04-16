<template>
    <view class="container">

        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
        <u-navbar
        leftIcon=""
            :autoBack="false"
            :fixed="false"
            :border="false">
        </u-navbar>
        <u-gap height="50" bg-color="#ffffff"></u-gap>
        <view class="u-page">
            <view class="title-text">
                <view class="title">
                    嘿！！！
                </view>
                <u-gap height="10" bg-color="#ffffff"></u-gap>
                <view class="title">
                    赶紧登录吧
                </view>
                <u-gap height="10" bg-color="#ffffff"></u-gap>
                <view class="desc">
                    欢迎回来~~我们等你好久了
                </view>
            </view>

            <u-form :model="form" ref="uForm">
                <u-form-item :border-bottom="false" prop="account">
                    <u-input 
                    :customStyle="{
                        backgroundColor: '#ecf2ff',
                        padding:'20rpx 30rpx',
                        borderRadius: '50rpx'
                    }"
                    border="none"
                    :placeholder="config.loginRegisterMode == 'email' ? '请输入邮箱': '请输入手机号'"
                    :clearable="false"
                    :type="config.loginRegisterMode == 'email' ? 'text': 'number'"
                    v-model="form.account" />
                </u-form-item>
                <u-form-item v-if="form.mode == LOGINMODE.CODE" :border-bottom="false" prop="code">
                    <u-input 
                        :customStyle="{
                            backgroundColor: '#ecf2ff',
                            padding:'20rpx 30rpx',
                            borderRadius: '50rpx'
                        }"
                        border="none"
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
                                changeText="X秒重新获取哈哈哈"
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
                <u-form-item v-if="form.mode == LOGINMODE.PASS" :border-bottom="false" prop="password">
                    <u-input 
                    :customStyle="{
                        backgroundColor: '#ecf2ff',
                        padding:'20rpx 30rpx',
                        borderRadius: '50rpx'
                    }"
                    border="none"
                    placeholder="请输入密码"
                    :clearable="false"
                    type="password"
                    v-model="form.password" />
                </u-form-item>
            </u-form>
            <u-gap height="10" bg-color="#ffffff"></u-gap>
            <view class="register-forget">
                <view v-if="form.mode == LOGINMODE.CODE" class="text" @click="changePass(LOGINMODE.PASS)">
                    密码登录
                </view>
                <view v-if="form.mode == LOGINMODE.PASS" class="text" @click="changePass(LOGINMODE.CODE)">
                    验证码登录
                </view>
            </view>
            <u-gap height="20" bg-color="#ffffff"></u-gap>
            <view class="submit">
                <u-button 
                @click="submit" 
                type="primary" 
                text="登录"
                shape="circle" />
            </view>
            <u-gap height="20" bg-color="#ffffff"></u-gap>
            <u-loadmore line lineColor="#1CD29B" status="nomore" nomoreText='其他登录'/>
            <u-gap height="20" bg-color="#ffffff"></u-gap>
            <view class="other-login">
                <u-icon class="icon" name="qq-circle-fill" color="#2979ff" size="44"></u-icon>
                <u-icon class="icon" name="weixin-circle-fill" color="rgb(35, 230, 9)" size="44"></u-icon>
            </view>
        </view>
        
        
    </view>
</template>

<script>
import {mapActions} from "vuex"
import api from "@/api/index"
import {LOGINMODE} from "@/shared/mode"
export default {
	data() {
		return {
            LOGINMODE,
            config:{
                loginRegisterMode:"",
                social:[],
            },
			form: {
				account: '',
				code: '',
                password:'',
                mode: LOGINMODE.CODE,
                tips: '',
			},
            rules: {
                account: [
                    { 
                        required: true, 
                        message: '请输入账号', 
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change','blur'],
                    }
                ],
                code: [
                    { 
                        required: true, 
                        message: '请输入验证码', 
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change','blur'],
                    }
                ],
                password: [
                    { 
                        required: true, 
                        message: '请输入密码', 
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change','blur'],
                    }
                ],
            },
            
		}
	},
	computed: {

	},
    onLoad(){
        this.getConfig()

    },
    onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
        ...mapActions("user",["A_UPDATE_TOKEN","A_UPDATE_USER"]),
        async getConfig(){
            try {
                const res = await uni.$u.http.get(api.getSystemAuth)
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                }
                this.config = res.data.info
                if (this.config.loginRegisterMode == "email") {
                    this.rules.account.push({
                        pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                        message: '请输入邮箱', trigger: 'blur'
                    })
                }else{
                    this.rules.account.push({
                        pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                        message: '请输入手机号', trigger: 'blur'
                    })
                }
            } catch (error) {
                this.$refs.uToast.show({
                    message: "网络错误",
                    type: 'error',
                })
            }
        },
        changePass(e){
            this.form.mode = e
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

		submit() {
            this.$refs.uForm.validate().then(async (valid)=>{
                const formData = {
                    account:this.form.account,
                    password:this.form.password,
                    code:this.form.code,
                    mode: this.form.mode
                }
                const res = await uni.$u.http.post(api.postLogin,formData)
                if (res.code!=1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                this.A_UPDATE_TOKEN(res.data.token)
                uni.setStorageSync('xpp-token', res.data.token);          
                const userRes = await uni.$u.http.get(api.getAccountInfo,{custom: {auth: true},})
                if (userRes.code!=1) {
                    this.$refs.uToast.show({
                        message: userRes.message,
                        type: 'error',
                    })
                    return
                }
                this.A_UPDATE_USER(userRes.data.info)
                setTimeout(()=>{
                    this.$Router.push("/")
                },1000)
            }).catch(err=>{
                console.log(err)
            })
		},
	}
};
</script>

<style lang="scss" scoped>
.container{
    .u-page{
        margin: 0 30rpx;
        .title-text{
            .title{
                font-size: 64rpx;
                font-weight: 700;
                color: #343965;
            }
            .desc{
                font-size: 28rpx;
                color: #b4b6c8;
            }
        }
        .register-forget{
            margin: 20rpx 0;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            color: #909090;
            font-size: 24rpx;
        }
        .other-login{
            margin-top: 20rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon{
                margin: 0 20rpx;
            }
        }
    } 
}

</style>