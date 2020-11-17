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

export function getUserInfo(token) {
  return request({
    url: `/user?a=getUserInfo&token=${token}`,
    method: 'get'
  })
}


export function getQuestionData() {
  return request({
    url: '/question',
    method: 'get'
  })
}

export function getDetailQuestionData(id) {
  return request({
    url: `/question/${id}`,
    method: 'get'
  })
}

export function getUserQuestionData(uid) {
  return request({
    url: `/question?a=getUserQuestion&uid=${uid}`,
    method: 'get'
  })
}

export function getUserQuestionResult(uid, title) {
  return request({
    url: `/question?a=getUserQuestionResult&uid=${uid}&title=${title}`,
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

export function resultQuestion(data, action='result') {
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

export function deleteQuestion(id, data) {
  return request({
    url: `/question\${id}`,
    method: 'delete',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
