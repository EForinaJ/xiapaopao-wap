<template>
    <view>
		<view class="list">
			<view class="item">
				<view class="cover">
					<u-image
					height="150rpx"
					width="200rpx" 
					radius="8rpx" 
					src="https://cdn.uviewui.com/uview/album/1.jpg">
					</u-image>
				</view>
				<view class="info">
					<view>
						<view class="title-forum-category">
							<view class="title">
								<u--text size="24rpx" :lines="1" bold text="我用十年青春,赴你最后之约"></u--text>
							</view>
							<view class="forum-category">
								<!-- <view class="forum">
									版块标题
								</view> -->
								<view class="category">
									分类标题
								</view>
							</view>
						</view>
						<view class="description">
							<u--text 
							:lines="2"
							type="info"
							size="20rpx"
							text="我用十年青春,赴你最后之约我用十年青春,赴你最后之约我用十年青春,赴你最后之约
							我用十年青春,赴你最后之约
							我用十年青春,赴你最后之约"></u--text>
						</view>
					</view>
					<view class="meta-date">
						<view class="date">
						<u--text 
				
						type="info"
						size="20rpx"
						text="一天之前"></u--text>
						</view>
						<view class="meta">
							<view class="icon-num">
								<u-icon name="eye"></u-icon>
								<view class="num">0</view>
							</view>
							<view class="icon-num">
								<u-icon name="heart"></u-icon>
								<view class="num">0</view>
							</view>
							<view class="icon-num">
								<u-icon name="chat"></u-icon>
								<view class="num">0</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
.list{
	margin-top: 20rpx;
	.item{
		display: flex;
		margin-bottom: 20rpx;
		.cover{
			width: 200rpx;
			height: 150rpx;
			border-radius: 8rpx;
		}
		.info{
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title-forum-category{
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
				.title{
					flex: 1;
				}
				.forum-category{
					margin-left: 20rpx;
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
			.description{
				margin-bottom: 10rpx;
			}
			.meta-date{
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