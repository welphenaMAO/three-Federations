import request from '../utils/request'

export const userApi = {
  // test 获取用户
  getUser: (userId: number): Promise<any> => {
    return request.get(`/users/${userId}`)
  },
}
