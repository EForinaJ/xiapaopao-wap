<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
		<u-navbar
			:autoBack="true"
			:fixed="true"
			title="我收藏的"
			:border="false">
		</u-navbar>
        <!-- <view class="tabs">
            <u-tabs 
                @change="changeTab"
                :list="listTab"
                itemStyle="padding-left: 30rpx; padding-right: 30rpx; height:60rpx"
            >
            </u-tabs>
        </view> -->
        <!-- 帖子信息 -->
        <view class="u-page">
            <view v-if="list.length > 0" class="list">
                <PostItem :list="list" v-if="tabCurrent == 0" />

                <!-- <WikiItem :list="list" v-if="tabCurrent == 1"/> -->
                <view class="more">
                    <u-loadmore :status="status" :load-text="loadText"/>
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
import PostItem from "@/components/content/post"
import WikiItem from "@/components/content/wiki"

export default {
    components:{
		PostItem,
        WikiItem
	},
	data() {
		return {
			loading:false,

            listTab: [
				{
					name:  '帖子',
				},
				{
					name:  '百科',
				},
			],
			tabCurrent: 0,

			queryParam: {
                page: 1,
                limit: 5,
                author:0,
                mode: 2,
            },
			total:0,
            list:[],
            isShow:false,
            loadText: {
                loadmore: '轻轻上拉',
                loading: '努力加载中',
                nomore: '实在没有了'
            },
            status: 'loadmore',

            share:{
                sheet:false,
            },
		}
	},
    computed:{
        ...mapState('app',["base"]),
		...mapState("user",["accountInfo","token"])
	},
	onLoad() {
        this.loading = true
        this.getPostList()
        this.loading = false
	},
    onPullDownRefresh(){
        this.loading = true
        this.total = 0
        this.list = []
        this.status = "loadmore"
        this.queryParam.page = 1
		this.getData()
        if (this.tabCurrent == 0) {
            this.getPostList()
        }
        if (this.tabCurrent == 1) {
            this.getWikiList()
        }
        this.loading = false
        uni.stopPullDownRefresh()
	},
	methods: {
        async getPostList(){
			this.status = "loading"
            // this.queryParam.author = this.id
            const res = await uni.$u.http.get(api.getAccountFavoritePostList,{
                params: this.queryParam,
                custom: {auth: true},
            }) 
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            this.isShow = res.data.list != null ? false : true
            res.data.list =res.data.list != null ? res.data.list :[]
            
            this.list = [...this.list,...res.data.list]
            this.total = res.data.total
            this.status = "loadmore"
		},
        async getWikiList(){
			this.status = "loading"
            this.queryParam.author = this.id
            const res = await uni.$u.http.get(api.getAccountFavoriteWikiList,{
                params: this.queryParam,
                custom: {auth: true},
            }) 
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            
            this.isShow = res.data.list.length > 0 ? false : true
            this.list = [...this.list,...res.data.list]
            this.total = res.data.total
            this.status = "loadmore"
		},
        onReachBottom(){  //上拉触底函数
            if (!this.isShow) {
                this.queryParam.page += 1

                if (this.tabCurrent == 0) {
                    this.getPostList()
                }
                if (this.tabCurrent == 1) {
                    this.getWikiList()
                }
                return
            }
            this.status = "nomore"
        },
        changeTab({index}){
            this.loading = true
            this.total = 0
            this.list = []
            this.status = "loadmore"
            this.queryParam.page = 1
            if (index == 0) {
                this.getPostList()
            }
            if (index == 1) {
                this.getWikiList()
            }
            this.tabCurrent = index
            this.loading = false
        },
	}
};
</script>

<style lang="scss" scoped>
.container{
    // background-color: #eff1f3;
    // .navbar{
    //     position: relative;
    //     z-index: 2;
    // }
    .tabs{
       
        margin-bottom: 20rpx;
    }
    .u-page{
         margin-top: 100rpx;
        padding: 0 30rpx;
        .list{
            margin-top: 20rpx;
            .more{
                padding: 20rpx 0;
            }
        }
    }
}
</style>
