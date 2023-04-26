import { getServer } from '/store/mutations'
import { serialize } from './util'

declare namespace Api {
  type Prefix = string

  /** 请求选项 */
  interface Options {
    /** 请求方式 */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    /** 请求头 */
    header?: object
    /** 请求 `query` 参数 */
    params?: IAnyObject
  }

  /** 服务器返回的数据 */
  type SuccessResult = any
}

/** 默认数据加载条数 */
export const limit = 10

export const servers = {
  dev: 'http://api.xx.xx',
  prod: 'https://api.xx.xx',
}

/** API 地址前缀 */
const apiVersion = '/api'
const token = 'xxx'

/**
 * 封装 API (axios风格)
 */
export default {
  /** 微信原始请求方法 */
  async request(
    url: string,
    options: Partial<wx.RequestOption>,
  ): Promise<wx.RequestSuccessCallbackResult> {
    const defaultHeader = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
    return new Promise((resolve, reject) => {
      const server = servers[getServer()]
      const test: wx.RequestOption = {
        url: server + apiVersion + url,
        method: options.method || 'POST',
        ...options,
        header: { ...defaultHeader, ...options.header },
        success: (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) return reject(res)
          resolve(res)
        },
        fail: (error) => reject(error),
      }
      wx.request(test)
    })
  },

  /** GET 请求 */
  async get(url: string, options: Api.Options = {}) {
    /** 默认请求头 */
    const defaultHeader = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }

    return new Promise<Api.SuccessResult>((resolve, reject) => {
      const server = servers[getServer()]
      wx.request({
        method: options.method || 'GET',
        url: server + apiVersion + url,
        data: options.params,
        header: { ...defaultHeader, ...options.header },
        success: (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) return reject(res)
          resolve(res.data)
        },
        fail: (error) => reject(error),
      })
    })
  },

  /**
   * POST 请求
   * @params url 类型
   */
  async post(url: string, data: object = {}, options: Api.Options = {}) {
    /** 默认请求头 */
    const defaultHeader = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
    if (options.params) {
      url += '?' + serialize(options.params)
    }

    return new Promise<Api.SuccessResult>((resolve, reject) => {
      const server = servers[getServer()]
      wx.request({
        method: options.method || 'POST',
        url: server + apiVersion + url,
        data,
        header: { ...defaultHeader, ...options.header },
        success: (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) return reject(res)
          resolve(res.data)
        },
        fail: (error) => reject(error),
      })
    })
  },

  /** DELETE 请求 */
  async delete(url: string, options: Api.Options = {}) {
    return this.get(url, {
      ...options,
      method: 'DELETE',
    })
  },

  /** PUT 请求 */
  async put(url: string, data: object = {}, options: Api.Options = {}) {
    return this.post(url, data, {
      ...options,
      method: 'PUT',
    })
  },

  /** PATCH 请求 */
  async patch(url: string, data: object = {}, options: Api.Options = {}) {
    const newdata = {}
    data = Object.assign(newdata, { _method: 'patch' }, data)
    return this.post(url, data, {
      ...options,
      method: 'POST',
    })
  },
}
