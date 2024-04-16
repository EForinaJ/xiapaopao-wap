<template>
    <view >
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="false"
			title="确认订单"
			:border="false">
		</u-navbar>

        <view class="u-page">
            <u-gap height="10" bg-color="#fff" />
            <view class="info-box" v-if="info != null">
                <u--image 
                v-if="module == 'edu'"
                :showLoading="true" 
                :src="info.cover"
                 width="80px" 
                 radius="8"
                 height="80px" />
                 <view class="info">
                    <view class="title-desc">
                        <u--text 
                            size="14"
                            :lines="1" 
                            :text="info.title"/>
                            <u-gap height="6" bg-color="#fff" />
                        <u--text 
                            color="#8f9ca2"
                            size="12"
                            :lines="1" 
                            :text="info.description"/>
                    </view>
                    <view class="price">
                        {{base.currencySymbol}}{{info.price}}
                    </view>
                 </view>
            </view>
           
            <view class="pay-mode">
                <u--text size="12" text="支付方式" />
                <u-radio-group v-model="mode">
                    <view class="pay-list">
                        <view class="item" v-for="(item,index) in actions" :key="index">
                            <view class="icon">
                                <view class="text">
                                    <u-icon v-if="item.value == 2" size="25" color="#11d21d" name="weixin-circle-fill"></u-icon>
                                    <u-icon v-if="item.value == 1" size="25" color="#1677ff" name="zhifubao-circle-fill"></u-icon>
                                    <u-icon v-if="item.value == 3" size="25" name="red-packet-fill"></u-icon>
                                    <text>{{item.name}}</text>
                                </view>
                                <u-radio :name="item.value"></u-radio>
                            </view>
                            <view class="desc" v-if="item.value == 3">
                                <text>余额：{{base.currencySymbol}}{{balance}}</text>
                                <view  class="cz">
                                    <text>充值</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </u-radio-group>
            </view>

            <view class="price-box" v-if="info != null">
                <u--text size="12" text="价格明细" />
                <u-gap height="10" bg-color="#fff" />
                <view class="price-list">
                    <view class="item">
                        <text class="text">内容总价</text>
                        <text>{{base.currencySymbol}}{{info.price}}</text>
                    </view>
                    <view class="item">
                        <text class="text">会员优惠价</text>
                        <text>{{base.currencySymbol}}{{vipPrice}}</text>
                    </view>
                    <view class="item">
                        <text class="text">实际付款</text>
                        <text class="pricexx">{{base.currencySymbol}}{{turePrice}}</text>
                    </view>
                </view>
            </view>
            
            <view class="pay-btn">
                <u-button v-if="isGoPay == 1"  @click="submit" 
                type="primary" 
                text="支付订单" />
                <u-button v-if="isGoPay == 2"  @click="submit" 
                type="primary" 
                loading
                text="创建订单" />
                <u-button v-if="isGoPay == 3"  @click="submit" 
                type="primary" 
                loading
                :text="`等待付款${timesec}`" />
            
            </view>
        </view>
        <u-modal 
        showCancelButton
        title="检测支付状态" 
        :confirmText="confirmText"
        cancelText="未支付"
        :show="payModal" 
        @confirm="confirm" 
        @cancel="cancel"
        ref="uModal" >
        <u-toast ref="uToast"></u-toast>
        </u-modal>
    </view>
</template>

<script>
import {ORDERTYPE} from "@/shared/order"
import {mapState} from "vuex"
import api from "@/api/index"
import {MODULE} from "@/shared/module"
export default {
    data() {
        return {
            platform: null,
            actions:[],

			id:0,
            module:"",
            info: {
                cover:"",
                title:"",
                description:"",
                price:0,
            },
            loading: true,
            mode:"",
            balance:0,

            isGoPay:1,

            turePrice:0,
            vipPrice:0,

            // 订单号
            orderNum:"",

            // 订单状态显示框
            payModal: false,
            checkPayInterval:null,
            startTime:0,
            asyncClose:false,
            confirmText: "已支付"
        }
    },
    computed:{
		...mapState('user',["token","userInfo"]),
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
       
        if (this.$Route.query == undefined || this.$Route.query == null) {
			this.$Router.push({path:'/404'})
		}
        this.module = this.$Route.query.module
        this.id = this.$Route.query.id

        this.platform = uni.$u.platform
        this.pay.payMode.forEach((item)=>{
            const tmp = {
                name: "",
                value: item
            }
            if ((this.platform == "h5" || this.platform == "alipay") && item == 1) {
                tmp.name = "支付宝"
            }
            if ((this.platform == "h5" || this.platform == "weixin") && item == 2) {
                tmp.name = "微信"
            }
            if (this.platform == "h5" && item == 3) {
                tmp.name = "余额"
            }
            this.actions.push(tmp)
        })

        this.getData()
        this.getBlance()

        //判断是否存在订单号
        const orderNum = uni.getStorageSync('orderNum');
        
        if (orderNum != "" && orderNum != null && orderNum != undefined) {
            this.orderNum = orderNum
            this.payModal = true
        }
        

        setTimeout(() => {
            let discount = 0
            if (this.userInfo.vip != null) {
                discount = this.userInfo.vip.discount  
            }
            if (discount != 0) {
                let price = this.info.price
                
                let discountPrice = price - (price * discount)
                this.vipPrice = discountPrice
                this.turePrice =  price - this.vipPrice 
            }
        }, 1000);
        
    },
    methods:{
        async getData(){
            if (this.module == MODULE.EDU) {
                this.loading = true
                const res = await uni.$u.http.get(api.getEdu,{
                    params:{id: this.id},
                    custom: {auth: true},
                })
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    this.loading = false
                    return
                }
                this.info = res.data.info
                this.loading = false
            }

            if (this.module == MODULE.TOPIC) {
                this.loading = true
                const res = await uni.$u.http.get(api.getTopic,{
                    params:{id: this.id},
                    custom: {auth: true},
                })
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    this.loading = false
                    return
                }
                this.info = res.data.info
                this.loading = false
            }

            if (this.module == MODULE.GROUP) {
                this.loading = true
                const res = await uni.$u.http.get(api.getGroupInfo,{
                    params:{id: this.id},
                    custom: {auth: true},
                })
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    this.loading = false
                    return
                }
                this.info = res.data.info
                this.loading = false
            }
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
        async submit(){
            if (this.isGoPay == 2 || this.isGoPay == 3) {
                return false
            }
            const product = {
                detailId:this.id,
                detailModule: this.module,
                orderMoney:this.info.price,
                orderType: null,
                orderMode: 1,
                payMethod:this.mode
            }
            if (this.module == MODULE.EDU) {
                product.orderType = ORDERTYPE.JOINCOURSE
            }
            if (this.module == MODULE.TOPIC) {
                product.orderType = ORDERTYPE.VIEWFEED
            }

            if (this.vipPrice != 0) {
                product.orderMoney = this.vipPrice
            }

            if (product.orderMoney == 0 || product.orderMoney == null) {
                this.$refs.uToast.show({
					message: "请选择或输入金额",
					type: 'error',
				})
                return
            }

            if (this.mode == "0") {
                this.$refs.uToast.show({
					message: "请选择支付方式",
					type: 'error',
				})
                return
            }
            if (this.mode == "3") {
                if ((this.balance * 100) < (product.orderMoney * 100)) {
                    this.$refs.uToast.show({
                        message: "余额不足",
                        type: 'error',
                    })
                    return
                }
            }
            this.isGoPay = 2
            const res = await uni.$u.http.post(api.postOrderCreate,product,{
                custom: {auth: true},
           })

            if (res.code != 1) {
                this.throttl(10000)
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            

            const qrRes = await uni.$u.http.post(api.postOrderWapPay,{orderNum:res.data.orderNum},{
                custom: {auth: true},
            })
            
            if (qrRes.code != 1) {
                this.throttl(10000)
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }

            if(qrRes.data.info.isPay && qrRes.data.info.payMethod == 3){
                this.throttl(10000)
                uni.$emit('query');
                uni.navigateBack({
                    data:1
                });
                return
            }
          
            if (this.mode != 3) {
                this.isGoPay = 3
                // 写入store里面
                uni.setStorageSync('orderNum', qrRes.data.info.orderNum);
                // #ifdef H5
                   window.location.href = qrRes.data.info.qrCode
                // #endif
            }

            
        },
        confirm(){
            
            if (this.asyncClose) {
                this.$refs.uToast.show({
                    message: "正在检测支付状态，请不要重复点击",
                    type: 'default',
                })
                return
            }
            this.asyncClose = true
            this.confirmText = "正在验证支付状态"
            this.startTime = new Date().getTime()
            this.checkPayInterval = setInterval(() => {
                this.checkPayStatus()
            }, 1000);
        },
        cancel(){
            this.payModal = false
        },
        async checkPayStatus(){
            if (new Date().getTime() - this.startTime >= 30000) {
                clearInterval(this.checkPayInterval)
                this.checkPayInterval = null
                this.asyncClose = false
                this.confirmText = "已支付"
                this.$refs.uToast.show({
                    message: "检测为未支付状态",
                    type: 'default',
                })
            }
  
            const formData = {
                orderNum:this.orderNum,
            }
            const res = await uni.$u.http.post(api.postOrderCheckStatus,formData,{
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                clearInterval(this.checkPayInterval)
                this.checkPayInterval = null
                this.asyncClose = false
                return
            }
            if(res.data.status){
                this.checkTime = null;
                this.$refs.uToast.show({
                    message: "支付成功",
                    type: 'success',
                })
                clearInterval(this.checkPayInterval)
                this.checkPayInterval = null
                this.payModal = false
                uni.$emit('query');
                uni.navigateBack({
                    data:1
                });
            }
        },
        throttl(dey){ 
            let timeout;
            clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
            timeout = setTimeout(()=>{
                this.isGoPay = 1
            }, dey);  // 指定 xx ms 后触发真正想进行的操作 handler
        },
    }
}
</script>

<style lang="scss" scoped>
.u-page{
    margin: 0 30rpx;
    .info-box{
        padding: 20rpx;
        -moz-box-shadow:0 0 10px rgb(233, 233, 233);
        -webkit-box-shadow:0 0 10px rgb(233, 233, 233);
        box-shadow:0 0 10px rgb(233, 233, 233);
        border-radius: 16rpx;
        display: flex;
        .info{
            margin-left: 20rpx;
            flex-direction: column;
            display: flex;
            justify-content: space-between;
        }
    }
    .pay-mode{
        margin-top: 20rpx;
        padding: 20rpx;
        background-color: white;
        border-radius: 16rpx;
        -moz-box-shadow:0 0 10px rgb(233, 233, 233);
        -webkit-box-shadow:0 0 10px rgb(233, 233, 233);
        box-shadow:0 0 10px rgb(233, 233, 233);
        .pay-list{
            margin-top: 10rpx;
             width: 100%;
            .item{
                padding: 20rpx 0;
               .icon{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .text{
                        display: flex;
                        align-items: center;
                        font-size: 20rpx;
                        font-weight: 500;
                        text{
                            margin-left: 10rpx;
                        }
                        
                    }
               }
               .desc{
                    margin-top: 10rpx;
                    font-size: 24rpx;
                    color: #8f9ca2;
                    display: flex;
                    align-items: center;
                    .cz{
                        height: 32rpx;
                        font-size: 24rpx;
                        display: flex;
                        align-items: center;
                        margin-left: 20rpx;
                        color: #000;
                    }
               }
            }
        }
    }
    .price-box{
       margin-top: 20rpx;
        padding: 20rpx;
        background-color: white;
        border-radius: 16rpx;
        -moz-box-shadow:0 0 10px rgb(233, 233, 233);
        -webkit-box-shadow:0 0 10px rgb(233, 233, 233);
        box-shadow:0 0 10px rgb(233, 233, 233); 
        .price-list{
            .item{
                margin-bottom: 10rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 24rpx;
                .text{
                    color: #8f9ca2;
                }
                .pricexx{
                    font-size: 30rpx;
                    font-weight: 700;
                }
            }
        }
    }
    .pay-btn{
        margin-top: 30rpx;
    }
}
.pay-bar{
    height: 100rpx;
	width: 100%;
	background: white;
	box-shadow: 0rpx -5rpx 20rpx rgb(215, 244, 248);
	position: fixed;
	bottom: 0;
	z-index: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
    .pay-price{
        margin-left: 30rpx;
    }
    .pay-btn{
        margin-right: 30rpx;
    }
}
</style>