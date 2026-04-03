export interface HttpController {
  get(path?: string, query?: string): Promise<any>
  post(path?: string, data?: any, extraHeaders?: Record<string, string>, query?: string): Promise<any>
  put(path?: string, data?: any, extraHeaders?: Record<string, string>, query?: string): Promise<any>
  patch(path?: string, data?: any, extraHeaders?: Record<string, string>, query?: string): Promise<any>
  delete(path?: string, id?: string | number, extraHeaders?: Record<string, string>, query?: string): Promise<any>
  deleteSimple(path?: string, extraHeaders?: Record<string, string>, query?: string): Promise<any>
  save(path?: string, data?: any, extraHeaders?: Record<string, string>, query?: string): Promise<any>
  read(path?: string, id?: string | number, extraHeaders?: Record<string, string>, query?: string): Promise<any>
  readAll(path?: string, extraHeaders?: Record<string, string>, query?: string): Promise<any>
  readAllwithPage(path?: string, page?: number, size?: number): Promise<any>
  bulkDelete(path?: string, ids?: (string | number)[], extraHeaders?: Record<string, string>, query?: string): Promise<any>
}
