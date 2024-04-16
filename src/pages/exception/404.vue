<template>
	<view class="content">
		<!-- 自定义顶部导航 -->
		<!-- #ifdef H5 -->
			<u-navbar :is-back="false" :border-bottom="false" title="">
				<view class="slot-wrap">
					<view class="navbar-l">
						<u--image 
							width="160rpx"
							height="56rpx"
							:src="base.logo">
						</u--image>
					</view>
					<view class="navbar-r">
						<u-avatar 
							v-if="token"
							class="ml"
							size="56"
							shape="circle" 
							:src="userInfo.avatar"
							@click="goAccount"
						/>
						<u-avatar
							v-if="token == null"
							class="ml" 
							size="56"
							shape="circle"
							@click="goLogin"
						/>
						<u-button class="ml" shape="circle" size="mini" type="warning">下载app</u-button>
					</view>
				</view>
			</u-navbar>
        <!-- #endif --> 

		<!-- #ifdef MP -->
			<u-navbar :is-back="false" :border-bottom="false" title="">
				<view class="slot-wrap">
					<view>
						<u--image 
						width="56rpx"
						height="56rpx"
						shape="circle" 
							src="../../static/logo.png">
						</u--image>
					</view>
					<view class="search-wrap">
						<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
						<u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"></u-search>
					</view>
				</view>
			</u-navbar>
        <!-- #endif --> 
        <u-gap height="200" bgColor="#fff"></u-gap>
		<view>
            <u-empty
                mode="search"
                text="你访问的页面不见了，去客户端试试吧"
                >
            </u-empty>
        </view>
        <view class="down">
            <u-button 
            shape="circle" 
            type="warning">下载app</u-button>
        </view>
	</view>
</template>

<script>
import {mapState} from "vuex"
export default {
	data() {
		return {
		}
	},
	computed:{
		
		...mapState('user',["token","userInfo"]),
		...mapState('app',["base"])
	},
	onLoad() {

	},

	methods: {
		
		goLogin(){
			uni.$u.http.route({
				url: '/login'
			})
		},
		goAccount(){
			uni.$u.http.route({
				url: '/account'
			})
		},
	}
}
</script>

<style scoped lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
		flex: 1;
		padding: 0 30rpx;
		.navbar-l {
			flex: 1;
			margin-right: 20rpx;
		}
		.navbar-r {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.ml{
				margin-left: 20rpx;
			}
		}
	}
    .down{
        margin-top: 100rpx;
        padding: 0 200rpx;
    }
</style>