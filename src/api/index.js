/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-07-08 23:43:00
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2023-07-25 14:15:53
 * @FilePath: \wap\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const api = {

    // -------------------------站点接口
    getSystemAuth: "/system/auth",
    getSystemPay:  "/system/pay",
    getSystemApex:  "/system/apex",
    getSystemApexMap: "/system/apexMap",
    getSystemPredator: "/system/predator",
    getSystemIntegralAndExperience: "/system/integralAndExperience",
    getSystemInfo:  "/system/info",
    getSystemHome:  "/system/home",
    getSystemHotUser:"/system/hotUser",
    getGradeNext: "/grade/next",

    // -------------------------栏目 接口
    getCategoryInfo:  "/category/info",
    getCategoryAll:  "/category/all",

    // -------------------------autn 接口
    getImageCaptcha: "/auth/image/captcha",
    getOption: "/auth/option",
    sendCaptcha: '/auth/send/captcha',// 发送邮箱验证码
    postRegister: '/auth/register',// 用户注册
    postLogin: '/auth/login',// 用户登录
    postLogout: '/auth/logout',// 用户登出

    // -------------------------媒体 接口
    getUploadEngineSts:  "/upload/engineSts",
    postuploadFile:  "/upload/minFile",
    UploadChunk:  "/upload/chunk",
    mergeChunk:  "/upload/mergeChunk",


    // -------------------------用户账户 接口
    getAccountInfo: "/account/info", //获取用户账户信息
    postAccountEdit:  "/account/edit", //设置用户账户基础信息
    getAccountSecurity: "/account/security", //获取用户账户绑定信息
    postAccountEditPassWord: "/account/editPassword", //修改用户账户密码
    postAccountEditEmail: "/account/editEmail", //修改用户邮箱
    getAccountBalance: "/account/balance", //获取用户账户余额
    postAccountSign: "/account/sign", //获取用户是否签到
    getAccountFavoritePostList: "/account/favorite/post/list",
    getAccountFavoriteWikiList: "/account/favorite/wiki/list",
    getAccountPostList: "/account/post/list",
    
    // -------------------------页面 接口
    getPage: "/page/info", //获取页面信息

    // -------------------------举报接口
    postReportCreate: "/report/create",

    // -------------------------意见反馈接口
    postSuggestCreate: "/suggest/create",


    // -------------------------用户账户 接口
    postUserFollow: "/user/follow", // 关注接口
    getUserInfo: "/user/info", //获取用户账户信息
    getUserPosts: "/user/posts", //获取内容列表
    getUserFansOrFollows: "/user/fansOrFollows", //获取用户粉丝列表
    getUserSign: "/user/sign", //用户签到
    getUserReward: "/user/reward", //获取用户关注列表
    

    // -------------------------通知接口
    getNoticeCount: "/notice/count",
    getNoticeList: "/notice/list",


    // -------------------------充值 接口
    // getRechargeList: "/recharge/list",
    // postRechargeCreate: "/recharge/create", //
    // postRechargeWapPay: "/recharge/wapPay",
    // postRechargeCheckStatus: "/recharge/status", //创建订单 token

    // -------------------------订单 接口
    getOrderList: "/order/list",
    postOrderCreate: "/order/create", //
    postOrderPay: "/order/pay",
    postOrderCheckStatus:"/order/status", //创建订单 token
    getRewardList: "/reward/list",

    // -------------------------提现 接口
    getCashList: "/cash/list", //获取列表
    postCashCreate: "/cash/create", //提交


    // -------------------------评论 接口
    postCommentCreate: "/comment/create",
    getCommentList: "/comment/list",
    postCommentLike: "/comment/like",
    postCommentRemove: "/comment/remove",
    // ------------------------- 话题接口
    getPostList:"/post/list",
    postPostCreate:"/post/create",
    postPostLike:"/post/like",
    postPostFavorite: "/post/favorite",
    postPostRemove: "/post/remove",
    getPostInfo:  "/post/info",
    postPostExchange:  "/post/exchange",
    getPostEditInfo: "/post/edit/info",
    postPostEdit: "/post/edit",

    // -------------------------打手申请接口
    postArticleCreate: "/article/create",
    getArticleEditInfo:  "/article/edit/info",
    postArticleEdit:  "/article/edit",
    getArticleInfo: "/article/info",
    postArticleFavorite:"/article/favorite",
    postArticleLike: "/article/like",
    getArticleList: "/article/list",
    postArticleRemove: "/article/remove", //删除
    
}
export default api