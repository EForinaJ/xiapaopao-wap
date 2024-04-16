<template>
    <view>
        <view v-for="(item,index) in list" :key="index" class="item">
            <view class="top">
                <view  @click="goUser(item.userInfo.id)" class="avatar">
                    <u--image 
                    width="90rpx" 
                    height="90rpx" 
                    :src="item.userInfo.avatar |resetImage(100,100)" shape="circle">
                    </u--image>
                </view>
                <view class="nickName-grade-date">
                    <view class="nickName-grade">
                        <view  @click="goUser(item.userInfo.id)" class="nickName">
                            <u--text size="24rpx" :lines="1" bold :text="item.userInfo.nickName"></u--text>
                        </view>
                        <view class="grade">
                            <view class="date">
                                {{item.createTime | resetDate}}
                            </view>
                            <u--image 
                            width="80rpx"
                            height="30rpx"
                            :src="item.userInfo.grade.icon">
                            </u--image>
                        </view>
                    </view>
                    <view class="forum-category">
                        <view v-if="item.forum" class="forum">
                            {{item.forum.title}}
                        </view>
                        <view v-if="item.category" @click="goCategory(item.category.id)" class="category">
                            {{item.category.title}}
                        </view>
                    </view>
                </view>
            </view>
            <view class="center">
                <view @click="goPost(item.id)" class="title">
                    <u--text 
                    :lines="2"
                    size="30rpx"
                    bold 
                    :text="item.title"></u--text>
                </view>
                <view @click="goPost(item.id)" v-if="item.content" class="description">
                    <u--text 
                    :lines="3"
                    type="info"
                    size="24rpx"
                    :text="item.content"></u--text>
                </view>
                <view v-if="item.images" class="image">
                    <ImageAdaptation :list="item.images"/>
                </view>
            </view>
            <view class="footer">
                <view class="meta">
                    <view class="icon-num">
                        <u-icon name="eye"></u-icon>
                        <view class="num">{{item.views | resetNum}}</view>
                    </view>
                    <view class="icon-num">
                        <u-icon name="heart"></u-icon>
                        <view class="num">{{item.likes | resetNum}}</view>
                    </view>
                    <view class="icon-num">
                        <u-icon name="chat"></u-icon>
                        <view class="num">{{item.comments | resetNum}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>


<script>
import ImageAdaptation from "@/components/adaptation/image"
export default {
    props:{
        list:{
            type: Array,
            default: []
        }
    },
    components:{
        ImageAdaptation
    },
    methods:{
        goUser(e){
            this.$Router.push({name:`user`,params: { id: e }})
        },
        goPost(e){
            this.$Router.push({name:`post`,params: { id: e }})
        },
        goCategory(e){
            this.$Router.push({name:`category`,params: { id: e }})
        }
    }
}
</script>


<style lang="scss" scoped>
.item{
    border-bottom: 1px solid #e5e9f265;
    margin-bottom: 20rpx;
    padding-bottom: 20rpx;
    .top{
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        .avatar{
            width: 90rpx;
            height: 90rpx;
            border-radius: 50%;
        }
        .nickName-grade-date{
            flex: 1;
            margin-left: 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .nickName-grade{
                flex: 1;
                .grade{
                    display: flex;
                    align-items: center;
                    margin-top: 10rpx;
                    .date{
                        margin-right: 14rpx;
                        font-size: 24rpx;
                        color: #999;
                    }
                }
            }
            .forum-category{
                display: flex;
                align-items: center;
                .forum{
                    font-size: 20rpx;
                    color: #13c2c2;
                    padding: 6rpx 8rpx;
                    border-radius: 8rpx;
                    background-color: #e6fffb;
                    margin-right: 10rpx;
                }
                .category{
                    font-size: 20rpx;
                    color: #eb2f96;
                    padding: 6rpx 8rpx;
                    border-radius: 8rpx;
                    background-color: #fff0f6;
                }
            }	
            
        }
    }
    .center{
        margin-bottom: 20rpx;
        .title{
            margin-bottom: 15rpx;
        }
        .description{
            margin-bottom: 15rpx;
        }
    }
    .footer{
        display: flex;
        justify-content: space-between;
        .meta{
            display: flex;
            align-items: center;
            .icon-num{
                margin-right: 24rpx;
                display: flex;
                align-items: center;
                .num{
                    margin-left: 6rpx;
                    color: #999;
                    font-size: 24rpx;
                }
            }
        }
    }
}
</style>