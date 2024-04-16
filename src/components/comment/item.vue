<template>
    <view class="item">
        <u-avatar 
        @click="goProfile(info.userInfo.id)"  
        :src="info.userInfo.avatar">
        </u-avatar>
        <view class="info">
            <view class="nickName-lv-like">
                <view class="nickName-lv">
                    <view class="nickName mr" @click="goProfile(info.userInfo.id)">
                        {{info.userInfo.nickName}}
                    </view>
                    <view class="lv-vip">
                        <view  class="lv mr">
                            <u--image 
                            :showLoading="true" 
                            :src="info.userInfo.grade.icon" 
                            height="15" 
                            width="30"/>
                        </view>
                        <!-- <view 
                        v-if="info.userInfo.vip" 
                        class="vip u-font-20 mr">
                            <u--image 
                            :showLoading="true" 
                            :src="info.userInfo.vip.icon" 
                            height="15" width="30"/>
                        </view> -->
                    </view>
                </view>
                <view class="like-adoption">
                    <view class="like" @click="like(info)">
                        <u-icon size="24" :name="info.isLike?'thumb-up-fill':'thumb-up'"/>
                        <view class="count">
                            {{info.likes | resetNum}}
                        </view>
                    </view>
                </view>
            </view>
            <u-gap height="5" bg-color="#fff"></u-gap>
            <view class="content">
                {{info.content}}
            </view>
            <u-gap height="5" bg-color="#fff"></u-gap>
            <view class="date-report">
                <view class="date-reply-delete">
                    <view class="date mr">
                        {{info.createTime | resetDate}}
                    </view>
                    <view v-if="token != null" @click="open(info,info.id)" class="reply-buttom mr">
                        回复
                    </view>
                    <view v-if="accountInfo.id == info.userInfo.id && token != null" @click="remove(info,'top',index,0)" class="reply-buttom mr">
                        删除
                    </view>
                </view>
                <view v-if="token != null" @click="report(info)" class="report">
                    举报
                </view>
            </view>
            <u-gap height="5" bg-color="#fff"></u-gap>
            <view class="reply-list" v-if="info.children">
                <view class="reply-item" v-for="(citem,cindex) in info.children" :key="`c${cindex}`">
                    <view class="reply-name-box">
                        <view class="name-box">
                            <view class="reply-name" @click="goProfile(citem.userInfo.id)">
                                {{citem.userInfo.nickName}}
                            </view>  
                            <view>
                                回复
                            </view>
                            <view class="comment-name" @click="goProfile(citem.reply.id)">
                                {{citem.reply.nickName}}
                            </view>
                        </view>
                        <view class="like" @click="like(citem)">
                            <u-icon :name="citem.isLike?'thumb-up-fill':'thumb-up'"></u-icon>
                            <view class="count">
                                {{citem.likes | resetNum}}
                            </view>
                        </view>
                    </view>
                    <view class="content">
                        {{citem.content}}
                    </view>
                    <view class="date-report">
                        <view class="date-reply-delete">
                            <view class="date mr">
                                {{citem.createTime |resetDate}}
                            </view>
                            <view v-if="token != null" @click="open(citem,info.id)" class="reply-buttom mr">
                                回复
                            </view>
                            <view v-if="accountInfo.id == citem.userInfo.id && token != null" @click="remove(citem,'children',index,cindex)" class="reply-buttom mr">
                                删除
                            </view>
                        </view>
                        <view v-if="token != null" @click="report(citem)" class="report">
                            举报
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { mapState } from "vuex"
export default {
    props:{
        info:{
            type:Object,
            default:null
        },
        index:{
            type: Number,
            default: 0
        }
    },
    data(){
        return{
        }
    },
    computed:{
        ...mapState("user",["token","accountInfo"])
    },
    methods:{
        async like(e){
            if (this.token == null || this.token == "") {
                // 跳转路由，如果跳转不了尝试条件编译
                this.$Router.push({path:"/404"})
                return
            }
            this.$emit("commentLike",e)
        },
        report(e){
            if (this.token == null || this.token == "") {
                // 跳转路由，如果跳转不了尝试条件编译
                this.$Router.push({path:"/login"})
                return
            }
            this.$emit("commentReport",e)
        },
        remove(e,mode,index,cindex){
            if (this.token == null || this.token == "") {
                // 跳转路由，如果跳转不了尝试条件编译
                this.$Router.push({path:"/login"})
                return
            }
            this.$emit("commentDelete",e,mode,index,cindex)
        },
        goProfile(e){
            this.$Router.push({name:`user`,params: { id: e }})
        },
        open(e,topId){
            if (this.token == null || this.token == "") {
                // 跳转路由，如果跳转不了尝试条件编译
                this.$Router.push({path:"/404"})
                return
            }
            const formData = {
                topId: topId,
                parentInfo: e
            }
            this.$emit("reply",formData)
        },
    }
}
</script>

<style lang="scss" scoped>
.item{
    display: flex;
    margin-bottom: 20rpx;
    .info{
        flex: 1;
        margin-left: 20rpx;
        .nickName-lv-like{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .nickName-lv{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 10rpx;
                .nickName{
                    font-size: 30rpx;
                    font-weight: 700;
                }
                .lv-vip{
                    margin-top: 6rpx;
                    display: flex;
                    align-items: center;
                    font-size: 18rpx;
                    color: #909990;
                    .mr{
                        margin-right: 6rpx;
                    }
                    .vip{
                        color: red;
                    }
                }
            }
            .like-adoption{
                display: flex;
                .like{
                    display: flex;
                    align-items: center;
                    .count{
                        margin-left: 10rpx;
                        font-size: 24rpx;
                        color: #909399;
                    }
                }
            }
        }
        .content{
            font-size: 30rpx;
            color: #909399;
        }
        .date-report{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .date-reply-delete{
                display: flex;
                align-items: center;
                .date{
                    font-size: 24rpx;
                    color: #909399;
                    line-height: 48rpx;
                }
                .reply-buttom{
                    text-align: center;
                    padding: 6rpx 10rpx;
                    border-radius: 60rpx;
                    line-height: 48rpx;
                    font-size: 24rpx;
                    color: #909399;
                }
                .mr{
                    margin-right: 16rpx;
                }
            }
            .report{
                font-size: 24rpx;
                color: #909399;
            }
        }
        .reply-list{
            background: #f2f6fc;
            // height: 120rpx;
            margin-top: 10rpx;
            padding: 20rpx;
            border-radius: 8rpx;
            .reply-name-box{
                margin-bottom: 10rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .name-box{
                    display: flex;
                    align-items: center;
                    color: #909399;
                    font-size: 24rpx;
                    .reply-name{
                        margin-right: 10rpx;
                        font-size: 30rpx;
                        font-weight: 700;
                        white-space:nowrap; //强制文字显示在一行上
                        overflow:hidden; //设置超出部分隐藏 使用前先设置div宽度
                        text-overflow:ellipsis; //溢出文本显示省略号的详细方法
                    }
                    .comment-name{
                        margin-left: 10rpx;
                        font-size: 30rpx;
                        font-weight: 700;
                        white-space:nowrap; //强制文字显示在一行上
                        overflow:hidden; //设置超出部分隐藏 使用前先设置div宽度
                        text-overflow:ellipsis; //溢出文本显示省略号的详细方法
                    }
                }
                .like{
                    display: flex;
                    align-items: center;
                    .count{
                        margin-left: 10rpx;
                        font-size: 24rpx;
                        color: #909399;
                    }
                }
            }
        }
    }
}
</style>