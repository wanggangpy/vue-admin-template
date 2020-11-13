import request from '@/utils/request'

export function importUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function getData() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
