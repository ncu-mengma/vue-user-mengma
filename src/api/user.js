import request from '@/utils/request'
export function validToken(data) {
  return request({
    url: '/validToken',
    method: 'post',
    data
  })
}
export function getMailCode(params) {
  return request({
    url: '/user/getMailCode',
    method: 'get',
    params
  })
}
export function validMailCode(params) {
  return request({
    url: '/user/validMailCode',
    method: 'get',
    params
  })
}
export function count(type, value) {
  return request({
    url: `/user/count/${type}`,
    method: 'get',
    params: {
      value
    }
  })
}
export function del(account) {
  return request({
    url: `/user/delete/${account}`,
    method: 'delete',
  })
}
export function process(data, info) {
  return request({
    url: `/user/process/${info}`,
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
export function validRegisterAccount(params) {
  return request({
    url: '/user/validRegisterAccount',
    method: 'get',
    params
  })
}
export function validRegisterMail(params) {
  return request({
    url: '/user/validRegisterMail',
    method: 'get',
    params
  })
}
export function login(params) {
  return request({
    url: '/user/login',
    method: 'get',
    params
  })
}
export function captcha() {
  return request({
    url: '/captcha',
    method: 'get',
    responseType: 'blob'
  })
}
export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'post'
  })
}

export function userPage(data, current, size) {
  return request({
    url: `security/dd-user-role/page/${current}/${size}`,
    method: 'post',
    data
  })
}
export function addUser(data) {
  return request({
    url: 'security/dd-user-role/add',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return request({
    url: '/security/dd-user-role/',
    method: 'put',
    data
  })
}
export function deleteUserById(id) {
  return request({
    url: `/security/dd-user-role/${id}`,
    method: 'delete'
  })
}

export function updatePasswordById(id, password) {
  return request({
    url: `/security/dd-user-role/updatePasswordById/${id}/${password}`,
    method: 'put'
  })
}
export function updateUserAndRole(data) {
  return request({
    url: `/security/dd-user-role/updateUserRole`,
    method: 'put',
    params: data
  })
}

