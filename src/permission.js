import router from './router'
import store from './store'

import { getToken } from '@/utils/auth' // get token from cookie
import { Message } from 'element-ui'


// const whiteList = ['Login', 'Register'] // no redirect whitelist name
// let isChecked = false;
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || "无标题";
  console.log(document.cookie)
  await store.dispatch('user/getInfo')
  next()




  // 通过token确定用户是否已登录
  // const hasToken = getToken()
  // //如果有token，则已登录
  // if (hasToken) {

  //   if (whiteList.includes(to.name)) {
  //     next({ path: '/' })
  //   } else {
  //     // const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //     const hasPermission = store.getters.permission && store.getters.permission.length > 0
  //     const hasReset = store.getters.resetFlag
  //     if (isChecked) {
  //       //如果已授权
  //       isChecked = false
  //       next()
  //     } else {
  //       //还未授权
  //       isChecked = true
  //       // await store.dispatch('permission/setFlag')
  //       try {
  //         // get user info
  //         // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']

  //         const { permission } = await store.dispatch('user/getInfo')


  //         // generate accessible routes map based on roles
  //         // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
  //         const accessRoutes = await store.dispatch('permission/generateRoutes', permission)
  //         console.log(accessRoutes)
  //         // dynamically add accessible routes
  //         router.addRoutes(accessRoutes)
  //         // hack method to ensure that addRoutes is complete
  //         // set the replace: true, so the navigation will not leave a history record
  //         next({ ...to, replace: true })
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)

  //       }
  //     }
  //   }

  /**动态路由需要解决，刷新路由丢失问题**/
  //判断是否为刷新页面，vuex中无数据，则为刷新页面
  // if(routesResult.length === 0 ||!user){
  //     // 获取用户信息(关于异步路由的东西我放这里了)
  //     store.dispatch('user/getInfo').then(()=>{
  //         if(to.name==='Login'||'Register'){
  //             next({path:'/'})
  //             NProgress.done()//进度条转态为完成
  //         }
  //         next({path:to.path})
  //     }).catch(error=>{
  //         Message({
  //             message:error,
  //             type:'error'
  //         })
  //         store.resetState();
  //         next({name:'Login'})
  //     })
  // }
  // }else{
  // next()
  // }
  // //如果用户要去的是登录页，直接从定向到主页，因为已经登录了，不用重复登录
  // if (to.path === '/login') {
  // next({ path: '/' })
  // NProgress.done()//进度条转态为完成
  // } else {//如果要前往的路由不是/login
  // //获取用户名
  // const hasGetUserInfo = store.getters.name
  // //如果用户名存在
  // if (hasGetUserInfo) {
  //     next()//进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  // } else {//不存在
  //     try {
  //     // 获取用户信息
  //     await store.dispatch('user/getInfo')
  //     next()//进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  //     } catch (error) {//如果获取用户信息出错
  //     // 删除令牌，进入登录页面重新登录
  //     await store.dispatch('user/resetToken')
  //     Message.error(error || 'Has Error')
  //     next(`/login?redirect=${to.path}`)//next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址
  //     NProgress.done()//进度条结束
  //     }
  // }
  // }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.name) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next({ name: 'Login' })

  //   }
  // }
});

// 后置钩子 不需要主动调用next()函数   路由跳转之后执行
router.afterEach((to, from) => { });