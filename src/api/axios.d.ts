declare module 'axios' {
  interface IAxios<D = null> {
    code: string
    message: string
    data: D
    success: boolean
  }
  export interface AxiosResponse<T = any> extends IAxios<D> {}
}
