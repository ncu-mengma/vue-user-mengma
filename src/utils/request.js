import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
// 覆写库的正式环境的路径,开发环境及测试环境设置请求到/api
//process.env.NODE_ENV === 'production' 生产环境
//process.env.NODE_ENV === 'development' 开发环境
// process.env.NODE_ENV === 'test' 测试环境
axios.defaults.baseURL = 'http://localhost:8081';
// 现在，在超时前，所有请求都会等待 30 秒
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //var token = response.headers.token;
    //console.log(token)
    const { success, code, message, data } = response.data
    // //如果响应内容不存在，直接抛错
    // if (res == undefined) {
    //     return Promise.reject(new Error(res.message || '没有获取到服务器响应，基础功能出错，无法正常运行！！！请联系管理员'))
    // }
    if (success) return Promise.resolve(data)
    if (code === '5000') {
        store.commit("user/RESET_STATE")
        store.commit("user/SET_SHOWLOGIN", true)
    }
    return Promise.reject(message)
}, function (error) {
    console.log('err' + error) // for debug
    return Promise.reject(error)
});
// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     const res = response.data
//     //如果响应内容不存在，直接抛错
//     if(res == undefined){
//       return Promise.reject(new Error(res.message || '没有获取到服务器响应，基础功能出错，无法正常运行！！！请联系管理员'))
//     }
//     if (res.code !== 20000) {
//         // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;

//         if (res.code === 50014) {
//           console.log('触发')
//           // to re-login
//           MessageBox.alert('您的信息已过期,请重新登录', '提示', {
//             confirmButtonText: '确认',
//             callback: action => {
//               console.log('登出了')
//               store.dispatch('user/resetToken').then(()=>{
//                 location.reload()

//               })

//             },
//             type: 'warning'
//           })
//         }else {
//           Message({
//             message: res.message || 'Error',
//             type: 'error',
//             duration: 5 * 1000
//           })
//         }

//         return Promise.reject(new Error(res.message || 'Error'))
//       } else {
//         return res
//       }
// }, function (error) {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
// });
export default axios;


