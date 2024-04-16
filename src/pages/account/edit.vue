<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
		<!-- 自定义顶部导航 -->
        <u-navbar
            :autoBack="true"
            :fixed="false"
            title="编辑资料"
            :border="false">
        </u-navbar>
        <view class="cover-avatar">
            <view class="cover">
                <Upload 
                :width="`${windowWidth}px`"
                :height="`${360}rpx`"
                @uploadFile="uploadCover" 
                :previewFullImage="false"
                :maxCount="1">
                    <u--image 
                    :showLoading="true" 
                    :src="form.cover" 
                    :width="`${windowWidth}px`"
                    :height="`${360}rpx`" >
                    </u--image>
                </Upload>
            </view>
            <view class="avatar">
                <Upload 
                :width="`140rpx`"
                :height="`140rpx`"
                @uploadFile="uploadAvatar" 
                :previewFullImage="false"
                :maxCount="1">
                    <u--image 
                    shape="circle"
                    :showLoading="true" 
                    :src="form.avatar" 
                    :width="`140rpx`"
                    :height="`140rpx`" >
                    </u--image>
                </Upload>
            </view>
        </view>

        <view class="u-page">
            <u--form
                labelPosition="top"
                :model="form"
                :rules="rule"
                ref="uForm"
            >
                <u-form-item
                    labelWidth="80"
                    label="昵称"
                    prop="number"
                    :border-bottom="false"
                >
                    <u--input
                        placeholder="请输入昵称"
                         border="none"
                        :customStyle="{
                            backgroundColor: '#f4f5f7',
                            padding: '16rpx'
                        }"
                        v-model="form.nickName"
                    />
                </u-form-item>
                <u-form-item
                    labelWidth="80"
                    label="性别"
                    prop="sex"
                    @click="showSex = true"
                    :border-bottom="false"
                >
                   <u--input
						v-model="form.name"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择性别"
						border="none"
                        :customStyle="{
                            backgroundColor: '#f4f5f7',
                            padding: '16rpx'
                        }"
				    ></u--input>
                </u-form-item>
                <u-form-item
                    labelWidth="80"
                    label="简介"
                    prop="number"
                    :border-bottom="false"
                >
                    <u--textarea
                        :customStyle="{
                            backgroundColor: '#f4f5f7'
                        }"
                        placeholder="请输入简介"
                        border="none"
                        v-model="form.description"
                    />
                </u-form-item>
            </u--form>
            <u-gap height="20" bgColor="#fff"></u-gap>
            <u-button @click="submit" 
            type="primary" 
            text="确认修改"></u-button>
        </view>

        <u-action-sheet
				:show="showSex"
				:actions="actions"
				title="请选择性别"
				description="如果选择保密会报错"
				@close="showSex = false"
				@select="sexSelect"
		>
		</u-action-sheet>
    </view>
</template>
<script>
import {mapState,mapActions} from "vuex"
import api from "@/api/index"
import Upload from "@/components/upload/index"
export default {
    components:{
        Upload,
    },
    data(){
        return{
            windowWidth:0,
            showSex: false,
            actions: [
                {
                    name:"男",
                    value: 1
                },
                {
                    name:"女",
                    value: 2
                },
                {
                    name:"未知",
                    value: 3
                },
            ],
            form:{
                name: null,
                avatar: null,
                cover: null,
                nickName: null,
                sex: null,
                description: null,
            },
            rule:{
                nickName:[
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                ],
            },
        }
    },
    computed:{
		...mapState('user',["token"]),
        ...mapState('app',["base","pay"]),
	},
    onLoad(){
        
        if (this.token == null) {
			// uni.$u.http.route({
			// 	url: '/login'
			// })
			this.$Router.push({path:'/login'})
			return
		}
        const { windowWidth } = uni.getSystemInfoSync();
        this.windowWidth = windowWidth
        this.getData()
    },
    methods:{
        ...mapActions("user",["A_UPDATE_NICKNAME"]),
        ...mapActions("user",["A_UPDATE_AVATAR"]),
        ...mapActions("user",["A_UPDATE_DESCRIPTION"]),
        async getData(){
            try {
                const res = await uni.$u.http.get(api.getAccountInfo,{
                     custom: {auth: true},
                })

                if (res.code!=1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                this.form = Object.assign(this.form,res.data.info)
                if (this.form.sex == 1) {
                    this.form.name = "男"
                }
                if (this.form.sex == 2) {
                    this.form.name = "女"
                }
                if (this.form.sex == 3) {
                    this.form.name = "未知"
                }
            } catch (error) {

                setTimeout(() => {
                    this.$refs.uToast.show({
                        message: '网络错误',
                        type: 'error',
                    })
                }, 1000)
            }
        },
        sexSelect(e) {
            this.form.name = e.name
            this.form.sex = e.value
        },
        submit(){
             this.$refs.uForm.validate().then(async (valid)=>{
                const formData = {
                    avatar:this.form.avatar,
                    cover:this.form.cover,
                    nickName:this.form.nickName,
                    sex:this.form.sex,
                    description:this.form.description,
                }
                const res = await uni.$u.http.post(api.postAccountEdit,formData,{
                    custom: {auth: true},
                })
                if (res.code!=1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                this.A_UPDATE_NICKNAME(this.form.nickName)
                this.A_UPDATE_AVATAR(this.form.avatar)
                this.A_UPDATE_DESCRIPTION(this.form.description)

                this.form.avatar = null
                this.form.cover = null
                this.form.sex = null
                this.form.name = null
                this.form.nickName = null
                this.form.description = null
 
                this.$refs.uToast.show({
                    message: "资料修改成功",
                    type: 'success',
                })
                this.$Router.back()
            }).catch(err=>{
                console.log(err)
            })
        },
        uploadAvatar(e){
            this.form.avatar = e[0].url
        },
        uploadCover(e){
            this.form.cover = e[0].url
        },
    }
}
</script>

<style lang="scss" scoped>
.u-page{
    margin: 0 30rpx;
}
.cover-avatar{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar{
        position: absolute;
        width: 140rpx;
        height: 140rpx;
        border: 6rpx solid #f4f5f7;
        border-radius: 50%;
    
    }
}
</style>