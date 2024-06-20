import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

const baseURL = '/api/catalog/pvt/collection/'

const routes = {
  products: (colletionId: number) => `${baseURL}${colletionId}/products`,
}

export default class CollectionClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdClientAutCookie:
          context.authToken ??
          context.storeUserAuthToken ??
          context.adminUserAuthToken,
      },
    })
  }

  public async getProductFromCollection(
    collectionId: number,
    page: string,
    pageSize: string
  ): Promise<any> {
    return this.http.get(
      `${routes.products(collectionId)}?page=${page}&pageSize=${pageSize}`
    )
  }
}
