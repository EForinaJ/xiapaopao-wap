<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
        <u-navbar
            safeAreaInsetTop
            placeholder
			:fixed="true"
            leftIcon=""
            leftText="搜索内容"
			:border="false">
		</u-navbar>
		<view class="u-page">
            <view class="search-input">
                <u-search 
                placeholder="请输入搜索内容" 
                v-model="keyword">
                </u-search>
            </view>


            <view class="tabs">
				<u-tabs 
					:list="listTab"
					 itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 34px;"
				>
		        </u-tabs>
            </view>



			<!-- <Post /> -->
			<!-- <Article /> -->
            <User />
		</view>
        
	</view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
import Post from "@/components/search/post"
import Article from "@/components/search/article"
import User from "@/components/search/user"
export default {
	components:{
		Post,
		Article,
        User
	},
	data() {
		return {
            keyword: "",
			listTab: [
				{
					name:  '推荐',
				},
				{
					name:  '百科',
				},
                {
					name:  '用户',
				},
			],
			tabCurrent: 0,

			queryParam: {
                page: 1,
                limit: 10,
				cateId: 18,
				name: ""
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
		// ...mapState('user',["userInfo","token"])
	},
	onLoad(){
		// this.loading = true
		// this.list = []
		// this.total = 0
		// this.queryParam.page = 1
		// this.tabCurrent = 0
		// this.getList()
		// this.loading = false
		
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
		changeName(e){
			this.isShow = false
			this.loading = true
			this.list = []
			this.total = 0
			this.queryParam.page = 1
			this.getList()
			this.loading = false
		},
		goInfo(e){
			if (this.tabCurrent == 0) {
				this.$Router.push({name:`projectInfo`,params: { id: e.id }})
			}
			if (this.tabCurrent == 1 && this.userInfo.isWorker) {
				this.$Router.push({name:`workInfo`,params: { id: e.id }})
			}
		},
		changeTab({index}) {
			this.tabCurrent = index;
			this.isShow = false
			this.loading = true
			this.list = []
			this.total = 0
			this.queryParam.page = 1
			if (index == 0) {
				this.getProjectList()
			}
			if (index == 1 && this.userInfo.isWorker) {
				this.getWorkList()
			}
			this.loading = false
			
		},
		async getList(){
			try {
				this.status = "loading"
                // this.queryParam.userId = this.id
                const res = await uni.$u.http.get(api.getPlayerList,{
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
    .search-input{
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }
}

</style>


