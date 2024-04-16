<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
        <u-navbar
			:autoBack="true"
            safeAreaInsetTop
            placeholder
			:fixed="true"
            leftIcon="arrow-left"
            :leftText="info != null ? info.title : ''"
			:border="false">
		</u-navbar>
		<view class="category-info">
			<view class="cover">
				<u--image width="140rpx" height="140rpx" radius="8rpx" :src="info.cover | resetImage(100,100)"></u--image>
			</view>
			<view class="info">
				<view class="title-count">
					<view class="title">
						<u--text :lines="2" bold :text="info.title"></u--text>
					</view>
					<view class="count">
						<view class="num-text">
							<view>
								<u--text size="24rpx" type="info" text="今日"></u--text>
							</view>
							<view class="num">
								<u--text size="24rpx" type="info" :text="info.todayCount"></u--text>
							</view>
						</view>
						<view class="num-text">
							<view>
								<u--text size="24rpx" type="info" text="全部"></u--text>
							</view>
							<view class="num">
								<u--text size="24rpx" type="info" :text="info.allCount"></u--text>
							</view>
						</view>
					</view>
				</view>
				<view class="description">
					<u--text size="24rpx" type="info" :lines="1" :text="info.description"></u--text>
				</view>
			</view>
		</view>
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
			id:0,
			info:{
				title:"",
				userInfo:{
					avatar:"",
					nickName:"",
					grade:{
						title:"",
					},
					vip:{
						title:"",
					},
					isFollow:false
				},
				category:{
					title:""
				},
				tagList:[],
				comments:0,
				likes:0,
				favorites:0,
				views:0,
				createTime:"",
			},

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
		}
	},
	computed:{
		...mapState('app',["base"]),
		// ...mapState('user',["userInfo","token"])
	},
	onLoad(){
		if (this.$Route.query.id == undefined || this.$Route.query.id == null || this.$Route.query.id == "" || this.$Route.query.id == 0 || isNaN(this.$Route.query.id)) {
			this.$Router.push({path:'/404'})
		}
		this.id = parseInt(this.$Route.query.id)
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
			this.queryParam.categoryId = this.id
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
		async getData(){
            const res = await uni.$u.http.get(api.getCategoryInfo,{
				params:{id: this.id},
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
				this.getList()
                return
            }
            this.status = "nomore"
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
	}
}
</script>

<style scoped lang="scss">
.category-info{
	margin-top: 20rpx;
	padding: 30rpx;
	margin: 20rpx 30rpx;
	box-shadow: 0 4px 12px rgba(0,0,0,.08), 0 0 1px rgba(1,0,0,.1);
	display: flex;
	// justify-content: space-between;
	// align-items: center;
	.cover{
		width: 140rpx;
		height: 140rpx;
	}
	.info{
		flex-direction: column;
		display: flex;
		justify-content: space-between;
		margin-left: 30rpx;
		.title-count{
			.count{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				.num-text{
					display: flex;
					align-items: center;
					margin-right: 20rpx;
					.num{
						margin-left: 10rpx;
					}
				}
			}
		}
		.description{

		}
	}
}

.u-page{
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

</style>


