import request from '@/utils/request'

export function addMeeting (parameter) {
  return request({
    url: '/meeting',
    method: 'post',
    data: parameter
  })
}

export function getList (parameter) {
  return request({
    url: '/meeting',
    method: 'get',
    params: parameter
  })
}

export function delMeeting (parameter) {
  return request({
    url: `/meeting/${parameter.id}`,
    method: 'delete',
    params: parameter
  })
}

export function getMeetingInfo (parameter) {
  return request({
    url: `/meeting/${parameter.id}`,
    method: 'get',
    params: parameter
  })
}

export function updateMeeting (parameter) {
  return request({
    url: `/meeting/${parameter.id}`,
    method: 'put',
    data: parameter
  })
}
