<template>
    <view>
		<view class="list">
			<view class="item">
				<view class="cover">
					<u-image
					height="100rpx"
					width="100rpx" 
					shape="circle"
					src="https://cdn.uviewui.com/uview/album/1.jpg">
					</u-image>
				</view>
				<view class="info">
                    <view class="title">
                        <u--text size="28rpx" :lines="1" bold text="我用十年青春,赴你最后之约"></u--text>
                        <view class="description">
                            <u--text 
                            :lines="1"
                            type="info"
                            size="24rpx"
                            text="我用十年青春,赴你最后之约我用十年青春,赴你最后之约我用十年青春,赴你最后之约
                            我用十年青春,赴你最后之约
                            我用十年青春,赴你最后之约"></u--text>
                        </view>
                    </view>
                    <view class="btn">
                        <view class="action">
                            关注
                        </view>
                    </view>
				</view>
			</view>
            <view class="item">
				<view class="cover">
					<u-image
					height="100rpx"
					width="100rpx" 
					shape="circle"
					src="https://cdn.uviewui.com/uview/album/1.jpg">
					</u-image>
				</view>
				<view class="info">
                    <view class="title">
                        <u--text size="28rpx" :lines="1" bold text="我用十年青春,赴你最后之约"></u--text>
                        <view class="description">
                            <u--text 
                            :lines="1"
                            type="info"
                            size="24rpx"
                            text="我用十年青春,赴你最后之约我用十年青春,赴你最后之约我用十年青春,赴你最后之约
                            我用十年青春,赴你最后之约
                            我用十年青春,赴你最后之约"></u--text>
                        </view>
                    </view>
                    <view class="btn">
                        <view class="action">
                            关注
                        </view>
                    </view>
				</view>
			</view>
            <view class="item">
				<view class="cover">
					<u-image
					height="100rpx"
					width="100rpx" 
					shape="circle"
					src="https://cdn.uviewui.com/uview/album/1.jpg">
					</u-image>
				</view>
				<view class="info">
                    <view class="title">
                        <u--text size="28rpx" :lines="1" bold text="我用十年青春,赴你最后之约"></u--text>
                        <view class="description">
                            <u--text 
                            :lines="1"
                            type="info"
                            size="24rpx"
                            text="我用十年青春,赴你最后之约我用十年青春,赴你最后之约我用十年青春,赴你最后之约
                            我用十年青春,赴你最后之约
                            我用十年青春,赴你最后之约"></u--text>
                        </view>
                    </view>
                    <view class="btn">
                        <view class="action">
                            关注
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
	margin-top: 30rpx;
	.item{
		display: flex;
        align-content: center;
		margin-bottom: 20rpx;
        border-bottom: 1px solid #efefef63;
        padding-bottom: 20rpx;
		.cover{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
		.info{
			margin-left: 20rpx;
			display: flex;
			justify-content: space-between;
            align-items: center;
            .title{
                flex: 1;
                .description{
                    margin-top: 10rpx;
                }
            }
            
            .btn{
                margin-left: 30rpx;
                display: flex;
                align-items: center;
                .action{
                    font-size: 28rpx;
                    color: #13c2c2;
                    padding: 8rpx 20rpx;
                    border-radius: 8rpx;
                    background-color: #e6fffb;
                    margin-right: 10rpx;
                }
            }
		}
	}
}

</style>