import { json } from 'co-body'

export async function validate(ctx: Context, next: () => Promise<any>) {
  const { state } = ctx
  const { idCollection, id, name, value } = await json(ctx.req)

  if (!idCollection && !id && !name && !value) {
    ctx.state.code = 500 // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
  }
  const collectionId = parseInt(idCollection as string, 10)
  const specificationName = name
  const specificationValue = value
  const specificationId = parseInt(id as string, 10)
  state.collectionId = collectionId
  state.specificationName = specificationName
  state.specificationId = specificationId
  state.specificationValue = specificationValue
  ctx.state.code = 200

  await next()
}
