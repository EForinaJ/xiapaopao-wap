<template>
    <view class="box" >
        <view class="info">
            <view class="item-info-title">
                <view class="item-info-type">
                    {{info.detailInfo.fromUser.nickName}}
                </view>
                <view class="item-info-date">
                    {{info.createTime | resetDate}}
                </view>
            </view>
            <view class="item-info-content">
                <view class="content">给你打赏了{{info.detailInfo.order.money}}{{base.currencySymbol}}</view>
            </view>
        </view>
</view>
</template>

<script>
import {mapState} from "vuex"
export default {
    props:{
        info:{
            type: Object,
            require:true
        }
    },
    data(){
        return{
        }
    },
    computed:{
		...mapState('app',["base"]),
	},

}
</script>

<style lang="scss" scoped>
.box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    .info{
        margin-left: 20rpx;
        flex: 1;
        .item-info-title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .item-info-type{
                font-weight: 700;
                font-size: 24rpx;
                .item-info-span{
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #b5b5b5;
                    margin-left: 30rpx;
                }
            }
        }
        .item-info-date{
            color: #8590a6;
            font-size: 28rpx;
        }
        .item-info-content{
            margin-top: 20rpx;
            font-size: 24rpx;
            color: #8590a6;
            background: #f5f5f5;
            padding: 8rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content{
                flex:1;
            }
            .money{
                color: red;
            }
        }
    }
    // .cover-text{
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     width: 80rpx;
    //     height: 80rpx;
    //     background-color: #c0c4cc;
        
    //     border-radius: 8rpx;
    //     padding: 20rpx;
    // }
}
</style>