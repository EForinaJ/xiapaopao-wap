<template>
    <view >
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="false"
			title="订单列表"
			:border="false">
		</u-navbar>

        <view class="u-page">

            <u-gap height="10" bgColor="#fff" />
            <u-subsection :list="tabList" 
            mode="subsection"
             :current="queryParam.status"  
            @change="sectionChange" />
            <u-gap height="10" bgColor="#fff"/>

            

            <u-skeleton :loading="loading" rows="4">
                <view class="list" v-if="!loading" >
                    <view class="item" 
                    v-for="(item, index) in list" :key="index">
                        <view class="orderNum">
                            订单号：{{item.orderNum}}
                        </view>
                        <u-line color="#fff"></u-line>
                        <view>
                            <u-row >
                                <u-col span="6">
                                    <view class="orderType">
                                        类型：{{item.orderType | orderTypeRestTitle}}
                                    </view>
                                </u-col>
                                <u-col span="6">
                                    <view class="orderStatus">
                                        状态：{{item.status == 1 ? '未支付' : '已支付'}}
                                    </view>
                                </u-col>
                            </u-row>
                        </view>
                        <view>
                            <u-row >
                                <u-col span="6">
                                    <view class="orderType">
                                        金额：{{item.money}}{{base.currencySymbol}}
                                    </view>
                                </u-col>
                                <u-col span="6">
                                    <view class="orderStatus">
                                        时间：{{item.createTime | resetDate}}
                                    </view>
                                </u-col>
                            </u-row>
                        </view>
                        <view class="content">
                            内容：{{item.detail.title}}
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
import {ORDERTYPE} from "@/shared/order"
export default {
    filters: {
        orderTypeRestTitle(value) {
            switch (value) {
                case ORDERTYPE.CD:
                    return "打赏"
                case ORDERTYPE.BUYZY:
                    return "内容购买"
                case ORDERTYPE.VIEWFEED:
                    return "查看付费帖子"
                case ORDERTYPE.JOINGROUP:
                    return "加入圈子"
                case ORDERTYPE.JOINCOURSE:
                    return "报名课程"
                case ORDERTYPE.VIEWFEED:
                    return "查看付费内容"
                case ORDERTYPE.OPENVIP:
                    return "开通付费会员"
                case ORDERTYPE.VERIFY:
                    return "认证服务费"
            }
        }
    },
    data() {
        return {
            tabList: ['全部','未支付', '已支付'],

            loading:false,
			queryParam: {
                page: 1,
                limit: 20,
                status: 0,
				isIncome:false,
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
		this.loading = true
		this.getList()
		this.loading =false
    },
    methods:{
        sectionChange(e){
            this.queryParam.status = e
            this.list = []
            this.loading = true
            this.getList()
            this.loading =false
            this.current = e
        },
        async getList(){
			try {
                this.status = "loading"
                const res = await uni.$u.http.get(api.getOrderList,{
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
</style>