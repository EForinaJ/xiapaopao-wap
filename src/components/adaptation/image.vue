<template>
	<view>
		<view v-if="list.length == 1" class="image-one">
			<u--image 
				@click="previewImg(0)"
				:src="list[0]" 
				mode="aspectFill"
				width="100%"
				radius="8rpx"
				/>
		</view>
		<u-row  gutter="10" v-if="list.length == 2">
			<u-col span="6">
				<u--image 
					@click="previewImg(0)"
					:src="list[0]" 
					radius="8rpx"
					mode="aspectFill"
					width="100%"
					height="175"
					/>
			</u-col>
			<u-col span="6">
				<u--image 
					@click="previewImg(1)"
					:src="list[1]" 
					radius="8rpx"
					mode="aspectFill"
					width="100%"
					height="175"
					/>
			</u-col>
		</u-row>
		<u-row  gutter="10" class="image-three" v-if="list.length >= 3">
			<u-col span="4">
				<u--image 
					@click="previewImg(0)"
					:src="list[0]" 
					radius="8rpx"
					mode="aspectFill"
					width="100%"
					height="113.33"
					/>
			</u-col>
			<u-col span="4">
				<u--image 
					@click="previewImg(1)"
					:src="list[1]" 
					radius="8rpx"
					mode="aspectFill"
					width="100%"
					height="113.33"
					/>
			</u-col>
			<u-col span="4">
				<u--image 
					@click="previewImg(2)"
					:src="list[2]" 
					radius="8rpx"
					mode="aspectFill"
					width="100%"
					height="113.33"
					/>
			</u-col>
			<text v-if="list.length > 3" class="count">{{list.length}}</text>
		</u-row>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			},
		},
		data() {
			return {
			}
		},
		mounted() {
			// this.judgeImg();
		},
		methods: {
			// 预览图片
			previewImg(e) {
				// this.show = !this.show
				uni.previewImage({
					current: e,
					urls: this.list
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.image-one{
	width: 100%;
}

.image-three{
	position: relative;
	.count{
		position: absolute;
		right: 10px;
		top: 10px;
		height: 24px;
		line-height: 24px;
		border-radius: 15px;
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		padding: 0 8px;
		font-size: 13px;
		font-weight: 500;
		color: #fff;
		white-space: nowrap;
		background-color: rgba(26,26,26,.3);
	}
}
.warp{
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.rect{
		width: 100%;
	}
}
</style>