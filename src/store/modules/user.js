import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    fanCount: '',
    followCount: '',
    name: '',
    nickName: '',
    avatar: '',
    roles: [],
    permission: [],
    account: '',
    showLogin: false,
    sex: '',
    mail: ''
  };
};


const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  },
  SET_ALL: (state, data) => {
    Object.assign(state, data);
  },
  SET_SHOWLOGIN: (state, is_show) => {
    state.showLogin = is_show
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  }
}

const actions = {
  // user login
  login({ commit, state }, form) {

    return new Promise((resolve, reject) => {
      login(form).then(data => {
        commit("SET_ALL", data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, form) {
    console.log('进入register')
    return new Promise((resolve, reject) => {
      register(form).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(data => {
        if (data)
          commit('SET_ALL', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PERMISSION', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PERMISSION', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions
}
