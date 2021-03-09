import { request } from './request'

/**
 * 获取首页轮播图数据
 */
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

/**
 * 商品数据
 * @param {String} type 分类名称
 * @param {Number} page 当前请求的页码 
 */
export function getHomeGoods(type, page) {
  if (!type || !page) return
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
