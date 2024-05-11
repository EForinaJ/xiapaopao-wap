<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
        <u-navbar
            safeAreaInsetTop
            placeholder
			:fixed="true"
            leftIcon=""
            leftText="爱派克斯"
			:border="false">
		</u-navbar>
		<u-sticky bgColor="#fff">
			<view class="tabs">
				<u-tabs 
				@change="changeTab"
					:list="listTab"
						itemStyle="padding-left: 30rpx; padding-right: 30rpx; height:60rpx"
				>
				</u-tabs>
			</view>
		</u-sticky>
		
		<view class="u-page">
			<view class="category-list">
				<u-scroll-list :indicator="false">
					<view @click="goCategory(item.id)" v-for="(item,index) in info.categoryList" :key="index" class="item">
						<view class="cover">
							<u--image 
							width="140rpx"
							height="100rpx"
							:src="item.cover" radius="8rpx"></u--image>
						</view>
						<view   class="title">
							<u--text 
							:lines="1" 
							size="12" 
							:text="item.title"></u--text>
						</view>
					</view>
				</u-scroll-list>
			</view>
			
			<!-- <view class="hot box">
				<view class="title-text">
					<view>
						<u--text size="38rpx" bold lineHeight="60rpx" text="精选内容"></u--text>
					</view>
					<view>
						<u--text 
						type="info"
						lineHeight="60rpx"
						iconStyle="font-size: 24rpx" 
						size="24rpx" 
						text="查看更多" 
						suffixIcon="arrow-right"></u--text>
					</view>
				</view>
				<view class="row">
					<u-row gutter="10">
						<u-col span="8">
							<view class="right bg-purple-light">
								<view class="cover">
									<u--image 
									width="100%"
									height="220rpx"
									src="https://cdn.uviewui.com/uview/album/1.jpg" radius="8rpx">
									</u--image>
								</view>
								<view class="mask">
									<view class="title">
										<u--text :lines="2" bold color="#fff" text="我用十年青春,赴你最后之约"></u--text>
									</view>
								</view>
							</view>
						</u-col>
						<u-col span="4">
							<view class="left bg-purple-light">
								<view class="cover">
									<u--image 
									width="100%"
									height="100rpx"
									src="https://cdn.uviewui.com/uview/album/1.jpg" radius="8rpx">
									</u--image>
								</view>
								<view class="mask">
									<view class="title">
										<u--text size="12" :lines="2" color="#fff" text="我用十年青春,赴你最后之约"></u--text>
									</view>
								</view>
							</view>
							<u-gap height="10" bgColor="#fff"></u-gap>
							<view class="left bg-purple-light">
								<view class="cover">
									<u--image 
									width="100%"
									height="100rpx"
									src="https://cdn.uviewui.com/uview/album/1.jpg" radius="8rpx">
									</u--image>
								</view>
								<view class="mask">
									<view class="title">
										<u--text size="12" :lines="2"  color="#fff" text="我用十年青春,赴你最后之约"></u--text>
									</view>
								</view>
							</view>
						</u-col>
					</u-row>
					<u-gap height="10" bgColor="#fff"></u-gap>
					<u-row gutter="10">
						<u-col span="4">
							<view class="left bg-purple-light">
								<view class="cover">
									<u--image 
									width="100%"
									height="100rpx"
									src="https://cdn.uviewui.com/uview/album/1.jpg" radius="8rpx">
									</u--image>
								</view>
								<view class="mask">
									<view class="title">
										<u--text size="12" :lines="2" color="#fff" text="我用十年青春,赴你最后之约"></u--text>
									</view>
								</view>
							</view>
							<u-gap height="10" bgColor="#fff"></u-gap>
							<view class="left bg-purple-light">
								<view class="cover">
									<u--image 
									width="100%"
									height="100rpx"
									src="https://cdn.uviewui.com/uview/album/1.jpg" radius="8rpx">
									</u--image>
								</view>
								<view class="mask">
									<view class="title">
										<u--text size="12" :lines="2"  color="#fff" text="我用十年青春,赴你最后之约"></u--text>
									</view>
								</view>
							</view>
						</u-col>
						<u-col span="8">
							<view class="right bg-purple-light">
								<view class="cover">
									<u--image 
									width="100%"
									height="220rpx"
									src="https://cdn.uviewui.com/uview/album/1.jpg" radius="8rpx">
									</u--image>
								</view>
								<view class="mask">
									<view class="title">
										<u--text :lines="2" bold color="#fff" text="我用十年青春,赴你最后之约"></u--text>
									</view>
								</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</view> -->


			<view v-if="list.length > 0 && !loading" class="list">
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
						<!-- <view @click="goPost(item.id)" v-if="item.content" class="description">
							<u--text 
							:lines="3"
							type="info"
							size="24rpx"
							:text="item.content"></u--text>
						</view> -->
						<view @click="goPost(item.id)" v-if="item.content" class="description">
							<u-parse :tagStyle="style" :content="item.content"></u-parse>
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
            info:{},
			listTab: [
				{
                    name: '最新',
					value: 2,
                },
				{
                    name: '热门',
					value: 1,
                },
				{
                    name: '推荐',
					value: 3,
                }
			],

			queryParam: {
                page: 1,
                limit: 10,
				forumId:0,
				mode:2
            },
			total:0,
			list:[],
            isShow:false,
			loading:true,
            loadText: {
                loadmore: '轻轻上拉',
                loading: '努力加载中',
                nomore: '实在没有了'
            },
            status: 'loadmore',
			style: {
				span: 'font-size: 16rpx'
			}
		}
	},
	computed:{
		...mapState('app',["base"]),
		// ...mapState('user',["userInfo","token"])
	},
	onLoad(){
		this.loading = true
		this.list = []
		this.total = 0
		this.queryParam.page = 1
		this.getData()
		this.getPostList()
		this.loading = false
	},
	onPullDownRefresh(){
		this.isShow = false
		this.loading = true
		this.list = []
		this.total = 0
		this.queryParam.page = 1
		this.getPostList()
		this.loading = false
		uni.stopPullDownRefresh()
	},
	methods: {
		async getPostList(){
			this.status = "loading"
			
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
		changeTab(e){
            this.loading = true
            this.total = 0
            this.list = []
            this.status = "loadmore"
            this.queryParam.page = 1
			this.queryParam.mode = e.value
			this.getPostList()
            this.loading = false
        },

		goUser(e){
            this.$Router.push({name:`user`,params: { id: e }})
        },
        goPost(e){
            this.$Router.push({name:`post`,params: { id: e }})
        },
        goCategory(e){
            this.$Router.push({name:`category`,params: { id: e }})
        },

		async getData(){
            const res = await uni.$u.http.get(api.getSystemHome,{
				params:{id: 1},
				custom: {auth: false},
			})
			if (res.code != 1) {
				this.$refs.uToast.show({
					message: res.message,
					type: 'error',
				})
                this.$Router.push({path:'/404'})
				return
			}
			this.info = res.data.info
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
}
</script>

<style scoped lang="scss">

.u-page{
	padding: 0 30rpx;
	.category-list{
		margin-top: 30rpx;
		.item{
			flex-direction: column;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 140rpx;
			border-radius: 8rpx;
			margin-right: 20rpx;
			.title{
				margin-top: 10rpx;
			}
		}
	}
	.hot{
		.row{
			margin-top: 10rpx;
			.right{
				border-radius: 8rpx;
				height:  220rpx;
				position: relative;
				.cover{
					position: absolute;
					top: 0;
					width: 100%;
					height: 220rpx;
					object-fit: cover;
				}
				.mask{
					position: absolute;
					top: 0;
					width: 100%;
					height: 220rpx;
					border-radius: 8rpx;
					background: #00000056;
					display: flex;
						justify-content: center;
						align-items: center;
					.title{
						
						padding: 0 60rpx;
					}
					
				}
			}
			.left{
				border-radius: 8rpx;
				height:  100rpx;
				position: relative;
				.cover{
					position: absolute;
					top: 0;
					width: 100%;
					height: 100rpx;
					object-fit: cover;
				}
				.mask{
					position: absolute;
					top: 0;
					width: 100%;
					height: 100rpx;
					border-radius: 8rpx;
					background: #00000056;
					display: flex;
						justify-content: center;
						align-items: center;
					.title{
						
						padding: 0 20rpx;
					}
					
				}
			}
			.bg-purple-light {
				background: #e5e9f2;
			}
		}
	}
	.box{
		margin-bottom: 40rpx;
		.title-text{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
		}
	}
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
</style>


