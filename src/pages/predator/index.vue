<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
            bgColor="rgb(0, 0, 0,0)"
            class="navbar"
			:autoBack="true"
			:fixed="false"
			title="猎杀排行榜"
			:border="false">
		</u-navbar>
        <!-- 帖子信息 -->
        <u-loading-page  v-if="loading" loading></u-loading-page>
        <view  v-if="!loading" class="u-page">
            <view class="search">
                <u-search placeholder="请输入游戏名称" @change="onSearch"></u-search>
            </view>
            <view v-if="list.length > 0" class="list">
                <view v-for="(item,index) in predatorList" :key="index" class="item">
                    <view v-if="item.name != ''" class="number">
                        <view class="text-icon">
                            <u--text v-if="item.ranking == '1'" color="#fa3534" bold size="24rpx" text="#"></u--text>
                            <u--text v-if="item.ranking == '2'" color="#ff9900" bold size="24rpx" text="#"></u--text>
                            <u--text v-if="item.ranking == '3'" color="#3c9cff" bold size="24rpx" text="#"></u--text>
                            <u--text v-if="item.ranking != '3' && item.ranking != '2' && item.ranking != '1'" color="#909399" bold size="24rpx" text="#"></u--text>
                        </view>
                        <view class="text">
                            <u--text v-if="item.ranking == '1'" color="#fa3534" bold size="24rpx" :text="item.ranking"></u--text>
                            <u--text v-if="item.ranking == '2'" color="#ff9900" bold size="24rpx" :text="item.ranking"></u--text>
                            <u--text v-if="item.ranking == '3'" color="#3c9cff" bold size="24rpx" :text="item.ranking"></u--text>
                            <u--text v-if="item.ranking != '3' && item.ranking != '2' && item.ranking != '1'" color="#909399" bold size="24rpx" :text="item.ranking"></u--text>
                        </view>
                    </view>
                    <view v-if="item.name != ''" class="info">
                        <view class="icon">
                            <u--image width="80rpx" height="80rpx" src="/static/apexpredator1.png">
                            </u--image>
                        </view>
                        <view class="name-line">
                            <view class="name">
                                <u--text :lines="1" bold :text="item.name"></u--text>
                            </view>
                            <view class="line">
                                <view>
                                    <u-badge v-if="item.line == 'lobby'" :isDot="true" type="success"></u-badge>
                                    <u-badge v-if="item.line == 'Offline'" :isDot="true" type="error"></u-badge>
                                    <u-badge v-if="item.line == 'match'" :isDot="true" type="warning"></u-badge>
                                    <u-badge v-if="item.line == ''" :isDot="true" type="info"></u-badge>
                                </view>
                                <view class="line-text">
                                    <u--text v-if="item.line == 'lobby'" size="20rpx" text="在线"></u--text>
                                    <u--text v-if="item.line == 'Offline'" size="20rpx" text="离线"></u--text>
                                    <u--text v-if="item.line == 'match'" size="20rpx" text="游戏中"></u--text>
                                    <u--text v-if="item.line == ''" size="20rpx" text="未知"></u--text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view v-if="item.name != ''" class="score">
                        <view class="all-score">
                            <u--text bold size="34rpx" :text="`${item.rankScore} RP`"></u--text>
                        </view>
                        <view class="icon-score">
                            <view class="today-score">
                                <u-icon v-if="item.rankScoreStatus == 'up'" color="#19be6b" name="arrow-upward" size="24rpx"></u-icon>
                                <u-icon v-if="item.rankScoreStatus == 'down'" color="#fa3534" name="arrow-downward" size="24rpx"></u-icon>
                            </view>
                            <view class="today-score">
                                <u--text v-if="item.rankScoreStatus == 'up'" color="#19be6b" size="24rpx" :text="`${item.rankScoreValue} RP`"></u--text>
                                <u--text v-if="item.rankScoreStatus == 'down'" color="#fa3534" size="24rpx" :text="`${item.rankScoreValue} RP`"></u--text>
                            </view>
                        </view>
                    </view>
                    <view v-if="item.name == ''" class="nodata">
                        <u--text size="24rpx" bold align="center" text="排名更新，数据库正在更新无法查询"></u--text>
                    </view>
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
export default {
    components:{
	},
	data() {
		return {
            loading: false,
            queryParam :{
                page: 1,
                limit: 100,
            },
			total:0,
            list:[],
            predatorList:[],
            isShow:false,
		}
	},
    computed:{
        ...mapState('app',["base"]),
		...mapState("user",["accountInfo","token"])
	},
	onLoad() {
        this.getList()
	},
    onPullDownRefresh(){
        this.total = 0
        this.list = []
        this.status = "loadmore"
        this.queryParam.page = 1
        this.getList()
        uni.stopPullDownRefresh()
	},
	methods: {
        async getList(){
            this.loading = true
			this.status = "loading"
            const res = await uni.$u.http.get(api.getSystemPredator,{
                custom: {auth: true},
            }) 
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            res?.data?.list.splice(0,1)
            let start = (this.queryParam.page - 1) * this.queryParam.limit; // 当前页的起始索引
            let end = start + this.queryParam.limit; // 当前页的结束索引
            let dataToShow = res?.data?.list.slice(start, end); 
            this.predatorList = dataToShow
            this.isShow = res.data.list != null ? false : true
            this.list = res.data.list != null ? [...this.list,...res.data.list] : [...this.list]
            this.total = res.data.list.length
            this.status = "loadmore"
            this.loading = false
		},
        onReachBottom(){  //上拉触底函数
            if (!this.isShow) { 
                this.queryParam.page += 1
                let start = (this.queryParam.page - 1) * this.queryParam.limit; // 当前页的起始索引
                let end = start + this.queryParam.limit; // 当前页的结束索引
                let tmpList = this.list.slice(start, end);
                this.predatorList = [...this.predatorList,...tmpList]
                return
            }
            this.status = "nomore"
        },
        onSearch(e){
            if (e != '') {
                let tmpList =  this.list.filter((item)=>{
                    return item.name.includes(e)
                })
                this.predatorList = tmpList
            }else{
                let start = (this.queryParam.page - 1) * this.queryParam.limit; // 当前页的起始索引
                let end = start + this.queryParam.limit; // 当前页的结束索引
                let dataToShow = this.list.slice(start, end); 
                this.predatorList = dataToShow
            }
            
        }
	}
};
</script>

<style lang="scss" scoped>
.container{
    //  background-color: #eff1f3;
    .navbar{
        position: relative;
        z-index: 2;
    }


    .u-page{
        .search{
            padding: 40rpx 0;
        }
        // margin-top: 420rpx;
        padding: 0 30rpx;
        .list{
            .item{
                border-bottom: 1px solid #e5e9f265;
                margin-bottom: 20rpx;
                padding-bottom: 20rpx;
                display: flex;
                align-items: center;
                .number{
                    display: flex;
                    align-items: flex-end;
                    .text-icon{
                        margin-right: 10rpx;
                    }
                }
                .info{
                    flex: 1;
                    margin-left: 40rpx;
                    display: flex;
                    align-items: center;
                    .name-line{
                        margin-left: 40rpx;
                        .line{
                            display: flex;
                            align-items: center;
                            margin-top: 10rpx;
                            
                            .line-text{
                                margin-left: 10rpx;
                            }
                        }
                    }
                }
                .score{
                    .icon-score{
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        margin-top: 10rpx;
                        .today-score{
                            margin-left: 4rpx;
                        }
                    }
                }
                .nodata{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
            }
        }
    }
}
</style>
