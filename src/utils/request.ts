import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios'

import { isArr, isBlob } from '@/utils'

export const NetworkErrorCode: Record<string, any> = {
  // 后台主动告知失败
  400: '请求错误',
  401: '登录凭证已失效，请重新登陆',
  403: '拒绝访问',
  404: '请求接口不存在，或已更改',
  // 服务器错误（网关代理服务器等）
  500: '服务器内部错误',
  502: '服务器升级中',
  503: '服务器资源拥挤',
  504: '服务器响应超时'
}

const service = axios.create({
  baseURL: '',
  timeout: 60 * 1000,
  // 任何状态都进入 axios 的 resolve
  validateStatus: () => true
})

service.interceptors.request.use(
  config => {
    // 加入登陆鉴权
    config.headers.set('Auth', 'TODO://')

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export interface RequestParams {
  url: string
  method: 'GET' | 'DELETE' | 'POST' | 'PUT'
  data: Record<string, unknown>
  responseType?: ResponseType
  /** 错误时，是否需要自动抛出错误提示 */
  autoThrowError?: boolean
  /** 是否是提交 Form 表单 */
  isForm?: boolean
  signal: AbortSignal
}

const DefRequestParams: Partial<RequestParams> = {
  responseType: 'json',
  autoThrowError: true
}

export interface ResponsePayload<T> {
  message: string
  code: number
  data: T
}

export type RequestReturn<D> = ResponsePayload<D> | void

/**
 * 获取网络层面错误的载荷，保持与后端接口返回数据格式一致
 * @param response
 */
export function getNetworkErrorPayload<D>(response: AxiosResponse) {
  const status = response.status

  const payload: ResponsePayload<D> = {
    message: `网络异常（${status}）`,
    //  TODO: 错误的 Code
    code: 0,
    data: null as D
  }

  if (status in NetworkErrorCode) {
    payload.message = NetworkErrorCode[status] + `（${status}）`
  }

  return payload
}

/**
 * 请求方法
 * @param params 请求参数
 * @param config 额外的配置项，继承于 Axios 拥有最高优先级
 */
export async function request<D>(
  params: RequestParams,
  config?: AxiosRequestConfig
): Promise<RequestReturn<D>> {
  const resolve: RequestParams = Object.assign({}, DefRequestParams, params)

  const options: AxiosRequestConfig = {
    url: resolve.url,
    method: resolve.method,
    responseType: resolve.responseType
  }

  // get 参数放 query 其余放 请求体
  if (options.method === 'GET') {
    options.params = resolve.data
  } else {
    // 如果是提交 form
    options.data = resolve.isForm ? getFormData(resolve.data) : resolve.data
  }

  // 注册取消请求
  options.signal = resolve.signal

  // 如果有，则覆盖所有的参数
  Object.assign(options, config)

  // 去请求
  const response = await service<AxiosRequestConfig, AxiosResponse<ResponsePayload<D>>>(options)

  if (response.status == 200) {
    return response.data
  }

  // network 错误包装成后端返回的数据格式
  return getNetworkErrorPayload<D>(response)
}

/**
 * 生成提交表单需要的 formData
 * @param payload
 */
export function getFormData(payload: Record<string, any>) {
  const form = new FormData()

  for (const key in payload) {
    const value = payload[key as keyof Record<string, any>]

    // 特殊处理 当为数组并且内部全是 File 或 Blob
    if (isArr(value) && value.every(item => isBlob(item))) {
      value.forEach(file => {
        form.append(key, file)
      })

      continue
    }

    if (value instanceof Blob) {
      form.append(key, value)
      continue
    }

    if (typeof value == 'object') {
      form.append(key, JSON.stringify(value))
      continue
    }

    form.append(key, value)
  }
}

/**
 * 获取请求的 hash 值
 */
export function genRequestHash() {}

/**
 * 请求进行中的管理
 */
export class RequestPendingManage {}

/**
 * 错误消息管理
 */
export class MessageManage {}
