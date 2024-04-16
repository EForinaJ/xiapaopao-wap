<template>
    <view class="container">
        <u-toast ref="uToast"></u-toast>
        <!-- 自定义顶部导航 -->
        <u-navbar
            :autoBack="true"
            :fixed="true"
            title="关于作者"
            :border="false">
        </u-navbar>


        <view class="u-page">
            <!-- 顶部 -->
           
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return{
         
        }
    },

    onLoad(){
        
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
.container{
    min-height: 100vh;
    background-color: #eff1f3;
    .u-page{
        .cover{
            background-size: cover;
            background-repeat: no-repeat;
            height: 300rpx;
            position: relative;
            .avatar{
                position: absolute;
                bottom: 20rpx;
                left: 40rpx;
            }
        }
        .name-desc{
            background-color: white;
            padding: 20rpx 30rpx;
            // box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
            .name-tags{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .name{
                    font-size: 42rpx;
                    font-weight: 800;
                    letter-spacing: 4rpx;
                }
                .tags{
                    margin-left: 18rpx;
                    display: flex;
                    align-items: center;
                    .follow{
                        font-size: 24rpx;

                    }
                    .ml-10{
                        margin-right: 20rpx;
                    }
                }
            }
        }
        .alert{
            margin: 40rpx 20rpx;
        }
        .swper{
            margin: 40rpx 20rpx;
        }

        .gird{
            margin: 40rpx 20rpx;
            padding: 20rpx 20rpx;
            border-radius: 6rpx;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .item{
                flex-direction: column;
                display: flex;
                align-items: center;
                justify-content: center;
                .grid-text {
                    font-size: 14px;
                    color: #909399;
                    margin-top: 10rpx;
                }
            }
        }

        .cell{
            margin: 40rpx 20rpx;
            .item{
                background-color: white;
                border-radius: 6rpx;
                margin-bottom: 20rpx;
                padding: 20rpx 20rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .text{
                    font-size: 28rpx;
                }
            }
        }

        .bio{
            padding: 0 30rpx;
            margin-top: 20rpx;
            .bio-text{
                font-weight: 700;
                font-size: 28rpx;
                margin-bottom: 10rpx;
            }
        }
        
    }
}

</style>