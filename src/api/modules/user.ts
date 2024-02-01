import api from '../index'

export default {
  // 登录
  login: (data: {
    username: string
    password: string
    host: string
  }) => api.post('web/login', data, { baseURL: data.host }),
  logout: () => api.get('web/logout'),
  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),
  get_ticks: () => api.get('web/ticks'),
}
