/* eslint-disable @typescript-eslint/no-use-before-define */
import { EventBus } from './event'

/** 事件总线 */
export const $event = new EventBus()

/** url 拼接 */
export const serialize = (obj: IAnyObject) => {
  return Object.keys(obj)
    .map((k) => `${k}=${encodeURIComponent(obj[k])}`)
    .join('&')
}

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
