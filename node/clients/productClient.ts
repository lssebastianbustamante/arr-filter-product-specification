import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

const baseURL = '/api/catalog_system/pvt/products/'
const routes = {
  products: (productId: number) => `${baseURL}${productId}/specification`,
}

export default class ProductClient extends JanusClient {
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

  public async getProductSpecification(productId: number): Promise<any> {
    return this.http.get(routes.products(productId))
  }

  public async updateProductSpecification(
    productId: number,
    bodySpecification: {}
  ): Promise<any> {
    return this.http.post(
      `${baseURL}${productId}/specification`,
      bodySpecification
    )
  }

  public async clearProductSpecification(
    productId: number,
    bodySpecificationClear: {}
  ): Promise<any> {
    return this.http.post(
      `${baseURL}${productId}/specification`,
      bodySpecificationClear
    )
  }
}
