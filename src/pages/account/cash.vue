<template>
    <view >
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="false"
			title="提现记录"
			:border="false">
		</u-navbar>

        <view class="u-page">

            <view class="balance-box">
                <view class="balance-r">
                    <text class="balance-text">余额:</text>
                    <text class="balance">{{balance}}{{base.currencySymbol}}</text>
                </view>
                <view class="cash">
                    <u-button @click="goCashForm" type="primary" size="small" text="提现"></u-button>
                </view>
            </view>



            <u-skeleton :loading="loading" rows="4">
                <view class="list" v-if="!loading" >
                    <view class="item" 
                    v-for="(item, index) in list" :key="index">
                        <view class="orderNum">
                            提现单号：{{item.code}}
                        </view>
                        <u-line color="#fff"></u-line>
                        <view>
                            <u-row >
                                <u-col span="6">
                                    <view class="orderType">
                                        实际到账金额：{{item.cashMoney}}{{base.currencySymbol}}
                                    </view>
                                </u-col>
                                <u-col span="6">
                                    <view class="orderStatus">
                                        提现金额：{{item.money}}{{base.currencySymbol}}
                                    </view>
                                </u-col>
                            </u-row>
                        </view>
                        <view>
                            <u-row >
                                <u-col span="6">
                                    <view class="orderType">
                                        服务费：{{item.serviceMoney}}{{base.currencySymbol}}
                                    </view>
                                </u-col>
                                <u-col span="6">
                                    <view class="orderStatus">
                                        收款方式：{{item.payMethod == 1 ? '支付宝' : '微信'}}
                                    </view>
                                </u-col>
                            </u-row>
                        </view>
                        <view>
                            <u-row >
                                <u-col span="6">
                                    <view class="orderType" v-if="item.status == 1 ">
                                        状态：待审核
                                    </view>
                                    <view class="orderType" v-if="item.status == 2 ">
                                        状态：已到账
                                    </view>
                                    <view class="orderType" v-if="item.status == 3 ">
                                        状态：被拒绝
                                    </view>
                                </u-col>
                                <u-col span="6">
                                    <view class="orderStatus">
                                        时间：{{item.createTime | resetDate}}
                                    </view>
                                </u-col>
                            </u-row>
                        </view>
                        <view class="content" v-if="item.status == 3 ">
                            <text>
                              被拒绝原因： {{item.remark}}
                            </text>
                        </view>
                    </view>
                    <view class="more" v-if="list.length > 0">
                        <u-loadmore :status="status" :load-text="loadText"/>
                    </view>
                </view>
            </u-skeleton>
            <u-empty
                v-if="list.length == 0"
                mode="data"
                icon="http://cdn.uviewui.com/uview/empty/car.png"
            />

        </view>
    </view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
export default {
    data() {
        return {
            balance:0,

            loading:false,
			queryParam: {
                page: 1,
                limit: 20,
                status: 0,
            },
			total:0,
            list:[],
            isShow:false,
            loadText: {
                loadmore: '轻轻上拉',
                loading: '努力加载中',
                nomore: '实在没有了'
            },
            status: 'loadmore',

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
        this.getBlance()
		this.loading = true
		this.getList()
		this.loading =false
    },
    methods:{
        goCashForm(){
              if (this.token == null) {
                // uni.$u.http.route({
                // 	url: '/login'
                // })
                this.$Router.push({path:'/login'})
                return
            }
            this.$Router.push({path:'/account/wallet/cashForm'})
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
        async getList(){
			try {
                this.status = "loading"
                const res = await uni.$u.http.get(api.getCashList,{
					params:this.queryParam,
					custom: {auth: true},
				}) 
                if (res.code != 1) {
                   this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                res.data.list = res.data.list == null ? [] : res.data.list
                this.isShow = res.data.list.length > 0 ? false : true
                this.list = [...this.list,...res.data.list]
                this.total = res.data.total
                this.status = this.isShow ? "loadmore" : "nomore"
            } catch (error) {
                console.log(error)
            }
		},
		onReachBottom(){  //上拉触底函数
            if (!this.isShow) {
                this.queryParam.page += 1
                this.getList()
                return
            }
            this.status = "nomore"
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