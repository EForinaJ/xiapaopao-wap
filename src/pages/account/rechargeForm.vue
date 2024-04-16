<template>
    <view class="container">
        
		<!-- 自定义顶部导航 -->
        <u-navbar
            :autoBack="true"
            :fixed="false"
            title="充值"
            :border="false">
        </u-navbar>

        <view class="u-page">
            <u--form
                :model="form"
                :rules="rule"
                ref="uForm"
            >
                <u-form-item
                    labelWidth="80"
					label="充值方式"
					prop="name"
					@click="showSex = true"
			        >
				    <u--input
						v-model="form.name"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择充值方式"
                        border="none"
                    ></u--input>
                    <u-icon
                            slot="right"
                            name="arrow-right"
                    ></u-icon>
                </u-form-item>
                <u-form-item
                    v-if="form.mode == 1 || form.mode == 2 || form.mode == 4"
                    labelWidth="80"
                    label="充值金额"
                    prop="money"
                    :border-bottom="false"
                >
                    <u--input
                        placeholder="金额只保留小数点后两位"
                        border="surround"
                        type="number"
                        v-model="form.money"
                    />
                </u-form-item>
                <u-form-item
                    v-if="form.mode == 3"
                    labelWidth="80"
                    label="卡密"
                    prop="cardKey"
                    :border-bottom="false"
                >
                    <u--input
                        placeholder="请输入卡密"
                        border="surround"
                        v-model="form.cardKey"
                    />
                </u-form-item>
                <u-form-item
                    v-if="form.mode == 4"
                    labelWidth="80"
                    label="账户名称"
                    prop="nickName"
                    :border-bottom="false"
                >
                    <u--input
                        placeholder="请输入转账账户名称"
                        border="surround"
                        v-model="form.nickName"
                    />
                </u-form-item>
                <u-form-item
                    v-if="form.mode == 4"
                    labelWidth="80"
                    label="转账单据"
                    prop="number"
                    :border-bottom="false"
                >
                    <u--input
                        placeholder="请输入转账单据"
                        border="surround"
                        v-model="form.number"
                    />
                </u-form-item>
                <u-form-item
                    v-if="form.mode == 4"
                    labelWidth="80"
                    label="转账平台"
                    prop="type"
                    :border-bottom="false"
                >
                    <u-radio-group 
                        v-model="form.type"
                        placement="row">
                        <u-radio
                        :customStyle="{marginRight: '16px'}" 
                        name="1"
                        label="支付宝"/>
                        <u-radio 
                        :customStyle="{marginRight: '16px'}"
                        name="2"
                        label="微信"/>
                    </u-radio-group>
                </u-form-item>
                
            </u--form>
            <u-gap height="20" bgColor="#fff"></u-gap>
            <u-button v-if="isGoPay == 1" @click="submit" 
            type="primary" 
            text="确认充值"></u-button>
            <u-button v-if="isGoPay == 2" @click="submit" 
            type="primary" 
            text="创建订单"></u-button>
            <u-button v-if="isGoPay == 3"  @click="submit" 
                type="primary" 
                loading
                :text="`等待付款${timesec}`" />
        </view>
        <u-action-sheet
            :show="showSex"
            :actions="actions"
            title="请选择充值方式"
            @close="showSex = false"
            @select="sexSelect"
		/>

        <u-modal 
        showCancelButton
        title="检测支付状态" 
        :confirmText="confirmText"
        cancelText="未支付"
        :show="payModal" 
        @confirm="confirm" 
        @cancel="cancel"
        ref="uModal" >
        <u-toast ref="uToast"></u-toast>
        </u-modal>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>
<script>
import {mapState} from "vuex"
import api from "@/api/index"
export default {
    data(){
        return{

            platform: null,

            balance:0,
            showSex: false,
            actions: [],
            isGoPay:1,


            form:{
                name:null,
                mode: null,
                money:null,
                cardKey:null,
                type:null,
                number:null,
                nickName:null,
            },
            rule:{
                mode:[
                    { required: true, message: '请设置充值方式', trigger: 'blur' }
                ],
                cardKey:[
                    { required: true, message: '请输入卡密信息', trigger: 'blur' }
                ],
                money:[
                    { required: true, message: '请输入充值金额', trigger: 'blur' },
                    {pattern:/^(0|[1-9]\d*)(.\d{1,2})?$/, message: '金额只保留小数点后两位', trigger: 'blur' }
                ],
            },

            // 订单状态显示框
            payModal: false,
            checkPayInterval:null,
            startTime:0,
            asyncClose:false,
            confirmText: "已支付",
            
            // 订单号码
            code:"",
            rechargeCode:""
        }
    },
    computed:{
		...mapState('user',["token"]),
        ...mapState('app',["base","pay"]),
	},
    onLoad(){
        if (this.token == null) {
			this.$Router.push({path:'/login'})
			return
		}
    
        this.platform = uni.$u.platform
        this.pay.recharge.forEach((item)=>{
            const tmp = {
                name: "",
                value: item
            }
            if ((this.platform == "h5" || this.platform == "alipay") && item == 1) {
                tmp.name = "支付宝"
            }
            if ((this.platform == "h5" || this.platform == "weixin") && item == 2) {
                tmp.name = "微信"
            }
            if (this.platform == "h5" && item == 3) {
                tmp.name = "卡密"
            }
            if (this.platform == "h5" && item == 4) {
                tmp.name = "人工充值"
            }
            this.actions.push(tmp)
        })

        this.getBlance()

        //判断是否存在订单号
        const rechargeCode = uni.getStorageSync('rechargeCode');
        
        if (rechargeCode != "" && rechargeCode != null && rechargeCode != undefined) {
            this.rechargeCode = rechargeCode
            this.payModal = true
        }
    },
    methods:{
        sexSelect(e) {
			this.form.name = e.name
            this.form.mode = e.value
            // this.$refs.uForm.validateField('form.mode')
		},
        submit(){
            this.$refs.uForm.validate().then(async (valid)=>{

                if (this.form.mode == null) {
                    this.$refs.uToast.show({
                        message: "请选择充值方式",
                        type: 'error',
                    })
                    return
                }

                if (this.isGoPay == 2 || this.isGoPay == 3) {
                    return false
                }
                
                if ((this.form.mode == 1 || this.form.mode == 2) && this.form.money == 0) {
                    this.$refs.uToast.show({
                        message: "请输入充值金额",
                        type: 'error',
                    })
                    return
                }

                if (this.form.mode == 3 && (this.form.cardKey == "")) {
                    this.$refs.uToast.show({
                        message: "请输入卡密",
                        type: 'error',
                    })
                    return
                }

                if (this.form.mode == 4 && (this.form.type == "" || this.form.name == "" || this.form.number == "")) {
                    this.$refs.uToast.show({
                        message: "请输入充值信息",
                        type: 'error',
                    })
                    return
                }

                this.isGoPay = 2
                const formData = {
                    mode: this.form.mode,
                    money:this.form.money,
                    cardKey:this.form.cardKey,
                    name:this.form.nickName,
                    type:this.form.type,
                    number:this.form.number,
                }

                const res = await uni.$u.http.post(api.postRechargeCreate,formData,{
                    custom: {auth: true},
                })
                if (res.code!=1) {
                    
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    this.throttl(10000)
                    return
                }
                
                

                if (this.form.mode == 3 || this.form.mode == 4) {
                    this.$refs.uToast.show({
                        message: "充值订单创建成功，请等待审核",
                        type: 'success',
                    })
                    this.throttl(10000)
                    this.$Router.back()
                }

                

                if (this.form.mode == 1 || this.form.mode == 2) {
                    this.isGoPay = 3
                    // #ifdef H5
                    this.wapPay(res.data.code)
                    // #endif
                }

            }).catch(err=>{
                console.log(err)
            })
        },
        confirm(){
            
            if (this.asyncClose) {
                this.$refs.uToast.show({
                    message: "正在检测支付状态，请不要重复点击",
                    type: 'default',
                })
                return
            }
            this.asyncClose = true
            this.confirmText = "正在验证支付状态"
            this.startTime = new Date().getTime()
            this.checkPayInterval = setInterval(() => {
                this.checkPayStatus()
            }, 1000);
        },
        cancel(){
            this.payModal = false
        },
        async checkPayStatus(){
            if (new Date().getTime() - this.startTime >= 30000) {
                clearInterval(this.checkPayInterval)
                this.checkPayInterval = null
                this.asyncClose = false
                this.confirmText = "已支付"
                this.$refs.uToast.show({
                    message: "检测为未支付状态",
                    type: 'default',
                })
            }
  
            const formData = {
                code:this.rechargeCode,
            }
            const res = await uni.$u.http.post(api.postRechargeCheckStatus,formData,{
                custom: {auth: true},
            })
            if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                clearInterval(this.checkPayInterval)
                this.checkPayInterval = null
                this.asyncClose = false
                return
            }
            if(res.data.status){
                this.checkTime = null;
                this.$refs.uToast.show({
                    message: "支付成功",
                    type: 'success',
                })
                clearInterval(this.checkPayInterval)
                this.checkPayInterval = null
                this.payModal = false
                uni.$emit('query');
                uni.navigateBack({
                    data:1
                });
            }
        },
        // #ifdef H5
        async wapPay(code){
            const qrRes = await uni.$u.http.post(api.postRechargeWapPay,{code:code},{
                custom: {auth: true},
            })
            if (qrRes.code != 1) {
                this.throttl(10000)
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }

            uni.setStorageSync('rechargeCode', qrRes.data.info.code);
            // #ifdef H5
                window.location.href = qrRes.data.info.qrCode
            // #endif
        },
        // #endif
        throttl(dey){ 
            let timeout;
            clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
            timeout = setTimeout(()=>{
                this.isGoPay = 1
            }, dey);  // 指定 xx ms 后触发真正想进行的操作 handler
        },
        async getBlance(){
            const res = await uni.$u.http.get(api.getAccountBalance,{
                custom: {auth: true},
            })
             if (res.code != 1) {
                this.$refs.uToast.show({
                    message: res.message,
                    type: 'error',
                })
                return
            }
            this.balance = res.data.balance
        },
    }
}
</script>

<style lang="scss" scoped>
.u-page{
    margin: 0 30rpx;
    .true-money{
        font-size: 28rpx;
        .tmpMoney{
            margin-right: 10rpx;
        }
    }
    .service-money{
        font-size: 28rpx;
        .tmpMoney{
            margin-right: 10rpx;
        }
    }
}
</style>