import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/get_evaluation_list/',
    method: 'get',
    params
  })
}

export function getQuestionList() {
  return request({
    url: '/get_question_list/',
    method: 'get'
  })
}
