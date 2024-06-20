/* eslint-disable no-await-in-loop */
export async function clearProductSpecification(
  ctx: Context,
  next: () => Promise<any>
) {
  try {
    const {
      clients: { productClient },
    } = ctx

    const arrProductId = ctx.state.allProducts
    const batchSize = 50 // Tamaño del lote

    const bodySpecificationClear = [
      {
        Value: [],
        Id: ctx.state.specificationId,
        Name: ctx.state.specificationName,
      },
    ]
    // Dividir arrProductId en lotes

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    for (let i = 0; i < arrProductId.length; i += batchSize) {
      const batch = arrProductId.slice(i, i + batchSize)
      // Actualizar cada lote en paralelo
      await Promise.all(
        batch.map((productId) =>
          productClient.clearProductSpecification(
            productId,
            bodySpecificationClear
          )
        )
      )
      sleep(500)
    }
    ctx.status = 200
  } catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = 'Fallo updateProductSpecification'
  }
  await next()
}
