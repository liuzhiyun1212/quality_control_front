import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listData(query) {
  return request({
    url: '/system/changedata/list',
    method: 'get',
    params: query
  })
}

// 查询部门下拉树结构
export function changeDataTreeSelect() {
  return request({
    url: '/system/changedata/changeTree',
    method: 'get'
  })
}

// 查询【请填写功能名称】详细
export function getData(id) {
  return request({
    url: '/system/changedata/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addData(data) {
  return request({
    url: '/system/changedata',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateData(data) {
  return request({
    url: '/system/changedata',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delData(id) {
  return request({
    url: '/system/changedata/' + id,
    method: 'delete'
  })
}
