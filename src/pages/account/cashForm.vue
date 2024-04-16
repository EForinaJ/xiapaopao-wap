<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
		<!-- 自定义顶部导航 -->
        <u-navbar
            :autoBack="true"
            :fixed="false"
            title="提现"
            :border="false">
        </u-navbar>

        <view class="u-page">
            <u--form
                :model="form"
                :rules="rule"
                ref="uForm"
            >
                <u-form-item
                    labelWidth="80"
                    label="提现方式"
                    prop="payMethod"
                    :border-bottom="false"
                >
                    <u-radio-group
                        v-model="form.payMethod"
                        placement="row"
                    >
                        <u-radio 
                        :customStyle="{marginRight: '16px'}"
                        shape="circle" 
                        name="1"
                        label="支付宝" />
                        <u-radio 
                        :customStyle="{marginRight: '16px'}"
                        shape="circle" 
                        name="2"
                        label="微信" />
                    </u-radio-group>
                </u-form-item>
                <u-form-item
                    labelWidth="80"
                    label="收款账户"
                    prop="number"
                    :border-bottom="false"
                >
                    <u--input
                        placeholder="请输入收款账户"
                        border="surround"
                        v-model="form.number"
                    />
                </u-form-item>
                <u-form-item
                    labelWidth="80"
                    label="提现金额"
                    prop="money"
                    :border-bottom="false"
                >
                    <u--input
                        :placeholder="`可提现金额为${balance}${base.currencySymbol}`"
                        border="surround"
                        v-model="form.money"
                        type="number"
                        @change="changeMoney"
                    />
                </u-form-item>
            </u--form>
            <u-gap height="20" bgColor="#fff"></u-gap>
            <view class="true-money">
                <text>实际到账金额为：</text>
                <text class="tmpMoney">{{tmpMoney}}{{base.currencySymbol}}</text>
            </view>
            <u-gap height="20" bgColor="#fff"></u-gap>
            <view class="service-money">
                <text>手续费：</text>
                <text class="tmpMoney">{{serviceMoney}}{{base.currencySymbol}}</text>
                <text class="tmpMoney">({{cashServicePercent}}%)</text>
                <text>注意服务费只会保留两位小数到分四舍五入</text>
            </view>
            <u-gap height="20" bgColor="#fff"></u-gap>
            <u-button @click="submit" 
            type="primary" 
            text="确认提现"></u-button>
        </view>
    </view>
</template>
<script>
import {mapState} from "vuex"
import api from "@/api/index"
export default {
    data(){
        return{
            balance:0,
            cashServicePercent: 0,
            minCash: 0,

            tmpMoney:0,
            serviceMoney:0,

            form:{
                payMethod:1,
                number:null,
                money:null,
            },
            rule:{
                payMethod:[
                    { required: true, message: '请设置提现方式', trigger: 'blur' }
                ],
                number:[
                    { required: true, message: '请输入提现账号', trigger: 'blur' }
                ],
                money:[
                    { required: true, message: '请输入充值金额', trigger: 'blur' },
                    {pattern:/^(0|[1-9]\d*)(.\d{1,2})?$/, message: '金额只保留小数点后两位', trigger: 'blur' }
                ],
            },
        }
    },
    computed:{
		...mapState('user',["token"]),
        ...mapState('app',["base","pay"]),
	},
    onLoad(){
        if (this.token == null) {
			// uni.$u.http.route({
			// 	url: '/login'
			// })
			this.$Router.push({path:'/login'})
			return
		}
        this.minCash = this.pay.cashMin
        this.cashServicePercent = this.pay.cashServicePercent * 100
        this.getBlance()
    },
    methods:{
        changeMoney(e){
            if (e != '') {
                const value = parseFloat(e)

                let tmpM = value
                this.serviceMoney = (tmpM * (this.cashServicePercent / 100)).toFixed(2)
                this.tmpMoney = ((tmpM - tmpM * (this.cashServicePercent / 100)).toFixed(2))
            } else {
                this.serviceMoney = 0
                this.tmpMoney = 0
            }
            
        
        },
        submit(){
             this.$refs.uForm.validate().then(async (valid)=>{
                if (this.balance < this.tmpMoney) {
                    this.$refs.uToast.show({
                        message: "余额不足",
                        type: 'error',
                    })
                    return
                }

                if (this.form.money < this.minCash) {
                    this.$refs.uToast.show({
                        message: `最低提现额度为${this.minCash}${this.base.currencySymbol}`,
                        type: 'error',
                    })
                    return
                }

                const formData = {
                    payMethod:parseInt(this.form.payMethod),
                    number:this.form.number,
                    money:this.form.money,
                }
                const res = await uni.$u.http.post(api.postCashCreate,formData,{
                    custom: {auth: true},
                })
                if (res.code!=1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                this.form.payMethod = null
                this.form.number = null
                this.form.money = null
                this.tmpMoney = 0
                this.serviceMoney = 0
                this.balance = 0
                
                this.$refs.uToast.show({
                    message: "成功提交提现申请",
                    type: 'success',
                })
                this.$Router.back()
            }).catch(err=>{
                console.log(err)
            })
        },
        async getBlance(){
            const res = await uni.$u.http.get(api.getAccountBalance,{
                custom: {auth: true},
            })
             if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            this.balance = res.data.balance
        },
    }
}
</script>

<style lang="scss" scoped>
.u-page{
    margin: 0 30rpx;
    .true-money{
        font-size: 28rpx;
        .tmpMoney{
            margin-right: 10rpx;
        }
    }
    .service-money{
        font-size: 28rpx;
        .tmpMoney{
            margin-right: 10rpx;
        }
    }
}
</style>