import { GlobalData } from './state'

/** 获取当前服务器 */
export function getServer(): DomoServer {
  return GlobalData.server
}

/** 设置当前服务器 */
export function setServer(server: DomoServer) {
  GlobalData.server = server
}
