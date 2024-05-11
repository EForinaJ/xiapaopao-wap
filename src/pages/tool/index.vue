<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
        <u-navbar
            safeAreaInsetTop
            placeholder
			:fixed="true"
            leftIcon=""
            leftText="爱派克斯助手"
			:border="false">
		</u-navbar>
        
        <u-loading-page  v-if="loading" loading></u-loading-page>

		<view v-if="!loading" class="u-page">
            <!-- 猎杀底分 -->
            <view class="predator">
                <view class="predator-desc-icon">
                    <view class="predator-desc-title">
                        <view class="predator-title">
                            APEX猎杀榜
                        </view>
                        <view class="predator-desc">
                            世界前750名
                        </view>
                    </view>
                    <view class="predator-icon">
                        <u--image 
                        :showLoading="true" 
                        src="/static/apexpredator1.png"
                        width="100rpx" 
                        height="100rpx"
                        />
                    </view>
                </view>
                <view class="predator-rp-more">
                    <view class="predator-rp">
                        <view class="predator-rp-text">猎杀底分：</view>
                        <view class="predator-rp-rank">
                            <u--text 
                            color="red" 
                            bold
                            size="40rpx" 
                            :text="predator.predatorScore + ' RP'">
                            </u--text>
                        </view>
                    </view>
                    <view @click="goPredatorList" class="predator-more">在榜列表<u-icon name="arrow-right"></u-icon></view>
                </view>
            </view>
            <!-- 当前大师人数以及赛季周期 -->
            <view class="master-season">
                <u-row 
                    customStyle="margin-bottom: 10px"  
                    gutter="10">
                    <u-col span="6">
                        <view class="demo-layout bg-purple-light">
                            <view class="master-desc-icon">
                                <view class="master-desc">
                                    当前大师人数
                                </view>
                                <view class="master-icon">
                                    <u--image 
                                    :showLoading="true" 
                                    src="/static/master1.png"
                                    width="60rpx" 
                                    height="60rpx"
                                    />
                                </view>
                            </view>
                            <view class="master-count">
                                <u--text 
                                color="#67309d" 
                                bold
                                size="40rpx" 
                                :text="predator.totalMasters">
                                </u--text>
                            </view>
                        </view>
                    </u-col>
                    <u-col span="6">
                        <view class="demo-layout bg-purple-dark">
                            <view class="season-desc-icon">
                                <view class="season-desc">
                                    赛季结束周期
                                </view>
                                <view class="season-icon">
                                    <u-icon name="clock-fill" color="#000" size="60rpx"></u-icon>
                                </view>
                            </view>
                            <view class="season-count">
                                    <u-count-down
                                    :time="predator.rankEndTime"
                                    millisecond
                                    :autoStart="false"
                                    @change="onChange"
                                >
                                    <view class="time">
                                        <text class="time__item">{{ timeData.days }}天</text>
                                        <text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}小时</text>
                                        <!-- <text class="time__item">{{ timeData.minutes }}分</text>
                                        <text class="time__item">{{ timeData.seconds }}秒</text> -->
                                    </view>
                                </u-count-down>
                            </view>
                        </view>
                    </u-col>
                </u-row>
            </view>
            <!-- 地图轮换-排位 -->
            <view class="map-box">
                <view class="map-current"  :style="{ backgroundImage: `url(${resetImage(info.rank.current.code)})` }"></view>
                <view class="map-next" :style="{ backgroundImage: `url(${resetImage(info.rank.next.code)})` }"> </view>
                <view class="current-map-mode">
                    排位模式
                </view>
                <view class="current-map-title">
                    <view>
                        <u--text size="22rpx" color="#fff" text="当前地图:"></u--text>
                    </view>
                    <view>
                        <u--text size="22rpx" color="#fff" :text="info.rank.current.code | resetTitle"></u--text>
                    </view>
                </view>

                <view class="current-map-date">
                    <view>
                        <u--text size="22rpx" color="#fff" :text="info.rank.current.starTime | resetTime"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" color="#fff" text="~"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" color="#fff" :text="info.rank.current.endTime | resetTime"></u--text>
                    </view>
                </view>

                <view class="next-map-titel">
                    <view>
                        <u--text size="22rpx" color="#fff" text="接下来:"></u--text>
                    </view>
                    <view>
                        <u--text size="22rpx" color="#fff" :text="info.rank.next.code | resetTitle"></u--text>
                    </view>
                </view>
                <view class="next-map-date">
                    <view>
                        <u--text size="22rpx" color="#fff" :text="info.rank.next.starTime | resetTime"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" color="#fff" text="~"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" color="#fff" :text="info.rank.next.endTime | resetTime"></u--text>
                    </view>
                </view>
            
            </view>
            <!-- 地图轮换-匹配 -->
            <view class="map-box">
                <view class="map-current"  :style="{ backgroundImage: `url(${resetImage(info.pubs.current.code)})` }"></view>
                <view class="map-next" :style="{ backgroundImage: `url(${resetImage(info.pubs.next.code)})` }"> </view>
                <view class="current-map-mode">
                    匹配模式
                </view>
                <view class="current-map-title">
                    <view>
                        <u--text size="22rpx" color="#fff" text="当前地图:"></u--text>
                    </view>
                    <view>
                        <u--text size="22rpx" color="#fff" :text="info.pubs.current.code | resetTitle"></u--text>
                    </view>
                </view>

                <view class="current-map-date">
                    <view>
                        <u--text size="22rpx" color="#fff" :text="info.pubs.current.starTime | resetTime"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" color="#fff" text="~"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" color="#fff" :text="info.pubs.current.endTime | resetTime"></u--text>
                    </view>
                </view>

                <view class="next-map-titel">
                    <view>
                        <u--text size="22rpx" color="#fff" text="接下来:"></u--text>
                    </view>
                    <view>
                        <u--text size="22rpx" color="#fff" :text="info.pubs.next.code | resetTitle"></u--text>
                    </view>
                </view>
                <view class="next-map-date">
                    <view>
                        <u--text size="22rpx" color="#fff" :text="info.pubs.next.starTime | resetTime"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" color="#fff" text="~"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" color="#fff" :text="info.pubs.next.endTime | resetTime"></u--text>
                    </view>
                </view>
            
            </view>
		</view>
        
	</view>
</template>

<script>
import api from "@/api/index"
import {mapState} from "vuex"
export default {
	components:{
	},
    filters:{
        resetTitle(e){
            switch (e) {
                case "Storm Point":
                    return "风暴点"
                case "Olympus":
                    return "奥林匹斯"
                case "Broken Moon":
                    return "残月"
                case "World's Edge":
                    return "世界尽头"
                default:
                    return "未知"
            }
        },
        resetTime(e){
            let time =(parseInt(e) * 1000) + (3600*1000*2)
            return  uni.$u.date(time, 'mm-dd hh:MM')
        },
    },
	data() {
		return {
			loading:false,

            predator:{
                predatorScore:0,
                totalMasters:0,
                rankEndTime: 1710108063,
            },
            timeData: {},
            info: {
                rank:{
                    current:{
                        coce: ""
                    },
                    next:{
                        coce: ""
                    },
                },
                pubs:{
                    current:{
                        coce: ""
                    },
                    next:{
                        coce: ""
                    },
                },
            }
		}
	},
	computed:{
		...mapState('app',["base",]),
	},
	onLoad(){
        this.getData()
	},
	onPullDownRefresh(){
        this.getData()
		uni.stopPullDownRefresh()
	},
	methods: {
        resetImage(e){
            switch (e) {
                case "Storm Point":
                    return "/static/image/map/Storm_Point.png"
                case "Olympus":
                    return "/static/image/map/Olympus.png"
                case "Broken Moon":
                    return "/static/image/map/Broken_Moon.png"
                case "World's Edge":
                    return "/static/image/map/Worlds_Edge.png"
                default:
                    return "未知"
            }
        },
        onChange(e) {
            this.timeData = e
        },
        async getData(){
            this.loading = true
            const res = await uni.$u.http.get(api.getSystemApex,{
                custom: {auth: false},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    title: res.message,
                    type: 'error',
                })
            }
            this.predator.predatorScore = res.data.info.predatorScore
            this.predator.totalMasters = res.data.info.totalMasters
            let timeData = new Date().getTime()
            this.predator.rankEndTime = parseInt(res.data.info.rankEndTime) * 1000 - timeData

            const mapRes = await uni.$u.http.get(api.getSystemApexMap,{
                custom: {auth: false},
            })
            if (mapRes.code != 1) {
                this.$refs.uToast.show({
                    title: mapRes.message,
                    type: 'error',
                })
            }
            this.info = mapRes.data.info
            this.loading = false

       },
        goPredatorList(){
            this.$Router.push({name:`predator`})
        }
	}
}
</script>

<style scoped lang="scss">

// #ifdef MP-WEIXIN
.slot-wrap {
    
	display: flex;
	align-items: center;
	flex: 1;
	padding: 0 30rpx;
	.search-wrap{
		margin-right: 20rpx;
		flex: 1;
	}
}
// #endif

// #ifdef H5
.slot-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	.search-wrap{
		padding: 20rpx;
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		flex: 1;
		.search-text{
			display: flex;
			justify-content: center;
			flex-direction: column;
			flex: 1;
			height: 100rpx;
			margin-left: 20rpx;
			.title{
				font-size: 32rpx;
				color: white;
				font-weight: 700;
				margin-bottom: 10rpx;
			}
			.desc{
				width: 300rpx;
				font-size: 24rpx;
				color: rgba(240,240,245,.6);
				overflow: hidden;
				word-break: break-all;  /* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;  /* 超出部分省略号 */
				display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 1; /** 显示的行数 **/
			}
		}
	}
	.down-app{
		margin-right: 20rpx;
	}
}
// #endif
.u-page{
	padding: 0 30rpx;
	.predator{

        width: 100%;
        background-color: #e5e9f2;
        box-shadow: 10rpx 10rpx 10rpx rgb(238, 238, 238);
        border-radius: 8rpx;
        margin-bottom: 20rpx;
       
        .predator-desc-icon{
            display: flex;
            justify-content: space-between;
             padding: 20rpx 20rpx;
            .predator-desc-title{
               .predator-title{
                    font-size: 56rpx;
                    font-weight: bold;
                    color: red;
               } 
               .predator-desc{
                    margin-top: 10rpx;
                    font-size: 28rpx;
                    color: rgb(236, 109, 109);
               }
            }
        }
        .predator-rp-more{
            padding: 0rpx 20rpx;
            padding-bottom: 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .predator-rp{
                display: flex;
                align-items: center;
                .predator-rp-text{
                font-weight: bold;
                font-size: 32rpx;
                }
                .predator-rp-rank{
                    color: red;
                    font-weight: bold;
                    font-size: 32rpx;
                }
            }
            .predator-more{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 24rpx;
            }
        }
    }
    .master-season{
        margin-top: 10rpx;
        .demo-layout {
            height: 160rpx;
            border-radius: 8rpx;
            box-shadow: 10rpx 10rpx 10rpx rgb(238, 238, 238);
        }
        .bg-purple-light {
            background: #CED7E1;
        }
        .bg-purple-dark {
            
            background: #99a9bf;
        }

        .master-desc-icon{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20rpx;
            .master-desc{
                font-size: 28rpx;

            }
        }
        .master-count{
            padding: 0 20rpx;
        }

        .season-desc-icon{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20rpx;
            .season-desc{
                font-size: 28rpx;
                color: white;
                font-weight: 700;
            }
        }
        .season-count{
            padding: 0 20rpx;
            font-size: 26rpx;
            line-height: 29px;
        }
    }
    .map-box{
        position: relative;
        height: 300rpx;
        border-radius: 8rpx;
        width: 100%;
        margin-bottom: 20rpx;
        .map-current{
            position: absolute;
            top: 0;
            width: 100%;
            height: 300rpx;
            border-radius: 8rpx;
            background-size: cover;
            background-repeat: no-repeat;
            -webkit-clip-path: polygon(0 0, 80% 0%, 50% 100%, 0% 100%);
            clip-path: polygon(0 0, 80% 0%, 50% 100%, 0% 100%);
        }
        .map-next{
            position: absolute;
            top: 0;
            width: 100%;
            height: 300rpx;
            border-radius: 8rpx;
            background-size: cover;
            background-repeat: no-repeat;
            // background-image: url('/img/home/h2-slider3-background-img.jpg');
            -webkit-clip-path: polygon(80% 0, 100% 0, 100% 100%, 50% 100%);
            clip-path: polygon(80% 0, 100% 0, 100% 100%, 50% 100%);
        }
        .mask{
            position: absolute;
            top: 0;
            width: 100%;
            height: 300rpx;
            border-radius: 4px;
            background-color: #00000069;
        }
        .current-map-mode{
            border-bottom: 4rpx white solid;
            color: white;
            font-size: 36rpx;
            font-weight: 700;
            position: absolute;
            padding-bottom: 20rpx;
            top: 40rpx;
            left: 20rpx;
            letter-spacing: 8rpx;
        }
        .current-map-title{
            position: absolute;
            bottom:  60rpx;
            left: 20rpx;
            letter-spacing: 8rpx;
            display: flex;
            align-items: center;
        }
        .current-map-date{
            position: absolute;
            bottom: 20rpx;
            left: 20rpx;
            color: white;
            display: flex;
            align-items: center;
        }
        .next-map-titel{
            position: absolute;
            bottom:  60rpx;
            right: 20rpx;
            letter-spacing: 4rpx;
            color: white;
            display: flex;
            align-items: center;
        }
        .next-map-date{
            position: absolute;
            bottom: 20rpx;
            right: 20rpx;
            color: white;
            display: flex;
            align-items: center;
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