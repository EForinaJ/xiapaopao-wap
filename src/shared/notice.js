const SystmeType = {
    NoticeSysTemRegister: 1, // 用户注册通知
	NoticeSysTemDeleteContent :2, // 内容删除通知
	NoticeUserTips:3, // 用户打赏通知
	NoticeUserBuyContent: 4, // 用户购买内容通知
	NoticeSysTemUserViewTopic: 5,// 查阅付费帖子通知
}
const NOTINCETYPE = {
    NoticeSysTem: 1, //系统通知
	NoticeComment :2, //评论通知
	NoticeAnswer:3, //回答通知
	NoticeLike: 4, //获赞通知
	NoticeFollow: 5, //收到关注通知
}
export {
	NOTINCETYPE,
    SystmeType
}