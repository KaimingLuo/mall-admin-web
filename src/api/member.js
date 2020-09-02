import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url:'/member/list',
    method:'get',
    params:params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/member/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteMember(id) {
  return request({
    url: '/member/delete/' + id,
    method: 'post'
  })
}
