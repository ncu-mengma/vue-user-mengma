import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/Layout"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: "/homePage",
    children: [{
      path: "homePage",
      component: () => import("@/views/HomePage"),
      name: "home",
      meta: {
        title: "首页"
      }
    }]
  },
]

const router = new VueRouter({
  routes
})

export default router
