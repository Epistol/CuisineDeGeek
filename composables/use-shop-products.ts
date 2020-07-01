import { reactive, toRefs, SetupContext } from '@vue/composition-api'

interface Options {
  ctx: SetupContext
}

interface ApiState {
  response: object
  error: object | null
  fetching: boolean
}
interface globalState {
  products: object | null
}

export default function useShopProducts({ ctx }: Options) {
  // Setting up the endpoint
  const apiState: ApiState = reactive({
    response: [],
    error: null,
    fetching: false
  })

  const globalState: globalState = reactive({
    products: {}
  })

  const fetchProductsList = async () => {
    apiState.fetching = true
    const sourceUrl = `${process.env.NUXT_ENV_SHOPIFY_API_URL}/admin/api/2020-04/products.json`

    const { data } = await ctx.root.$axios.get(sourceUrl, {
      params: {}
    })
    globalState.products = data
  }

  return {
    // @ts-ignore
    ...toRefs(apiState),
    // @ts-ignore
    ...toRefs(globalState),
    fetchProductsList
  }
}
