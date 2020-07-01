import { reactive, toRefs, SetupContext } from '@vue/composition-api'
import products from '~/static/products/products.json'

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
    let data = {}
    if (process.server) {
      data = products
    } else {
      data = await ctx.root.$axios.get('/products/products.json').then(res => res.data)
    }

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
