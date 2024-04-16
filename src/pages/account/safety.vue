<template>
    <view >
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="false"
			title="账户安全"
			:border="false">
		</u-navbar>

        <view class="u-page">
            <u-gap height="20" bg-color="#ffffff" />
            <u-cell-group 
                :border="false"
            >
                <u-cell 
                title="登录密码" 
                value="修改"
                :isLink="true" 
                @click="go('/account/editPass')"
                rightIcon="arrow-right" ></u-cell>
                <u-cell 
                v-if="config.loginRegisterMode == 'email'"
                @click="go('/account/bindEmail')"
                icon="email-fill" 
                title="验证邮箱" 
                :isLink="true" 
                :value="email == '' ? '绑定' : '修改'"
                rightIcon="arrow-right"></u-cell>
                <u-cell 
                v-if="config.loginRegisterMode == 'phone'"
                @click="go('/account/bindPhone')"
                icon="phone-fill" 
                title="验证手机" 
                :isLink="true" 
                :value="phone == '' ? '绑定' : '修改'"
                rightIcon="arrow-right"></u-cell>
                <u-cell 
                @click="open"
                icon="qq-circle-fill" 
                title="QQ" 
                :isLink="true" 
                value="绑定"
                rightIcon="arrow-right"></u-cell>
                <u-cell 
                @click="open"
                icon="weixin-circle-fill" 
                title="微信" 
                :isLink="true" 
                value="绑定"
                rightIcon="arrow-right"></u-cell>
            </u-cell-group>
            <u-gap height="20" bg-color="#ffffff" />

            <u-button @click="logout" type="error" text="退出登录"></u-button>
        </view>
        
    </view>
</template>

<script>
import {mapState,mapActions} from "vuex"
import api from "@/api/index"
export default {
    data(){
        return{
            config:{
                loginRegisterMode:"",
                social:[],
            },
            email: "",
            phone: "",
        }
    },
    computed:{
		...mapState('user',["token"]),
	},
    onLoad(){
        if (this.token == null) {
			// uni.$u.http.route({
			// 	url: '/login'
			// })
			this.$Router.push({path:'/login'})
			return
		}
        this.getConfig()
        this.getData()
        
    },
    methods:{
        ...mapActions("user",["A_UPDATE_TOKEN","A_UPDATE_USER"]),
        async getData(){
            const res = await uni.$u.http.get(api.getAccountSecurity,{
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    title: res.message,
                    type: 'error',
                })
                return
            }
            this.email = res.data.info.email
        },
        async getConfig(){
            try {
                const res = await uni.$u.http.get(api.getOption)
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                this.config = res.data.info
            } catch (error) {
                console.log(error)
                this.$refs.uToast.show({
                    message: "网络错误",
                    type: 'error',
                })
            }
        },
        open(){
            this.$refs.uToast.show({
                message: "此功能暂时未开放",
                type: 'error',
            })
        },
        go(url){
              if (this.token == null) {
                // uni.$u.http.route({
                // 	url: '/login'
                // })
                this.$Router.push({path:'/login'})
                return
            }
            this.$Router.push({path:url})
        },
        async logout(){
            const res = await uni.$u.http.get(api.postLogout,{
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    title: res.message,
                    type: 'error',
                })
                return
            }
            this.A_UPDATE_TOKEN(null)
            this.A_UPDATE_USER(null)
            uni.removeStorageSync('xpp-token');
            this.$Router.pushTab({path:'/'})
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