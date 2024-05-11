<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="true"
			title="我的帖子"
			:border="false">
		</u-navbar>
        <!-- 帖子信息 -->
        <view class="u-page">
            <view v-if="list.length > 0" class="list">
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
                <view class="more">
                    <u-loadmore :status="status" :load-text="loadText"/>
                </view>
            </view>
            <view v-if="list.length == 0" class="empity">
                <u-empty
                        mode="list"
                        icon="http://cdn.uviewui.com/uview/empty/list.png"
                >
                </u-empty>
            </view>
        </view>
    </view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
import ImageAdaptation from "@/components/adaptation/image"
export default {
    components:{
		ImageAdaptation
	},
	data() {
		return {
			loading:false,
			queryParam: {
                page: 1,
                limit: 5,
                author:0,
                mode: 2,
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

            share:{
                sheet:false,
            },
		}
	},
    computed:{
        ...mapState('app',["base"]),
		...mapState("user",["accountInfo","token"])
	},
	onLoad() {
        this.loading = true
        this.getPostList()
        this.loading = false
	},
    onPullDownRefresh(){
        this.loading = true
        this.total = 0
        this.list = []
        this.status = "loadmore"
        this.queryParam.page = 1
        this.getPostList()
        this.loading = false
        uni.stopPullDownRefresh()
	},
	methods: {
        async getPostList(){
			this.status = "loading"
            // this.queryParam.author = this.id
            const res = await uni.$u.http.get(api.getAccountPostList,{
                params: this.queryParam,
                custom: {auth: true},
            }) 
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            this.isShow = res.data.list != null ? false : true
            res.data.list =res.data.list != null ? res.data.list :[]
            
            this.list = [...this.list,...res.data.list]
            this.total = res.data.total
            this.status = "loadmore"
		},
        onReachBottom(){  //上拉触底函数
            if (!this.isShow) {
                this.queryParam.page += 1
                this.getPostList()
                return
            }
            this.status = "nomore"
        },
	}
};
</script>

<style lang="scss" scoped>
.container{
    
    .navbar{
        position: relative;
        z-index: 2;
    }
    .u-page{
        margin-top: 120rpx;
        padding: 0 30rpx;
        .list{
            margin-top: 20rpx;
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
                        font-size: 28rpx;
                        color: #999;
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
            .more{
                padding: 20rpx 0;
            }
        }
    }
}
</style>
