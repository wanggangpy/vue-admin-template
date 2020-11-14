import request from '@/utils/request'

export function importUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function getUserData() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function getQuestionData() {
  return request({
    url: '/question',
    method: 'get'
  })
}

export function addQuestion(data, action='add') {
  return request({
    url: `/question?a=${action}`,
    method: 'post',
    data
  })
}

export function updateQuestion(id, data) {
  return request({
    url: `/question/${id}`,
    method: 'put',
    data
  })
}

export function deleteQuestion(id) {
  return request({
    url: `/question\${id}`,
    method: 'delete',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
