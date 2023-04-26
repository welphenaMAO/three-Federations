// import 'umtrack-wx'
import { $event } from './utils/util'
// import { userApi } from './api/user'

console.log('$event ??', $event)
// userApi.getUser(1).then((res) => {
//   console.log('res ??', res)
// })
// app.ts
App({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})
