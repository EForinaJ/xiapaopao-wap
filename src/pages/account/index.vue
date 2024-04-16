<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->

        <!-- 顶部 -->
        <view class="cover" :style="{
                backgroundImage:`url(${accountInfo.cover})`
            }">
            <view class="user-box">
                <view class="user-bg">
                    <view class="nickName-lv-vip">
                        <view class="nickName">
                            {{accountInfo.nickName}}
                        </view>
                        <view v-if="accountInfo.grade" class="lv-vip">
                            <view  class="lv mr">
                                <u--image 
                                :showLoading="true" 
                                :src="accountInfo.grade.icon" 
                                height="15" 
                                width="30"/>
                            </view>
                        </view>
                    </view>

                    <view class="user-mate">
                        <view class="mate-item">
                            <view class="count">
                                {{accountInfo.follows | resetNum}}
                            </view>
                            <view class="text">
                                关注
                            </view>
                        </view>
                        <view class="mate-item">
                            <view class="count">
                                {{accountInfo.fans | resetNum}}
                            </view>
                            <view class="text">
                                粉丝
                            </view>
                        </view>
                        <view class="mate-item">
                            <view class="count">
                                {{accountInfo.integral | resetNum}}
                            </view>
                            <view class="text">
                                积分
                            </view>
                        </view>
                    </view>

                    <view class="description-box">
                        个人简介：{{accountInfo.description}}
                    </view>

                    <view class="btn-box">
                        <view class="left">
                            <view @click="go('/account/edit')" class="btn follow">
                                编辑资料
                            </view>
                            <view class="btn">
                                签到
                            </view>
                        </view>
                        <view  class="right">
                            <u--image @click="logout" width="50rpx" height="50rpx" src="/static/image/account/logout.png" mode="widthFix"></u--image>
                        </view>
                    </view>

                    <view class="avatar">
                        <u--image 
                        shape="circle"
                        :showLoading="true" 
                        :src="accountInfo.avatar" 
                        width="120rpx"
                        height="120rpx"/>
                    </view>
                </view>
            </view>
        </view>

        <view class="u-page">

            <!-- <view class="gird">
                <view class="item">
                    <view class="icon">
                        <u--image width="80rpx" height="80rpx" src="/static/image/account/cz.png"></u--image>
                    </view>
                    <view class="text">
                        <u--text bold size="24rpx" type="info" text="我的内容"></u--text>
                    </view>
                </view>
                <view class="item">
                    <view class="icon">
                        <u--image width="80rpx" height="80rpx" src="/static/image/account/order.png"></u--image>
                    </view>
                    <view class="text">
                        <u--text bold size="24rpx" type="info" text="我的收藏"></u--text>
                    </view>
                </view>
                <view class="item">
                    <view class="icon">
                        <u--image width="80rpx" height="80rpx" src="/static/image/account/integral.png"></u--image>
                    </view>
                    <view class="text">
                        <u--text bold size="24rpx" type="info" text="个人积分"></u--text>
                    </view>
                </view>
            </view> -->

            <view class="cell">
                <view class="item" @click="go('/account/post')">
                    <view class="icon-text">
                        <view class="icon">
                            <u--image width="40rpx" height="40rpx" src="/static/image/account/post.png"></u--image>
                        </view>
                        <view class="text">
                            <u--text size="24rpx" type="info" text="我的帖子"></u--text>
                        </view>
                    </view>
                    <view>
                        <u-icon name="arrow-right"></u-icon>
                    </view>
                </view>
                <!-- <view class="item" @click="go('/account/wiki')">
                    <view class="icon-text">
                        <view class="icon">
                            <u--image width="40rpx" height="40rpx" src="/static/image/account/wiki.png"></u--image>
                        </view>
                        <view class="text">
                            <u--text size="24rpx" type="info" text="我的百科"></u--text>
                        </view>
                    </view>
                    <view>
                        <u-icon name="arrow-right"></u-icon>
                    </view>
                </view> -->
                <view class="item" @click="go('/account/favorite')">
                    <view class="icon-text">
                        <view class="icon">
                            <u--image width="40rpx" height="40rpx" src="/static/image/account/favorite.png"></u--image>
                        </view>
                        <view class="text">
                            <u--text size="24rpx" type="info" text="我的收藏"></u--text>
                        </view>
                    </view>
                    <view>
                        <u-icon name="arrow-right"></u-icon>
                    </view>
                </view>
                <!-- <view class="item" @click="go('/suggest')">
                    <view class="icon-text">
                        <view class="icon">
                            <u--image width="40rpx" height="40rpx" src="/static/image/account/integral.png"></u--image>
                        </view>
                        <view class="text">
                            <u--text size="24rpx" type="info" text="个人积分"></u--text>
                        </view>
                    </view>
                    <view>
                        <u-icon name="arrow-right"></u-icon>
                    </view>
                </view> -->
            </view>

            <view class="cell">
                <view class="item" @click="go('/suggest')">
                    <view class="icon-text">
                        <view class="icon">
                            <u--image width="40rpx" height="40rpx" src="/static/image/account/suggest.png"></u--image>
                        </view>
                        <view class="text">
                            <u--text size="24rpx" type="info" text="意见反馈"></u--text>
                        </view>
                    </view>
                    <view>
                        <u-icon name="arrow-right"></u-icon>
                    </view>
                </view>
                <view class="item" @click="go('/about')">
                    <view class="icon-text">
                        <view class="icon">
                            <u--image width="40rpx" height="40rpx" src="/static/image/account/about.png"></u--image>
                        </view>
                        <view class="text">
                            <u--text size="24rpx" type="info" text="关于我们"></u--text>
                        </view>
                    </view>
                    <view>
                        <u-icon name="arrow-right"></u-icon>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {mapState,mapActions} from "vuex"
import api from "@/api/index"
export default {
    data(){
        return{
            list1: [
                '/static/image/map/Olympus.png',
                '/static/image/map/Storm_Point.png',
                '/static/image/map/Worlds_Edge.png',
            ]
        }
    },
    computed:{
		...mapState('user',["token","accountInfo"])
	},
    onLoad(){
        if (this.token == null) {
			this.$Router.push({path:'/login'})
			return
		}
    },
    methods:{
        ...mapActions("user",["A_UPDATE_TOKEN"]),
        go(url){
			if (this.token == null) {
				this.$Router.push({path:'/login'})
				return
			}


			if (url == "/account/wallet/order") {
				this.$refs.uToast.show({
					message: '功能正在开发中，敬请期待',
					type: 'error',
				})

				return
			}


			this.$Router.push({path:url})
			return
		},
        async logout(){
			try {
				const res = await uni.$u.http.post(api.postLogout)
				if (res.code!=1) {
					this.$refs.uToast.show({
						message: res.message,
						type: 'error',
					})
					return
				}
				this.A_UPDATE_TOKEN(null)
				uni.removeStorageSync('xpp-token');
                
				setTimeout(()=>{
					this.$Router.push({path:'/'})
				},1000)
			} catch (error) {
				console.log(error);
			}
		},
        async getData(){
            const res = await uni.$u.http.get(api.getPage,{
                params: {id:this.id},
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    title: res.message,
                    type: 'error',
                })
                // this.$Router.push({path:'/404'})
                return
            }
            this.accountInfo = res.data.accountInfo
        },
    }
}
</script>

<style lang="scss" scoped>
.container{
    min-height: 100vh;
    background-color: #eff1f3;
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
                    justify-content: space-between;
                    align-items: center;
                    .left{
                        display: flex;
                        align-items: center;
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
                    .right{

                    }
                }
            }
        }
    }
    .u-page{
        margin-top: 500rpx;
        .gird{
            margin: 20rpx 30rpx;
            padding: 20rpx;
            border-radius: 6rpx;
            background-color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .item{
                flex-direction: column;
                display: flex;
                justify-content: center;
                align-items: center;
                .text{
                    margin-top: 10rpx;
                }
            }
        }
        .cell{
            margin: 20rpx 30rpx;
            padding: 20rpx;
            border-radius: 6rpx;
            background-color: white;
            .item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 14rpx;
                .icon-text{
                    display: flex;
                    align-items: center;
                    .text{
                        margin-left: 10rpx;
                    }
                }
            }
        }  
    }
}

</style>
