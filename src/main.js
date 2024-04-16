import Vue from 'vue'
import App from './App'
import {router,RouterMount} from './router.js'  //路径换成自己的
Vue.use(router)

// #ifdef H5
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// #endif 



//  ui库
import uView from "uview-ui";

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import store from './store/'
Vue.prototype.$store = store
import { differenceInHours,differenceInDays,differenceInMonths,differenceInMinutes } from "date-fns"

Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'


//  添加全局过滤器 数字
Vue.filter('resetNum',(count)=>{
  let str = ""
  if (count >= 0 && count < 999) {
      str = `${count}`
      return str
  }
  
  if (count >= 999 && count <= 9999) {
      str = `${Math.round(count / 1000)}k`
      return str
  }

  if (count >= 9999 && count <= 99999) {
      str = `${Math.round(count / 10000)}w`
      return str
  }

  if (count > 99999) {
      str = `${10}w+`
      return str
  }
  return str;
})


//  添加全局过滤器 日期格式化
Vue.filter('resetDate',(date)=>{
    let str = date
   
    date = date.replace(/-/g, '/');
    const startDate = new Date(date);
    const endDate = new Date();

    let inMinutes = differenceInMinutes(endDate, startDate)
    if (inMinutes > 0 && inMinutes < 10) {
        str = `刚刚`
        return str
    }
    
    if (inMinutes >= 10 && inMinutes < 60) {
        str = `${inMinutes}分钟之前`
        return str
    }

    const inHours = differenceInHours(endDate, startDate)
    if (inHours >= 1 && inHours < 24) {
        str = `${inHours}小时之前`
        return str
    }

    const inDays = differenceInDays(endDate, startDate)
    if (inDays >= 1 && inDays < 31) {
        str = `${inDays}天之前`
        return str
    }

    const inMonths = differenceInMonths(endDate, startDate)
    if (inMonths >= 1 && inMonths < 12) {
        str = `${inMonths}月之前`
        return str
    }
    
    return str;
})

// 缩略图
Vue.filter('resetImage',(v,w = null,h = null)=>{
    if (w == null || h == null) { 
        return v;
    }
    v = v+`@w${w}_h${h}`
    return v;
})

const app = new Vue({
    store,
    ...App
})
// 
// store.commit("app/M_UPDATE_BASEURL",res.data.baseUrl)     
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
require('@/utils/request.js')(app)


// #ifdef H5
RouterMount(app,router,'#app')
// #endif

// #ifndef H5
//为了兼容小程序及app端必须这样写才有效果
app.$mount(); 
// #endif




// uni.request({
//     url: '/static/config.json', //仅为示例，并非真实接口地址。
//     success: (res) => {
//         const app = new Vue({
//             store,
//             ...App
//         })
//         app.BaseUrl = res.data.baseUrl
       
//         Vue.prototype.BaseUrl = res.data.baseUrl
//         // store.commit("app/M_UPDATE_BASEURL",res.data.baseUrl)     
//         // 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
//         require('@/utils/request.js')(app)
       


//         // #ifdef H5
//         RouterMount(app,router,'#app')
//         // #endif
        
//         // #ifndef H5
//         //为了兼容小程序及app端必须这样写才有效果
//         app.$mount(); 
//         // #endif
        
//     }
// });

