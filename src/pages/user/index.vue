<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
            leftIconColor="#fff"
            bgColor="rgb(0, 0, 0,0)"
            class="navbar"
			:autoBack="true"
			:fixed="false"
			:title="info.title"
			:border="false">
		</u-navbar>
        <!-- 用户信息 -->
        <view class="cover" :style="{
            backgroundImage:`url(${info.cover})`
        }">
            <view class="user-box">
                <view class="user-bg">
                    <view class="nickName-lv-vip">
                        <view class="nickName">
                            {{info.nickName}}
                        </view>
                        <view class="lv-vip">
							<view  class="lv mr">
								<u--image 
								:showLoading="true" 
								:src="info.grade.icon" 
								height="15" 
								width="30"/>
							</view>
							<view 
							v-if="info.vip" 
							class="vip u-font-20 mr">
								<u--image 
								:showLoading="true" 
								:src="info.vip.icon" 
								height="15" width="30"/>
							</view>
						</view>
                    </view>

                    <view class="user-mate">
                        <view class="mate-item">
                            <view class="count">
                                {{info.follows | resetNum}}
                            </view>
                            <view class="text">
                                关注
                            </view>
                        </view>
                        <view class="mate-item">
                            <view class="count">
                                {{info.fans | resetNum}}
                            </view>
                            <view class="text">
                                粉丝
                            </view>
                        </view>
                        <view class="mate-item">
                            <view class="count">
                                {{info.posts | resetNum}}
                            </view>
                            <view class="text">
                                帖子
                            </view>
                        </view>
                    </view>

                    <view class="description-box">
                        个人简介：{{info.description}}
                    </view>

                    <view class="btn-box">
                        <view  @click="follow" class="btn follow">
                            {{info.isFollow ? "取消关注":"关注"}}
                        </view>
                        <view @click="openShareSheet" class="btn">
                            分享
                        </view>
                    </view>

                    <view class="avatar">
                        <u--image 
                        shape="circle"
                        :showLoading="true" 
                        :src="info.avatar" 
                        width="120rpx"
                        height="120rpx"/>
                    </view>
                </view>
            </view>
        </view>
        
        <!-- <view class="tabs">
            <u-tabs 
            @change="changeTab"
                :list="listTab"
                    itemStyle="padding-left: 30rpx; padding-right: 30rpx; height:60rpx"
            >
            </u-tabs>
        </view> -->

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
        
        <!-- 分享 -->
		<u-popup 
		bgColor="#f9f9f9" 
		:round="8" 
		:show="share.sheet" 
		@close="closeShareSheet">
            <u-toast ref="shareToast"></u-toast>
			<view class="share-action">
				<view class="share-list">
					<view class="item" @click="sharewechat">
						<u-avatar bg-color="#5ac725" icon="weixin-fill" size="46" font-size="30"></u-avatar>
						<view class="text">
							微信
						</view>
					</view>
					<view class="item" @click="shareqq">
						<u-avatar bg-color="#3c9cff" icon="qq-fill" size="46" font-size="30"></u-avatar>
						<view class="text">
							QQ
						</view>
					</view>
					<!-- #ifdef H5 -->
					<view class="item" v-clipboard:copy="`${base.url}/post/${info.id}`" 
						v-clipboard:success="copyLink" >
						<u-avatar  icon="attach" size="46" font-size="30"></u-avatar>
						<view class="text">
							复制链接
						</view>
					</view>
					<!-- #endif  -->
					<!-- #ifndef  -->
					<view class="item" @click="copyLink">
						<u-avatar  icon="attach" size="46" font-size="30"></u-avatar>
						<view class="text">
							复制链接
						</view>
					</view>
					<!-- #endif  -->
					<!-- <view class="item" @click="shareReport">
						<u-avatar icon="warning" size="46" font-size="30"></u-avatar>
						<view class="text">
							举报
						</view>
					</view> -->
				</view>
				<view @click="closeShareSheet" class="close-btn">
					取消分享
				</view>
			</view>
		</u-popup>
    </view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
import PostItem from "@/components/content/post"
export default {
    components:{
		PostItem,
	},
	data() {
		return {

			id:0,
			loading:false,
            info:{
                grade:{
                    icon:""
                }
            },
           
			queryParam: {
                page: 1,
                limit: 20,
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
		
		if (this.$Route.query.id == undefined || this.$Route.query.id == null || this.$Route.query.id == "" || this.$Route.query.id == 0 || isNaN(this.$Route.query.id)) {
			uni.$u.http.route("/404")
		}
		this.id = parseInt(this.$Route.query.id)
        this.loading = true
		this.getData()
        this.getPostList()
        this.loading = false
	},
    onPullDownRefresh(){
        this.loading = true
        this.total = 0
        this.list = []
        this.status = "loadmore"
        this.queryParam.page = 1
		this.getData()
        this.getPostList()
        this.loading = false
        uni.stopPullDownRefresh()
	},
	methods: {
        goUser(e){
            this.$Router.push({name:`user`,params: { id: e }})
        },
        goPost(e){
            this.$Router.push({name:`post`,params: { id: e }})
        },
        goCategory(e){
            this.$Router.push({name:`category`,params: { id: e }})
        },
        async follow(){
            if (this.token == null || this.token == "") {
				// 跳转路由，如果跳转不了尝试条件编译
				this.$Router.push({path:"/lgoin"})
				return
			}
            if (this.info.isFollow) {
                this.info.fans -= 1
            }else{
                this.info.fans += 1
            }
            this.info.isFollow = !this.info.isFollow
            const res = await uni.$u.http.post(api.postUserFollow,{id:this.info.id},{
				custom: {auth: true},
			})
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                if (this.info.isFollow) {
                this.info.fans -= 1
                }else{
                    this.info.fans += 1
                }
               this.info.isFollow = !this.info.isFollow
                return
            }
        },
        async getData(){
            const res = await uni.$u.http.get(api.getUserInfo,{
                params:{id:this.id},
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    title: res.message,
                    type: 'error',
                })
            }
            this.info = res.data.info
               
        },
        async getPostList(){
			this.status = "loading"
            this.queryParam.author = this.id
            const res = await uni.$u.http.get(api.getPostList,{
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
            this.list = res.data.list != null ? [...this.list,...res.data.list] : [...this.list]
            this.total = res.data.total || 0
            this.status = "loadmore"
		},
        // async getWikiList(){
		// 	this.status = "loading"
        //     this.queryParam.author = this.id
        //     const res = await uni.$u.http.get(api.getWikiList,{
        //         params: this.queryParam,
        //         custom: {auth: true},
        //     }) 
        //     if (res.code != 1) {
        //         this.$refs.uToast.show({
        //             message: res.message,
        //             type: 'error',
        //         })
        //         return
        //     }
        //     res.data.list = res.data.list == null ? [] : res.data.list.map((item)=>{
        //         if (item.type == 1 && item.images != "") {
        //             item.images = JSON.parse(item.images)
        //         }
        //         return item
        //     })
        //     this.isShow = res.data.list.length > 0 ? false : true
        //     this.list = [...this.list,...res.data.list]
        //     this.total = res.data.total
        //     this.status = "loadmore"
		// },
        onReachBottom(){  //上拉触底函数
            if (!this.isShow) {
                this.queryParam.page += 1

                this.getPostList()
                return
            }
            this.status = "nomore"
        },
        changeTab({index}){
            this.loading = true
            this.total = 0
            this.list = []
            this.status = "loadmore"
            this.queryParam.page = 1
            if (index == 0) {
                this.getPostList()
            }
            if (index == 1) {
                this.getWikiList()
            }
            this.tabCurrent = index
            this.loading = false
        },




        openShareSheet(){
            this.share.sheet = !this.share.sheet
        },
        closeShareSheet(){
            this.share.sheet = !this.share.sheet
        },
        shareqq(){
            this.$refs.uToast.show({
                message: "此功能正在开发中",
                type: 'error',
            })
            this.closeShareSheet()
            return
        },
        sharewechat(){
            this.$refs.uToast.show({
                message: "此功能正在开发中",
                type: 'error',
            })
            this.closeShareSheet()
            return
        },
        copyLink(){
			// #ifndef H5
            uni.setClipboardData({
                data: this.base.url+"/post/"+this.id,
                success: () => {
                    this.closeSheet()
                }
            });
			// #endif
			// #ifdef H5
            this.$refs.uToast.show({
                message: "复制成功了",
                type: 'success',
            })
			// #endif
            this.closeShareSheet()
        },
	}
};
</script>

<style lang="scss" scoped>
.container{
    //  background-color: #eff1f3;
    .navbar{
        position: relative;
        z-index: 2;
    }
    .cover{
        width: 100%;
        height: 400rpx;
        position: absolute;
        top: 0;
        z-index: 1;
        background-size:cover;
        background-repeat: no-repeat;
        .user-box{
            width: 100%;
            z-index: 2;
            top: 200rpx;
            position: absolute;
            .user-bg{
                position: relative;
                border-radius: 16rpx;
                background-color: white;
                margin: 30rpx;
                padding: 30rpx;
                .avatar{
                    position: absolute;
                    top: -50rpx;
                    right: 60rpx;
                    border-radius: 50%;
                    border: 6rpx solid white;
                }
                .nickName-lv-vip{
                    display: flex;
                    align-items: center;
                    .nickName{
                        margin-right: 10rpx;
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
                .user-mate{
                    display: flex;
                    margin-top: 10rpx;
                    .mate-item{
                        display: flex;
                        margin-right: 30rpx;
                         font-size: 24rpx;
                        .count{
                            margin-right: 8rpx;
                            font-weight: 700;
                        }
                        .text{
                            color: #909990;
                            -webkit-transform: scale(0.6);
                            transform: scale(0.6);
                        }
                    }
                }
                .description-box{
                    margin-top: 10rpx;
                    width: 100%;
                    font-size: 24rpx;
                    color: #909990;
                    -webkit-transform: scale(0.8);
                    transform: scale(0.8);
                    transform-origin:0 0;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    -o-text-overflow:ellipsis;
                    overflow: hidden;
                }
                .btn-box{
                    margin-top: 10rpx;
                    display: flex;
                    .btn{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 30rpx;
                        padding: 10rpx 30rpx;
                        font-size: 24rpx;
                        font-weight: bold;
                        color: white;
                        margin-right: 10rpx;
                        background-color: rgb(178, 178, 178);
                    }
                    .follow{
                        background-color: #738aec;
                        padding: 10rpx 100rpx;
                    }
                }
            }
        }
    }

    .u-page{
        margin-top: 400rpx;
        // margin-top: 420rpx;
        padding: 0 30rpx;
        .list{
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
        }
    }
    .share-action{

        position: relative;
        .share-list{
            
            padding: 30rpx;
            display: flex;
            justify-content: space-around;
            padding-bottom: 20rpx;
            // border-bottom: #8590a6 solid 1rpx; 
            .item{
                flex-direction: column;
                display: flex;
                
                align-items: center;
                .text{
                    margin-top: 10rpx;
                    font-size: 24rpx;
                    font-weight: 700;
                    color: #8590a6;
                }
            }
        }
        .close-btn{
            padding: 20rpx 0;
            background-color: white;
            position: relative;
            bottom: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
        }
    }
}
</style>
