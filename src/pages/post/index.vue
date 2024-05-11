<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
        <u-navbar
            :autoBack="true"
            safeAreaInsetTop
            placeholder
			:fixed="true"
            leftIcon="arrow-left"
            :leftText="info != null ? info.title : ''"
			:border="false">
		</u-navbar>
		<view v-if="loading" class="loading-skeleton">
            <u-skeleton
                rows="20"
                title
                :loading="loading"
                
            >	
            </u-skeleton>
        </view>
        <view class="u-page" v-if="!loading">
            <view class="author" v-if="info.userInfo">
                <view @click="goUser(info.userInfo.id)" v-if="info.userInfo.avatar" class="avatar">
                    <u--image height="80rpx" width="80rpx" :src="info.userInfo.avatar | resetImage(39,36)" shape="circle"></u--image>
                </view>
                <view class="nickname-grade-desc-btn">
                    <view class="nickname-desc-grade">
                        <view class="nickname-grade">
                            <view @click="goUser(info.userInfo.id)" class="nickname">
                                <u--text size="24rpx" :lines="1" bold :text="info.userInfo.nickName"></u--text>
                            </view>
                            <view v-if="info.userInfo.grade" class="grade">
                                <u--image 
                                width="80rpx"
                                height="30rpx"
                                :src="info.userInfo.grade.icon">
                                </u--image>
                            </view>
                        </view>
                        <view class="desc">
                            <u--text type="info" size="22rpx" :lines="1" :text="info.createTime | resetDate"></u--text>
                        </view>
                    </view>
                    <view class="follow">
                        <view @click="goCategory(info.category.id)" v-if="info.category" class="btn">
                            {{info.category.title}}
                        </view>
                    </view>
                </view>
            </view>

            <view class="title">
                <u--text size="36rpx" bold :lines="2" :text="info.title"></u--text>
            </view>



            <view class="description">
                <u-parse :tagStyle="style" :content="info.content"></u-parse>
            </view>

            <view v-if="info.images" class="image">
                <ImageAdaptation :list="info.images"/>
            </view>

            <!-- 隐藏内容 -->
            <view v-if="info.setResource == 2" class="resource">
                <view class="title">
                    <u--text bold size="28rpx" :lines="1" :text="info.resource.title"></u--text>
                </view>
                <view @click="openRescourceLink(info.resource.example)" class="example">
                    <u--text color="rgb(41, 121, 255)"  size="24rpx" :lines="1"
                     text="查看演示"></u--text>
                </view>
                <view class="attr">
                    <view v-for="(item,index) in info.resource.attr" :key="index" class="item">
                        <view class="key">
                            <u--text size="24rpx" align="right" :text="`${item.key}：`"></u--text>
                        </view>
                        <view class="value">
                            <u--text size="24rpx" type="info" :text="`${item.value}`"></u--text>
                        </view>
                    </view>
                </view>
                <view :class="info.resource.isView ? 'success auth' :'errro auth'">
                    <view class="type">
                        <view class="type-text">
                            <u--text size="24rpx" text="所需要权限为:"></u--text>
                        </view>
                        <view class="grade">
                            {{info.resource.mode | resetMode}}
                        </view>
                    </view>
                    <view class="desc">
                        <view v-if="info.resource.grade && info.resource.mode == 1"  class="desc-text">
                            <view>
                                <u--text size="24rpx" type="info" text="请在注册登录之后，方可阅读隐藏内容"></u--text>
                            </view>
                        </view>
                        <view v-if="info.resource.grade && info.resource.mode == 2"  class="desc-text">
                            <view>
                                <u--text size="24rpx" type="info" text="请在下面参与讨论之后，方可阅读隐藏内容"></u--text>
                            </view>
                        </view>
                        <view v-if="info.resource.grade && info.resource.mode == 3"  class="desc-text">
                            <view>
                                <u--text size="24rpx" type="info" text="你的等级还未达到"></u--text>
                            </view>
                            <view class="grade-icon">
                                <u--image 
                                width="80rpx"
                                height="30rpx"
                                :src="info.resource.grade.icon">
                                </u--image>
                            </view>
                        </view>
                        <view v-if="info.resource.grade && info.resource.mode == 4"  class="desc-text">
                            <view>
                                <u--text size="24rpx" type="info" :text="` 使用${info.resource.integral}积分，方可阅读隐藏内容`"></u--text>
                            </view>
                        </view>
                        <view v-if="info.resource.grade && info.resource.mode == 5"  class="desc-text">
                            <view>
                                <u--text size="24rpx" type="info" :text="` 支付${info.resource.money}购买，方可阅读隐藏内容`"></u--text>
                            </view>
                        </view>
                    </view>
                    <view class="code">
                        <u--text size="24rpx" type="info" :text="info.resource.gainCode != '' ? info.resource.gainCode : '提取码:******'"></u--text>
                    </view>
                    <view class="code">
                        <u--text size="24rpx" type="info" :text="info.resource.untieCode != '' ? info.resource.untieCode : '提取码:******'"></u--text>
                    </view>
                    <view @click="viewLink" class="btn">
                        点击查看
                    </view>
                </view>
            </view>

            <view class="reward">
                <view class="text-btn">
                    <view class="text">
                        <u--text text="点点赞赏，手留余香"></u--text>
                    </view>
                    <view @click="openRewardSheet" class="btn">
                        <u-button icon="pushpin-fill" type="error" size="small" text="给他赞赏"></u-button>
                    </view>
                </view>
                <view class="count">
                    <u--text size="24rpx" type="info" :text="`${reward.total}人已打赏`"></u--text>
                </view>
                <view class="list">
                    <view v-for="(item,index) in reward.list" :key="index" class="avatar">
                        <u--image @click="goUser(item.userInfo.id)" width="60rpx" height="60rpx" 
                        :src="item.userInfo.avatar" shape="circle"></u--image>
                    </view>
                </view>
            </view> 

            <view class="meta-tag">
                <view  class="tags">
                    <view v-for="(item,index) in info.tagList" :key="index" class="tag">
                        # {{item.title}}
                    </view>
                </view>
                <view class="meta">
                    <view class="icon-num">
                        <u-icon size="36rpx" name="eye"></u-icon>
                        <view class="num">{{ info.views | resetNum}}</view>
                    </view>
                </view>
            </view>

            <view>
			    <u--image :showLoading="true" 
                src="/static/image/load/downapp.png" 
                width="100%"
                height="80px" ></u--image>
            </view>

            <view class="comment-count">
                <view class="count">
                    <u--text bold :text="`${info.comments}条回复`"></u--text>
                </view>
                <view class="line"></view>
            </view>

            <view class="comment-list">
                <view v-if="list.length > 0" class="list">
                    <CommentItem 
                    v-for="(item,index) in list" :key="index" 
                    :info="item"
                    :index="index"
                    @reply="reply"
                    @commentLike="commentLike"
                    @commentDelete="commentDelete"
                    @commentReport="commentReport"
                    />
                    <view class="more">
                        <u-loadmore :status="status" />
                    </view>
                </view>
                <view  v-if="list.length == 0" class="empty">
                    <u-empty
                        mode="comment"
                        icon="/static/image/load/list.png"
                    />
                </view>
            </view>

            <u-gap height="100rpx" bgColor="#fff"></u-gap>

        </view>
        

        <!-- 打赏 -->
		<u-popup 
		bgColor="#f9f9f9" 
		round="8rpx" 
        mode="bottom"
		:show="reward.sheet" 
		@close="closeRewardSheet">
            <u-toast ref="rewardToast"></u-toast>
			<view class="reward-box">
                <view class="title-text">
                    <view>
                        <u--text size="24rpx" type="info" text="予人玫瑰，手有余香"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" type="info" :text="`余额：${accountInfo.balance}`"></u--text>
                    </view>
                </view>
                <view class="sugar">
                    <view :class="reward.priceActiveKey == index ? 'active item' : 'item'" @click="selectRewardKey(index)" v-for="(item,index) in reward.priceList" :key="index">
                        <view class="icon">
                            <u-icon :color="reward.priceActiveKey == index ? '#f16b6f' : ''" size="50rpx" name="gift-fill"></u-icon>
                        </view>
                        <view class="text">
                            <u--text :color="reward.priceActiveKey == index ? '#f16b6f' : ''" size="30rpx" bold :text="item"></u--text>
                        </view>
                    </view>
                    <view :class="reward.priceActiveKey == 3 ? 'active item' : 'item'" @click="selectRewardKey(3)">
                        <view class="icon">
                            <u-icon :color="reward.priceActiveKey == 3 ? '#f16b6f' : ''" size="50rpx" name="gift-fill"></u-icon>
                        </view>
                        <view class="text">
                            <u--text :color="reward.priceActiveKey == 3 ? '#f16b6f' : ''" size="30rpx" bold text="自定义"></u--text>
                        </view>
                    </view>
                </view>
                <view v-if="reward.priceActiveKey == 3" class="input-money">
                    <u--input
                        placeholder="请输入打赏金额"
                        border="surround"
                        v-model="reward.form.money"
                    ></u--input>
                </view>

                <view class="pay-mode">
                    <view class="list">
                        <view v-for="(item,index) in payMode" :key="index" class="item">
                            <u-button size="small"  @click="selectRewardPayKey(item)" v-if="item==1" :type="reward.form.payMethod == 1 ? 'error' : 'primary'" :plain="true" :hairline="true" text="支付宝"></u-button>
                            <u-button size="small"  @click="selectRewardPayKey(item)" v-if="item==2" :type="reward.form.payMethod == 2 ? 'error' : 'primary'" :plain="true" :hairline="true" text="微信"></u-button>
                            <u-button size="small"  @click="selectRewardPayKey(item)" v-if="item==3" :type="reward.form.payMethod == 3 ? 'error' : 'primary'" :plain="true" :hairline="true" text="余额"></u-button>
                        </view>
                    </view>
                </view>

                <view class="pay-action">
                    <u-button v-if="reward.isGoPay == 1" @click="goRewardPay" type="primary" text="支付"></u-button>
                    <u-button v-if="reward.isGoPay == 2" type="primary" text="创建订单"></u-button>
                    <u-button v-if="reward.isGoPay == 3" type="primary" text="正在支付"></u-button>
                </view>
            </view>
		</u-popup>

        <!-- 支付 -->
		<u-popup 
		bgColor="#f9f9f9" 
		round="8rpx" 
        mode="bottom"
		:show="pay.sheet" 
		@close="closePaySheet">
            <u-toast ref="payToast"></u-toast>
			<view class="pay-box">
                <view class="title-text">
                    <view>
                        <u--text size="24rpx" type="info" text="予人玫瑰，手有余香"></u--text>
                    </view>
                    <view>
                        <u--text size="24rpx" type="info" :text="`余额：${accountInfo.balance}`"></u--text>
                    </view>
                </view>

                <view class="money">
                    <view>
                        <u--text size="60rpx" mode="price" :text="pay.form.orderMoney"></u--text>
                    </view>
                </view>

                <view class="pay-mode">
                    <view class="list">
                        <view v-for="(item,index) in payMode" :key="index" class="item">
                            <u-button size="small"  @click="selectPayMethodKey(item)" v-if="item==1" :type="pay.form.payMethod == 1 ? 'error' : 'primary'" :plain="true" :hairline="true" text="支付宝"></u-button>
                            <u-button size="small"  @click="selectPayMethodKey(item)" v-if="item==2" :type="pay.form.payMethod == 2 ? 'error' : 'primary'" :plain="true" :hairline="true" text="微信"></u-button>
                            <u-button size="small"  @click="selectPayMethodKey(item)" v-if="item==3" :type="pay.form.payMethod == 3 ? 'error' : 'primary'" :plain="true" :hairline="true" text="余额"></u-button>
                        </view>
                    </view>
                </view>

                <view class="pay-action">
                    <u-button v-if="reward.isGoPay == 1" @click="goPay" type="primary" text="支付"></u-button>
                    <u-button v-if="reward.isGoPay == 2" type="primary" text="创建订单"></u-button>
                    <u-button v-if="reward.isGoPay == 3" type="primary" text="正在支付"></u-button>
                </view>
            </view>
		</u-popup>


        <!-- 评论 -->
		<u-popup
			bgColor="#f9f9f9" 
			:round="8" 
			:show="comment.sheet" 
			@close="closeCommentSheet"
			>
            <u-toast ref="commentToast"></u-toast>
			<view class="comment">
				<view class="content-createbtn">
					<view class="content">
						<u--textarea 
						:customStyle="{
                            backgroundColor: '#f4f5f7'
                        }"
                        border="none"
						autoHeight 
						v-model="comment.form.content" 
						:placeholder="comment.placeholder" />
					</view>
					<view class="createbtn">
                        <!--  -->
						<u-button 
						@click="postComment"
						:plain="true" 
						:hairline="true" 
						text="发布" />
					</view>
				</view>
			</view>
		</u-popup> 


        <!-- 举报 -->
        <u-popup
			bgColor="#f9f9f9" 
			:round="8" 
			:show="report.sheet" 
			@close="closeReportSheet"
			>
            <u-toast ref="reportToast"></u-toast>
			<view class="report">
                <view class="report-type">
                    <u-radio-group 
                        placement="row"    
                        v-model="report.form.type"
                        >
                        <view v-for="(item,index) in report.list" :key="index"  class="item">
                            <u-radio
                            :name="item.name"
                            :label="item.label"></u-radio>
                        </view>
                       
                    </u-radio-group>
                </view>
				<view class="content-createbtn">
					<view class="content">
						<u--textarea 
						:customStyle="{
                            backgroundColor: '#f4f5f7'
                        }"
                        border="none"
						autoHeight 
						v-model="report.form.description" 
						placeholder="描述你要举报的内容" />
					</view>
					<view class="createbtn">
                        <!--  -->
						<u-button 
						@click="postReport"
						:plain="true" 
						:hairline="true" 
						text="提交" />
					</view>
				</view>
			</view>
		</u-popup> 


        <!-- 分享 -->
		<u-popup 
		bgColor="#f9f9f9" 
		:round="8" 
		:show="share.sheet" 
		@close="closeShareSheet">
            <u-toast ref="shareToast"></u-toast>
			<view class="share-action">
				<view class="share-list">
					<view class="item" @click="sharewechat">
						<u-avatar bg-color="#5ac725" icon="weixin-fill" size="46" font-size="30"></u-avatar>
						<view class="text">
							微信
						</view>
					</view>
					<view class="item" @click="shareqq">
						<u-avatar bg-color="#3c9cff" icon="qq-fill" size="46" font-size="30"></u-avatar>
						<view class="text">
							QQ
						</view>
					</view>
					<!-- #ifdef H5 -->
					<view class="item" v-clipboard:copy="`${base.url}/post/${info.id}`" 
						v-clipboard:success="copyLink" >
						<u-avatar  icon="attach" size="46" font-size="30"></u-avatar>
						<view class="text">
							复制链接
						</view>
					</view>
					<!-- #endif  -->
					<!-- #ifndef  -->
					<view class="item" @click="copyLink">
						<u-avatar  icon="attach" size="46" font-size="30"></u-avatar>
						<view class="text">
							复制链接
						</view>
					</view>
					<!-- #endif  -->
					<view class="item" @click="shareReport">
						<u-avatar icon="warning" size="46" font-size="30"></u-avatar>
						<view class="text">
							举报
						</view>
					</view>
				</view>
				<view @click="closeShareSheet" class="close-btn">
					取消分享
				</view>
			</view>
		</u-popup>


        <view class="bottom-bar">
            <view @click="openCommentSheet" class="comment-input-box">
                <u--text size="24rpx" type="info" text="说说你的看法....."></u--text>
            </view>
            <view class="button">
				<view @click="like" class="icons">
					<u-icon :size="24" :name="info.isLike?'heart-fill':'heart'"></u-icon>
					<view class="count">
						{{info.likes | resetNum}}
					</view>
				</view>
				<view @click="favorite" class="icons">
					<u-icon :size="24" :name="info.isFavorite?'star-fill':'star'"></u-icon>
				</view>
				<view @click="openShareSheet" class="icons">
					<u-icon :size="24" name="share"></u-icon>
				</view>
			</view>
        </view>
	</view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
import CommentItem from "@/components/comment/item"
import{handertree} from "@/utils/tree"
import ImageAdaptation from "@/components/adaptation/image"
export default {
	components:{
        CommentItem,
        ImageAdaptation
	},
    filters:{
        resetMode(e){
            switch (e) {
                case 1:
                    return "登录后查阅";
                case 2:
                    return "评论后查阅";
                case 3:
                    return "按等级查阅";
                case 4:
                    return "积分查阅";
                case 5:
                    return "付费查阅";
                default:
                    break;
            }
        },
    },
	data() {
		return {
            style: {
					// 字符串的形式
                p: 'line-height: 50rpx;color: #5e6d82;font-size:32rpx;margin-bottom: 40rpx;',
                span: 'font-size: 30rpx',
                h1: 'color: #34495e;margin-bottom: 40rpx;',
                h2: 'color: #34495e;margin-bottom: 40rpx;',
                h3: 'color: #34495e;margin-bottom: 40rpx;',
            },
            id:0,
			loading:false,
            info:{
				title:"",
				userInfo:{
					avatar:"",
					nickName:"",
					grade:{
						title:"",
					},
					vip:{
						title:"",
					},
					isFollow:false
				},
				category:{
					title:""
				},
				tagList:[],
				comments:0,
				likes:0,
				favorites:0,
				views:0,
				createTime:"",
			},
            payMode: [],
            reward:{
                total:0,
                list:[],
                isGoPay:1,
                sheet:false,
                priceActiveKey:0,
                priceList:[2,5,10],
                payActiveKey:null,
                form:{
                    money: null,
                    payMethod: null,
                }
            },
            pay:{
                isGoPay:1,
                sheet:false,
                form:{
                    detailId:0,
                    detailModule: "",
                    orderMoney: null,
                    orderType: 3,
                    payMethod: null,
                }
            },
            comment:{
                sheet:false,
                placeholder: "说说你的看法。。。",
                form:{
                    content:null,
                    topId: 0,
                    replyId: 0,
                }
            },
            report:{
                sheet:false,
                list:[
                    {
                        name: 1,
                        label: '广告垃圾'
                    },
                    {
                        name: 2,
                        label: '违规内容'
                    },
                    {
                        name: 3,
                        label: '恶意灌水'
                    },
                   
                ],
                form:{
                    description:null,
                    relatedId:0,
                    module:"",
                    type:1,
                }
            },
            share:{
                sheet:false,
            },



            // 评论数据
			queryParam: {
                page: 1,
                limit: 10,
                relatedId:0,
                module: "post"
            },
			total:0,
            list:[],
            tmpList:[],
			isShow:false,
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
    
		if (this.$Route.query.id == undefined || this.$Route.query.id == null || this.$Route.query.id == "" || this.$Route.query.id == 0 || isNaN(this.$Route.query.id)) {
			this.$Router.push({path:'/404'})
		}
		this.id = parseInt(this.$Route.query.id)
		this.loading = true
        this.getData()
        this.getRewardList()
		this.getList()
        this.loading = false
		
	},
	onPullDownRefresh(){
		this.isShow = false
		this.loading = true
		this.list = []
		this.total = 0
		this.queryParam.page = 1
		this.getList()
		this.loading = false
		uni.stopPullDownRefresh()
	},
	methods: {
        async getData(){
            const res = await uni.$u.http.get(api.getPostInfo,{
				params:{id: this.id},
				custom: {auth: false},
			})
			if (res.code != 1) {
				this.$refs.uToast.show({
					message: res.message,
					type: 'error',
				})
                this.$Router.push({path:'/404'})
				return
			}
			this.info = res.data.info
        },
        viewLink(){
            if (this.token == null) {
                 this.$Router.push({path:'/login'})
                return
            }
            if (this.info.resource.isView) {
                window.open(this.info.resource.link,"_blank")
                return
            }
            if (this.info.resource.mode ==  2) {
                document.querySelector('#comment').scrollIntoView({
                    behavior: "smooth"
                });
                return
            }
            if (this.info.resource.mode == 3 && this.accountInfo.grade.id != this.info.resource.grade.id) {
                this.$refs.uToast.show({
					message: "等级还不足努力升级吧少年",
					type: 'error',
				})
                return
            }
            if (this.info.resource.mode ==  4) {
                this.$confirm({
                    title: '使用积分',
                    content: '请注意，使用积分兑换资源内容',
                    okText:"确定",
                    cancelText:"取消",
                    onOk:async () => {
                        const query = {
                            id:this.id
                        }
                        const res = await this.$axios.post(api.postPostExchange,query) 
                         if (res.code != 1) {
                            this.$refs.uToast.show({
                                message: res.message,
                                type: 'error',
                            })
                            return
                        }
                        this.info = res?.data?.info
                    },
                    onCancel() {

                    },
                });
                return
            }
            if (this.info.resource.mode ==  5) {
                this.openPaySheet()
                return
            }

        },
        openRescourceLink(e){
            window.open(e,"_blank")
        },
        async like(){
            try {
                if (this.token == null || this.token == "") {
                    // 跳转路由，如果跳转不了尝试条件编译
                    this.$Router.push({path:"/login"})
                    return
                }
                this.info.isLike = !this.info.isLike
                if (this.info.isLike) {
                    this.info.likes =  this.info.likes + 1
                } else {
                    this.info.likes =  this.info.likes - 1
                }
                const query = {
                    id:this.info.id
                }
                const res = await uni.$u.http.post(api.postPostLike,query,{
                    custom: {auth: true},
                })
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    if (this.info.id == this.id) {
                    this.info.isLike = !this.info.isLike
                        if (this.info.isLike) {
                            this.info.likes =  this.info.likes + 1
                        } else {
                            this.info.likes =  this.info.likes - 1
                        }
                    }
                    return
                }
            } catch (error) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                if (this.info.id == this.id) {
                this.info.isLike = !this.info.isLike
                    if (this.info.isLike) {
                        this.info.likes =  this.info.likes + 1
                    } else {
                        this.info.likes =  this.info.likes - 1
                    }
                }
            }
        },
        async favorite(){
            try {
                if (this.token == null || this.token == "") {
                    // 跳转路由，如果跳转不了尝试条件编译
                    this.$Router.push({path:"/login"})
                    return
                }
                this.info.isFavorite = !this.info.isFavorite
                if (this.info.isFavorite) {
                    this.info.favorites =  this.info.favorites + 1
                } else {
                    this.info.favorites =  this.info.favorites - 1
                }
                const query = {
                    id:this.info.id
                }
                const res = await uni.$u.http.post(api.postPostFavorite,query,{
                    custom: {auth: true},
                })
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    if (this.info.id == this.id) {
                    this.info.isFavorite = !this.info.isFavorite
                        if (this.info.isFavorite) {
                            this.info.favorites =  this.info.favorites + 1
                        } else {
                            this.info.favorites =  this.info.favorites - 1
                        }
                    }
                    return
                }
            } catch (error) {
                this.$refs.uToast.show({
                    title: error.message,
                    type: 'error',
                })
                if (this.info.id == this.id) {
                this.info.isFavorite = !this.info.isFavorite
                    if (this.info.isFavorite) {
                        this.info.favorites =  this.info.favorites + 1
                    } else {
                        this.info.favorites =  this.info.favorites - 1
                    }
                }
            }
        },
        async getPay(){
            const res = await uni.$u.http.get(api.getSystemPay,{
			
				custom: {auth: true},
			})     
            if (res.code != 1) {
                this.$refs.uToast.show({
					message: res.message,
					type: 'error',
				})
                return
            }
            this.payMode = res.data.info.payMode
        },
        //  打赏面板
        openRewardSheet(){
            if (this.token == null || this.token == "") {
                // 跳转路由，如果跳转不了尝试条件编译
                this.$Router.push({path:"/login"})
                return
            }
            this.getPay()
            this.reward.sheet = !this.reward.sheet
            this.reward.form.money = this.reward.priceList[0]
            this.reward.priceActiveKey = 0
            this.reward.form.payMethod = this.payMode[0]
        },
        closeRewardSheet(){
            this.reward.sheet = !this.reward.sheet
        },
        selectRewardKey(e){
            this.reward.priceActiveKey = e
            if (e != 3) {
                this.reward.form.money = this.reward.priceList[e]
            }
            if (e == 3) {
                this.reward.form.money = null
            }
        },
        selectRewardPayKey(e){
            this.reward.form.payMethod = e
        },
        async goRewardPay(){
            if (this.reward.isGoPay == 2 || this.reward.isGoPay == 3) {
                return false
            }

            if (this.reward.form.money == 0 || this.reward.form.money == null) {
                this.$refs.rewardToast.show({
					message: "请选择或输入支付金额",
					type: 'error',
				})
                return
            }

            if (this.reward.form.payMethod == null) {
                this.$refs.rewardToast.show({
					message: "请选择支付方式",
					type: 'error',
				})
                return
            }
            if (this.reward.form.payMethod == 3) {
                if ((this.accountInfo.balance * 100) < (this.reward.form.money * 100)) {
                    
                    this.$refs.rewardToast.show({
                        message: "余额不足",
                        type: 'error',
                    })
                    return
                }
            }
            
            
            this.reward.isGoPay = 2
            let formData = {
                payMethod:this.reward.form.payMethod,
                orderMoney:this.reward.form.money,
                detailModule:   "post",
                detailId:this.id,
            }
            formData.orderType = 2
 
          
            const res = await uni.$u.http.post(api.postOrderCreate,formData,{
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.rewardthrottl(5000)
                this.$refs.rewardToast.show({
                    message: res.message,
                    type: 'error',
                })
                this.rewardthrottl(5000)
                // this.ascertain()
                return
            }
            if (res.data.orderNum != null || res.data.orderNum != "") {
                this.reward.isGoPay = 3
                const qrRes = await uni.$u.http.post(api.postOrderPay,{orderNum:res.data.orderNum},{
                    custom: {auth: true},
                })
                if (qrRes.code != 1) {
                    this.rewardthrottl(5000)
                    this.$refs.rewardToast.show({
                        message: qrRes.message,
                        type: 'error',
                    })
                    this.closeRewardSheet()
                    return
                }
                if(qrRes.data.info.isPay && qrRes.data.info.payMethod == 3){
                    this.rewardthrottl(5000)
                    this.$refs.uToast.show({
                        message: '成功打赏',
                        type: 'success',
                    })
                    this.closeRewardSheet()
                    return
                }

                // if (this.payActiveKey != 3) {
                //     this.$QrCode(this.title,formData.orderMoney,this.payActiveKey,qrRes.data.info.orderNum,qrRes.data.info.orderNum).then((res)=>{
                //         if (res != false) {
                //             // this.throttl(5000)
                //             this.ascertain()
                //         }
                //     }).catch((err)=>{
                //         this.cancel()
                //     })
                // }
            }else{
                this.closeRewardSheet()
            }
        },
        async getRewardList(){
            const query = {
                page: 1,
                limit: 20,
                module: "post",
                relatedId: this.id,
            }

            const res = await uni.$u.http.get(api.getRewardList,{
				params:query,
				custom: {auth: true},
			})
			if (res.code != 1) {
				this.$refs.uToast.show({
					message: res.message,
					type: 'error',
				})
				return
			}
            this.reward.total = res?.data?.total ?? 0
            this.reward.list = res?.data?.list ?? []
        },
        rewardthrottl(dey){ 
           
            let timeout;
            clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
            timeout = setTimeout(()=>{
                this.reward.isGoPay = 1
            }, dey);  // 指定 xx ms 后触发真正想进行的操作 handler
        },


        //  支付面板
        openPaySheet(){
            this.pay.sheet = !this.pay.sheet
            this.pay.form.detailId = this.id
            this.pay.form.detailModule = "post"
            this.pay.form.orderMoney = this.info.resource.money
            this.pay.form.orderType = 3
            this.pay.form.payMethod = this.payMode[0]
        },
        closePaySheet(){
            this.pay.sheet = !this.pay.sheet
        },
        selectPayMethodKey(e){
            this.pay.form.payMethod = e
        },
        async goPay(){
            if (this.pay.isGoPay == 2 || this.pay.isGoPay == 3) {
                return false
            }
            
            if (this.pay.form.orderMoney == 0 || this.pay.form.orderMoney == null) {
                this.$refs.payToast.show({
                    message: "请选择或输入支付金额",
                    type: 'error',
                })
                return
            }

            if (this.pay.form.payMethod == 0) {
                this.$refs.payToast.show({
                    message: "请选择支付方式",
                    type: 'error',
                })
                return
            }
            if (this.pay.form.payMethod == 3) {
                if ((this.accountInfo.balance * 100) < (this.pay.form.orderMoney * 100)) {
                    this.$refs.payToast.show({
                        message: "余额不足",
                        type: 'error',
                    })
                    return
                }
            }

           

            this.pay.isGoPay = 2
            const res = await uni.$u.http.post(api.postOrderCreate,this.pay.form,{
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.payThrottl(5000)
                this.$refs.payToast.show({
                    message: res.message,
                    type: 'error',
                })
                this.payThrottl(5000)
                // this.ascertain()
                return
            }
            if (res.data.orderNum != null || res.data.orderNum != "") {
                this.reward.isGoPay = 3
                const qrRes = await uni.$u.http.post(api.postOrderPay,{orderNum:res.data.orderNum},{
                    custom: {auth: true},
                })
                if (qrRes.code != 1) {
                    this.payThrottl(5000)
                    this.$refs.payToast.show({
                        message: qrRes.message,
                        type: 'error',
                    })
                    this.closePaySheet()
                    return
                }
                if(qrRes.data.info.isPay && qrRes.data.info.payMethod == 3){
                    this.payThrottl(5000)
                    this.$refs.uToast.show({
                        message: '支付成功',
                        type: 'success',
                    })
                    this.info = qrRes.data.info.result
                    this.closePaySheet()
                    return
                }

                // if (this.payActiveKey != 3) {
                //     this.$QrCode(this.title,formData.orderMoney,this.payActiveKey,qrRes.data.info.orderNum,qrRes.data.info.orderNum).then((res)=>{
                //         if (res != false) {
                //             // this.throttl(5000)
                //             this.ascertain()
                //         }
                //     }).catch((err)=>{
                //         this.cancel()
                //     })
                // }
            }else{
                this.closePaySheet()
            }
        },
        payThrottl(dey){ 
            let timeout;
            clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
            timeout = setTimeout(()=>{
                this.pay.isGoPay = 1
            }, dey);  // 指定 xx ms 后触发真正想进行的操作 handler
        },


        // 评论
        openCommentSheet(){
            if (this.token == null || this.token == "") {
                // 跳转路由，如果跳转不了尝试条件编译
                this.$Router.push({path:"/login"})
                return
            }
            this.comment.sheet = !this.comment.sheet
            this.comment.form.content = ""
        },
        closeCommentSheet(){
            this.comment.sheet = !this.comment.sheet
        },
        reply(e){
			this.comment.form.topId = e.topId
			this.comment.form.replyId = e.parentInfo.userInfo.id
			this.comment.placeholder = `@${e.parentInfo.userInfo.nickName}回复：`
			this.openCommentSheet()
		},
        async commentLike(e){
			this.tmpList = this.tmpList.map((i)=>{
                if (e.id == i.id) {
                    i.isLike = !i.isLike
                    if (i.isLike) {
                        i.likes =  i.likes + 1
                    } else {
                        i.likes =  i.likes - 1
                    }
                }
                return i
            })
            this.restList(this.tmpList)
            const query = {
                id:e.id
            }
            const res = await uni.$u.http.post(api.postCommentLike,query,{
				custom: {auth: true},
			})
            if (res.code != 1) {
                this.$refs.commentToast.show({
                    message: res.message,
                    type: 'error',
                })
                this.tmpList = this.tmpList.map((i)=>{
                    if (e.id == i.id) {
                        i.isLike = !i.isLike
                        if (i.isLike) {
                            i.likes =  i.likes + 1
                        } else {
                            i.likes =  i.likes - 1
                        }
                    }
                    return i
                })
                this.restList(this.tmpList)
                return
            }
		},
        async commentDelete(e,mode,index,cindex){
            const query = {
                id:e.id
            }
            const res = await uni.$u.http.post(api.postCommentRemove,query,{
				custom: {auth: true},
			})
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            if (mode == "top") {
                this.list.splice(index,1)
            }
            if (mode == "children") {
                this.list[index].children.splice(cindex,1)
            }
		},
        commentReport(e){
            this.report.form.relatedId = e.id
            this.report.form.description = ""
            this.report.form.module = "comment"
            this.report.form.type = 1
            this.openReportSheet()
        },
        async postComment(){
            try {
				 if (this.token == null || this.token == "") {
                    // 跳转路由，如果跳转不了尝试条件编译
                     this.$Router.push({path:"/login"})
                    return
                }
                if (this.comment.form.content.length == 0 ) {
                    this.$refs.commentToast.show({
                        message: "请写点内容吧最少6个字",
                        type: 'error',
                    })
                    return
                }
                let formData = {
					content:this.comment.form.content,
					relatedId:this.id,
					module: "post",
					topId:this.comment.form.topId,
                    replyId:this.comment.form.replyId,
                }

                const res = await uni.$u.http.post(api.postCommentCreate,formData,{
					custom: {auth: true},
				})
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                this.$refs.uToast.show({
                    message: "发布成功",
                    type: 'success',
                })
                if (this.tmpList.length > 0) {
                    this.tmpList.unshift(res.data.info)
                }else{
                    this.tmpList.push(res.data.info)
                }
             
                this.restList(this.tmpList)
				this.comment.form.content = ""
				this.comment.form.topId = 0
				this.comment.form.replyId = 0
				this.closeCommentSheet()
            } catch (error) {
                console.log(error)
            }
        },
        async getList(){
            this.status = "loading"
			this.queryParam.relatedId = this.id    
            const res = await uni.$u.http.get(api.getCommentList,{
				params:this.queryParam
			})
            if (res.code != 1) {
                this.$refs.uToast.show({
					title: res.message,
					type: 'error ',
				})
                return
            }
			
			res.data.list = res.data.list != null ? res.data.list : []
			this.isShow = res.data.list.length > 0 ? false : true
            this.total = res.data.total
            this.tmpList =[...this.tmpList,...res.data.list]
			this.restList(this.tmpList)
			this.status = this.isShow ? "loadmore" : "nomore"
        },
        restList(arr){
            let list = handertree(arr || [],"id","topId")
            this.list = list
        },

        // 举报
        openReportSheet(){
            if (this.token == null || this.token == "") {
                // 跳转路由，如果跳转不了尝试条件编译
                this.$Router.push({path:"/login"})
                return
            }
            this.report.sheet = !this.report.sheet
            this.report.form.content = ""
        },
        closeReportSheet(){
            this.report.sheet = !this.report.sheet
        },
        async postReport(){
            if (this.token == null) {
                this.$Router.push({path:'/login'})
                return
            }

            const formData = {
                relatedId:this.report.form.relatedId,
                module: this.report.form.module,
                description: this.report.form.description,
                type: this.report.form.type,
            }
            
            const res = await uni.$u.http.post(api.postReportCreate,formData,{
                 custom: {auth: true},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            this.closeReportSheet()
            this.$refs.uToast.show({
                message: "举报成功",
                type: 'success',
            })
            return
            
        },


        // 分享
        openShareSheet(){
            this.share.sheet = !this.share.sheet
        },
        closeShareSheet(){
            this.share.sheet = !this.share.sheet
        },
        shareqq(){
            this.$refs.shareToast.show({
                message: "此功能正在开发中",
                type: 'error',
            })
            return
        },
        sharewechat(){
            this.$refs.shareToast.show({
                message: "此功能正在开发中",
                type: 'error',
            })
            return
        },
        copyLink(){
			// #ifndef H5
            
            uni.setClipboardData({
                data: this.base.url+"/post/"+this.id,
                success: () => {
                    this.closeSheet()
                }
            });
			// #endif
			// #ifdef H5
            this.$refs.shareToast.show({
                message: "复制成功了",
                type: 'success',
            })
			// #endif
        },
        shareReport(){
            this.report.form.relatedId = this.info.id
            this.report.form.description = ""
            this.report.form.module = "post"
            this.report.form.type = 1
            this.closeShareSheet()
            this.openReportSheet()
        },

		onReachBottom(){  //上拉触底函数
           if (!this.isShow) {
                this.queryParam.page += 1
                this.getList()
                return
            }
            this.status = "nomore"
        },
        goUser(e){
            this.$Router.push({name:`user`,params: { id: e }})
        },
        goCategory(e){
            this.$Router.push({name:`category`,params: { id: e }})
        }
	}
}
</script>

<style scoped lang="scss">

.loading-skeleton{
    padding: 30rpx;
}
.u-page{
    margin-top: 20rpx;
	padding: 0 30rpx;
    .author{
        margin-bottom: 30rpx;
        display: flex;
        align-items: center;
        .avatar{
            
            width: 80rpx;
            height: 80rpx;
        }
        .nickname-grade-desc-btn{
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 20rpx;
            .nickname-desc-grade{
                flex: 1;
                .nickname-grade{
                    display: flex;
                    align-items: center;
                    .nickname{
                        margin-right: 10rpx;
                        margin-bottom: 6rpx;
                    }
                }
            }
            .follow{
                .btn{
                    font-size: 24rpx;
                    color: #13c2c2;
                    padding: 8rpx 20rpx;
                    border-radius: 8rpx;
                    background-color: #e6fffb;
                    margin-left: 20rpx;
                }
            }
            
        }
    }

    .title{
        margin-bottom: 30rpx;
    }

    .description{
        margin-bottom: 15rpx;
        font-size: 28rpx;
        color: #999;
    }

    .resource{
        margin-bottom: 30rpx;
        padding: 20rpx;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 8rpx;
        .title{
            margin-bottom: 20rpx;
        }
        .example{
            margin-bottom: 20rpx;
           
        }
        .attr{
            padding: 20rpx;
            background-color: rgba(0, 0, 0, 0.09);
            border-radius: 8rpx;
            .item{
                display: flex;
                align-items: center;
                padding: 10rpx 15rpx;
                .key{
                    width: 100rpx;
                    
                }
            }
        }
        .auth{
            
            border-radius: 8rpx;
            margin-top: 20rpx;
            padding: 20rpx;
           
            .type{
                display: flex;
                align-items: center;
                .grade{
                    font-size: 24rpx;
                    color: #f5222d;
                    padding: 4rpx 8rpx;
                    border-radius: 8rpx;
                    background-color: #fff1f0;
                    margin-left: 20rpx;
                }
            }
            .desc{
                margin-top: 20rpx;
                .desc-text{
                    display: flex;
                    align-items: center;
                    .grade-icon{
                        margin-left: 10rpx;
                    }
                }
            }
            .code{
                margin-top: 20rpx;
                padding: 10rpx 20rpx;
                border-radius: 8rpx;
                background: rgba(0, 0, 0, 0.09);
            }
            .btn{
                display: flex;
                justify-content: center;
                margin-top: 20rpx;
                align-items: center;
                padding: 10rpx 0rpx;
                border: 2rpx solid #3c9cff;
                border-radius: 8rpx;
                color: #3c9cff;
                font-size: 24rpx;
            }
        }
        .errro{
            background: rgba(244, 67, 54, 0.05);
            border: 4rpx dashed rgba(255, 0, 0, 0.28);
        }
        .success{
            background: rgba(139, 195, 74, 0.05);
            border: 4rpx dashed rgba(0, 128, 0,0.28);
        }
    }

    .reward{
        margin-bottom: 30rpx;
        background-color: #fffcf7;
        border-radius: 8rpx;
        padding: 20rpx;
        .text-btn{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .count{
            margin-top: 20rpx;
            margin-bottom: 20rpx;
        }
        .list{
            margin-bottom: 20rpx;
            max-width: 100%;
            display: flex;
            margin: 0;
            flex-wrap: wrap;
            .avatar{
                position: unset;
                margin: 4rpx;
            }
        }
    }

    .meta-tag{
        margin-bottom: 30rpx;
        display: flex;
        justify-content: space-between;
        .meta{
            display: flex;
            align-items: center;
            .icon-num{
                display: flex;
                align-items: center;
                .num{
                    margin-left: 10rpx;
                    color: #999;
                    font-size: 30rpx;
                }
            }
        }
        .tags{
            display: flex;
            align-items: center;
            .tag{
                background: #999;
                border-radius: 20rpx;
                font-size: 20rpx;
                padding: 4rpx 8rpx;
                color: #fff;
            }
        }
    }
    
    .comment-count{
         margin-top: 20rpx;
        .line{
           margin-top: 10rpx;
            background: #3c9cff;
            width: 60rpx;
            height: 6rpx;
        }
    }
    .comment-list{
        margin-top: 30rpx;
        .more{
            margin-top: 30rpx;
        }
    }
}
.bottom-bar{
    height: 80rpx;
	width: 100%;
	background: white;
	box-shadow: 0 4px 12px rgba(0,0,0,.08), 0 0 1px rgba(1,0,0,.1);
	position: fixed;
	bottom: 0;
	z-index: 1;
 
	display: flex;
	justify-content: space-between;
	align-items: center;
    .comment-input-box{
        margin-left: 30rpx;
        background-color: rgba(230, 230, 230, 0.664);
        border-radius: 30rpx;
        height: 60rpx;
        width: 300rpx;
        padding: 0 40rpx;
        display: flex;
        justify-content: center;
    }
    .button{
        margin-right: 30rpx;
        flex: 1;
        // width: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icons{
            // padding: 0 10rpx;
            margin-left: 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .count{
                line-height: 48rpx;
                color: #909399;
                font-size: 24rpx;
                margin-left: 10rpx;
            }
        }
    }

   
    .share-box{
        height: 100%;
        background-color: #fff;
    }
}
.reward-box{
    
    padding: 30rpx;
    .title-text{
        display: flex;
        justify-content: space-between;
    }
    .sugar{
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        .item{
            padding: 20rpx;
            font-size: 20rpx;
            margin: 10rpx;
            border: 2rpx solid #ddd;
            text-align: center;
            line-height: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 6rpx;
            box-sizing: border-box;
            .text{
                line-height: 48rpx;
                margin-left: 10rpx;
            }
        }
        .active{
            border-color: #f16b6f;
            color: #f16b6f;
        }
    }
    .input-money{
        margin-top: 20rpx;
    }

    .pay-mode{
        margin-top: 20rpx;
        .list{
            display: flex;
            flex-flow: nowrap;
            align-items: center;
            justify-content: center;
            .item{
                width: 100%;
                display: flex;
                margin: 5px;
            }
        }
    }
    .pay-action{
        margin-top: 20rpx;
    }
}
.pay-box{
    padding: 30rpx;
    .title-text{
        display: flex;
        justify-content: space-between;
    }
    .pay-mode{
        margin-top: 20rpx;
        .list{
            display: flex;
            flex-flow: nowrap;
            align-items: center;
            justify-content: center;
            .item{
                width: 100%;
                display: flex;
                margin: 5px;
            }
        }
    }
    .money{
        margin-top: 20rpx;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;   
    }
    .pay-action{
        margin-top: 20rpx;
    }
}

.comment{
	padding: 20rpx 30rpx;
   .content-createbtn{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		.content{
			flex: 1;
			margin-right: 20rpx;
		}
   }
}
.report{
	padding: 20rpx 30rpx;
    .report-type{
        margin: 30rpx;
        .item{
            margin-right: 20rpx;
        }
    }
   .content-createbtn{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		.content{
			flex: 1;
			margin-right: 20rpx;
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


