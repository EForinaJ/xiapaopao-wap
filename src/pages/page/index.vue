<template>
    <view >
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="false"
			:title="info.title"
			:border="false">
		</u-navbar>

        <view class="u-page">
            <u-parse :content="info.content"></u-parse>
        </view>
    </view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
export default {
    data(){
        return{
            id: 0,
            info: {
                title:""
            }
        }
    },
    computed:{
		...mapState('user',["token"]),
	},
    onLoad(){
       if (this.$Route.query.id == undefined || this.$Route.query.id == null || this.$Route.query.id == "" || this.$Route.query.id == 0 || isNaN(this.$Route.query.id)) {
			this.$Router.push({path:'/404'})
		}
		this.id = parseInt(this.$Route.query.id)
    
        this.getData()
    },
    methods:{
        async getData(){
            const res = await uni.$u.http.get(api.getPage,{
                params: {id:this.id},
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    title: res.message,
                    type: 'error',
                })
                // this.$Router.push({path:'/404'})
                return
            }
            this.info = res.data.info
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