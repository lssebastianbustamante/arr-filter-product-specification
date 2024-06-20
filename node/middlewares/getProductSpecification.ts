export async function getProductSpecification(
  ctx: Context,
  next: () => Promise<any>
) {
  try {
    const {
      clients: { productClient },
    } = ctx
    const productId = ctx.state.allProducts
    const specificationId = ctx.state.specificationId
    const specificationName = ctx.state.specificationName

    const res = await productClient.getProductSpecification(productId[0])

    const filteredSpecs = res.filter(
      (item: { Name: string; Id: number }) =>
        item.Name === specificationName || item.Id === specificationId
    )

    ctx.status = 200
    ctx.body = filteredSpecs
    await next()
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Fallo getNewCollection'
  }
}
