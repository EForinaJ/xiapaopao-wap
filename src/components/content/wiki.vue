<template>
    <view>
		<view v-for="(item,index) in list" :key="index" class="item">
			<view  @click="goWiki(item.id)" class="cover">
				<u-image
				height="150rpx"
				width="200rpx" 
				radius="8rpx" 
				:src="item.cover">
				</u-image>
			</view>
			<view class="info">
				<view>
					<view class="title-forum-category">
						<view @click="goWiki(item.id)" class="title">
							<u--text size="24rpx" :lines="1" bold :text="item.title"></u--text>
						</view>
						<view v-if="item.forumInfo" class="forum-category">
							<view class="forum">
								{{item.forumInfo.title}}
							</view>
							<view v-if="item.category" @click="goCategory(item.category.id)" class="category">
								{{item.category.title}}
							</view>
						</view>
					</view>
					<view  @click="goWiki(item.id)" class="description">
						<u--text 
						:lines="2"
						type="info"
						size="20rpx"
						:text="item.description"></u--text>
					</view>
				</view>
				<view class="meta-date">
					<view class="date">
					<u--text 
					type="info"
					size="20rpx"
					:text="item.createTime | resetDate"></u--text>
					</view>
					<view class="meta">
						<view class="icon-num">
							<u-icon name="eye"></u-icon>
							<view class="num">{{item.views | resetNum }}</view>
						</view>
						<view class="icon-num">
							<u-icon name="heart"></u-icon>
							<view class="num">{{item.likes | resetNum }}</view>
						</view>
						<view class="icon-num">
							<u-icon name="chat"></u-icon>
							<view class="num">{{item.comments | resetNum }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props:{
        list:{
            type: Array,
            default: []
        }
    },
    methods:{
        goUser(e){
            this.$Router.push({name:`user`,params: { id: e }})
        },
        goWiki(e){
            this.$Router.push({name:`wiki`,params: { id: e }})
        },
        goCategory(e){
            this.$Router.push({name:`category`,params: { id: e }})
        }
    }
}
</script>

<style lang="scss" scoped>
.item{
	display: flex;
	margin-bottom: 20rpx;
	.cover{
		width: 200rpx;
		height: 150rpx;
		border-radius: 8rpx;
	}
	.info{
		flex: 1;
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
</style>