import useSettingsStore from './settings'
import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()
    const baseURL = ref(localStorage.host ?? '')
    const username = ref(localStorage.username ?? '')
    const token = ref(localStorage.token ?? '')
    const failure_time = ref(localStorage.failure_time ?? '')
    const avatar = ref(localStorage.avatar ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        retn = true
        // if (new Date().getTime() < Number.parseInt(failure_time.value) * 1000) {
        //   retn = true
        // }
      }
      return retn
    })

    async function get_ticks() {
      const res = await apiUser.get_ticks()
      return res
    }

    // 登录
    async function login(data: {
      username: string
      password: string
      host: string
    }) {
      const res = await apiUser.login(data)
      if (res.success) {
        localStorage.setItem('username', data.username)
        localStorage.setItem('host', data.host)
        localStorage.setItem('token', res.data.token)
        // localStorage.setItem('failure_time', res.data.failure_time)
        // localStorage.setItem('avatar', res.data.avatar)
        username.value = data.username
        baseURL.value = data.host
        token.value = res.data.token
        // failure_time.value = res.data.failure_time
        // avatar.value = res.data.avatar
      }
      return res
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      await apiUser.logout()
      localStorage.clear()
      localStorage.setItem('username', username.value)
      localStorage.setItem('host', baseURL.value)
      username.value = ''
      token.value = ''
      failure_time.value = ''
      avatar.value = ''
      permissions.value = []
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      username,
      token,
      baseURL,
      avatar,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
      get_ticks,
    }
  },
)

export default useUserStore
