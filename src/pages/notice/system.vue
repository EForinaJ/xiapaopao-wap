<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
        <u-navbar
            :autoBack="true"
            safeAreaInsetTop
            placeholder
			:fixed="true"
            leftText="系统通知"
			:border="false">
		</u-navbar>
		<view class="u-page">
			<view v-if="list.length > 0 && !loading" class="list">
                <view class="item" v-for="(item,index) in list" :key="index">
                    <view class="avatar">
                        <u-avatar
                        icon="bell-fill" shape="circle">
                        </u-avatar>
                    </view>
                    <view class="info">
                        <view class="nickName-date">
                            <view class="nickName">
                                <u--text size="28rpx" bold :text="item.detail !=null ? item.detail.title : ''"></u--text>
                            </view>
                            <view class="date">
                                <u--text size="24rpx" type="info" :text="item.detail.createTime | resetDate"></u--text>
                            </view>
                        </view>
                        <view>
                            <view class="date">
                                 <u--text  :lines="1" size="24rpx" type="info" :text="item.detail.content"></u--text>
                            </view>
                        </view>
                    </view>
                </view>
				<view class="more">
                    <u-loadmore :status="status" :load-text="loadText"/>
                </view>
            </view>
			<view v-if="list.length == 0 && !loading" class="empity">
                <u-empty
                        mode="list"
                        icon="http://cdn.uviewui.com/uview/empty/list.png"
                >
                </u-empty>
            </view>
            <u-skeleton
                rows="3"
                title
                :loading="loading"
            ></u-skeleton>
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
                limit: 8,
                type: 1,
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
		...mapState('user',["accountInfo","token"])
	},
	onLoad(){
		if (this.token == null) {
			this.$Router.push({path:'/login'})
			return
		}
		this.loading = true
		this.list = []
		this.total = 0
		this.queryParam.page = 1
		this.getList()
		this.loading = false
		
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
                const res = await uni.$u.http.get(api.getNoticeList,{
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
	.list{
        margin-top: 40rpx;
        .item{
            display: flex;
            align-items: center;
            padding-bottom: 18rpx;
            border-bottom: 1px solid rgba(0,0,0,.03);
            margin-bottom: 20rpx;
            .info{
                flex: 1;
                margin-left: 20rpx;
                .nickName-date{
                     margin-bottom: 10rpx;
                    display: flex;
                    align-items: center;
                    .date{
                        margin-left: 18rpx;
                    }
                }
                .content{
                    margin-bottom: 10rpx;
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