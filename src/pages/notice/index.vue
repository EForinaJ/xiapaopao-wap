<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
        <u-navbar
            safeAreaInsetTop
            placeholder
			:fixed="true"
            leftIcon=""
            leftText="消息通知"
			:border="false">
		</u-navbar>
		<view class="u-page">
			<view class="notice-type">
				<view @click="go('/notice/comment')" class="box">
					<u-badge absolute :offset="[-5,0]"  max="99" :value="comment"></u-badge>
					<view class="icon">
						<u--image 
						width="120rpx"
						height="120rpx"
						src="/static/image/notice/comment.png">
						</u--image>
					</view>
					<view class="text">
						<u--text size="26rpx" bold type="info" text="评论"></u--text>	
					</view>
				</view>
				<view class="box" @click="go('/notice/like')">
					<u-badge absolute :offset="[-5,0]"  max="99" :value="like"></u-badge>
					<view class="icon">
						<u--image 
						width="120rpx"
						height="120rpx"
						src="/static/image/notice/like.png">
						</u--image>
					</view>
					<view class="text">
						<u--text size="26rpx" bold type="info" text="点赞"></u--text>	
					</view>
				</view>
				<view class="box" @click="go('/notice/follow')">
					<u-badge absolute :offset="[-5,0]"  max="99" :value="follow"></u-badge>
					<view class="icon">
						<u--image 
						width="120rpx"
						height="120rpx"
						src="/static/image/notice/follow.png">
						</u--image>
					</view>
					<view class="text">
						<u--text size="26rpx" bold type="info" text="关注"></u--text>	
					</view>
				</view>
				<view class="box" @click="go('/notice/system')">
					<u-badge absolute :offset="[-5,0]"  max="99" :value="system"></u-badge>
					<view class="icon">
						<u--image 
						width="120rpx"
						height="120rpx"
						src="/static/image/notice/system.png">
						</u--image>
					</view>
					<view class="text">
						<u--text size="26rpx" bold type="info" text="系统"></u--text>	
					</view>
				</view>
			</view>

			<!-- <view class="message-list">
				<view class="text">
					<u--text type="info" size="38rpx" bold text="我的私信"></u--text>
					<view class="line"></view>
				</view>
				<view class="list">
					<view class="item">
						<view class="avatar">
							<u--image width="100rpx"
							height="100rpx"
							src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle">
							</u--image>
						</view>
						<view class="info">
							<view class="nickName-date">
								<view class="nickName">
									<u--text size="28rpx" bold text="用户名称"></u--text>
								</view>
								<view class="date">
									<u--text size="24rpx" type="info" text="一天之前"></u--text>
								</view>
							</view>
							<view class="content">
								<u--text :lines="1" size="24rpx" type="info" text="一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前"></u--text>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="avatar">
							<u--image width="100rpx"
							height="100rpx"
							src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle">
							</u--image>
						</view>
						<view class="info">
							<view class="nickName-date">
								<view class="nickName">
									<u--text size="28rpx" bold text="用户名称"></u--text>
								</view>
								<view class="date">
									<u--text size="24rpx" type="info" text="一天之前"></u--text>
								</view>
							</view>
							<view class="content">
								<u--text :lines="1" size="24rpx" type="info" text="一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前"></u--text>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="avatar">
							<u--image width="100rpx"
							height="100rpx"
							src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle">
							</u--image>
						</view>
						<view class="info">
							<view class="nickName-date">
								<view class="nickName">
									<u--text size="28rpx" bold text="用户名称"></u--text>
								</view>
								<view class="date">
									<u--text size="24rpx" type="info" text="一天之前"></u--text>
								</view>
							</view>
							<view class="content">
								<u--text :lines="1" size="24rpx" type="info" text="一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前"></u--text>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="avatar">
							<u--image width="100rpx"
							height="100rpx"
							src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle">
							</u--image>
						</view>
						<view class="info">
							<view class="nickName-date">
								<view class="nickName">
									<u--text size="28rpx" bold text="用户名称"></u--text>
								</view>
								<view class="date">
									<u--text size="24rpx" type="info" text="一天之前"></u--text>
								</view>
							</view>
							<view class="content">
								<u--text :lines="1" size="24rpx" type="info" text="一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前"></u--text>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="avatar">
							<u--image width="100rpx"
							height="100rpx"
							src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle">
							</u--image>
						</view>
						<view class="info">
							<view class="nickName-date">
								<view class="nickName">
									<u--text size="28rpx" bold text="用户名称"></u--text>
								</view>
								<view class="date">
									<u--text size="24rpx" type="info" text="一天之前"></u--text>
								</view>
							</view>
							<view class="content">
								<u--text :lines="1" size="24rpx" type="info" text="一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前"></u--text>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="avatar">
							<u--image width="100rpx"
							height="100rpx"
							src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle">
							</u--image>
						</view>
						<view class="info">
							<view class="nickName-date">
								<view class="nickName">
									<u--text size="28rpx" bold text="用户名称"></u--text>
								</view>
								<view class="date">
									<u--text size="24rpx" type="info" text="一天之前"></u--text>
								</view>
							</view>
							<view class="content">
								<u--text :lines="1" size="24rpx" type="info" text="一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前"></u--text>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="avatar">
							<u--image width="100rpx"
							height="100rpx"
							src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle">
							</u--image>
						</view>
						<view class="info">
							<view class="nickName-date">
								<view class="nickName">
									<u--text size="28rpx" bold text="用户名称"></u--text>
								</view>
								<view class="date">
									<u--text size="24rpx" type="info" text="一天之前"></u--text>
								</view>
							</view>
							<view class="content">
								<u--text :lines="1" size="24rpx" type="info" text="一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前一天之前"></u--text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
        
	</view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"

export default {
	components:{

	},
	data() {
		return {

			queryParam: {
                page: 1,
                limit: 10,
				cateId: 18,
				name: ""
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
		...mapState('notice',["system","comment","like","follow"]),
		...mapState('user',["accountInfo","token"])
	},
	onLoad(){
		if (this.token == null) {
			this.$Router.push({path:'/login'})
			return
		}
		// this.loading = true
		// this.list = []
		// this.total = 0
		// this.queryParam.page = 1
		// this.tabCurrent = 0
		// this.getList()
		// this.loading = false
		
	},
	onPullDownRefresh(){
		// this.isShow = false
		// this.loading = true
		// this.list = []
		// this.total = 0
		// this.queryParam.page = 1
		// this.getList()
		// this.loading = false
		// uni.stopPullDownRefresh()
	},
	methods: {
		async getList(){
			try {
				this.status = "loading"
                // this.queryParam.userId = this.id
                const res = await uni.$u.http.get(api.getPlayerList,{
					params: this.queryParam,
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
			} catch (error) {
				console.log(error)
			}
		},
		go(path){
			if (this.token == null) {
				this.$Router.push({path:'/login'})
				return
			}

			this.$Router.push({path:path})
			return
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

<style scoped lang="scss">

.u-page{
	padding: 0 30rpx;
	.notice-type{
		margin-top: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4px 12px rgba(0,0,0,.08), 0 0 1px rgba(1,0,0,.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		.box{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			.icon{
				margin-bottom: 5rpx;
				width: 120rpx;
				height: 120rpx;
				border-radius: 8rpx;
			}
			.text{
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.message-list{
		margin-top: 60rpx;
		.text{
			.line{
				border-radius: 10rpx;
				margin-top: 10rpx;
				width: 70rpx;
				height: 10rpx;
				background: #8590a6;
			}
		}
		.list{
			margin-top: 40rpx;
			.item{
				display: flex;
				align-items: center;
				padding-bottom: 18rpx;
				border-bottom: 1px solid rgba(0,0,0,.03);
				margin-bottom: 20rpx;
				.avatar{
					width: 100rpx;
					height: 100rpx;
				}
				.info{
					margin-left: 20rpx;
					.nickName-date{
						display: flex;
						align-items: center;
						.date{
							margin-left: 18rpx;
						}
					}
					.content{
						margin-top: 16rpx;
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