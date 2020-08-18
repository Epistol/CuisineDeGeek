import { reactive, toRefs, SetupContext } from '@vue/composition-api'
// import { apiState, globalState } from '~/types/State'

interface Options {
  ctx: SetupContext
}

export default function useSearch({ ctx }: Options) {
  // Setting up the endpoint
  const apiState = reactive({
    response: [],
    error: null,
    fetching: false
  })

  const globalState = reactive({ searchResults: {}, selectedResult: {} })

  const fetchSearchResults = async (
    infiniteLoadingPage: number,
    searchContent: any,
    type: string = 'post',
    subtype: string = ''
  ) => {
    apiState.fetching = true

    const Cookie = process.client ? require('js-cookie') : undefined
    const cookieLang = process.client ? (Cookie.get('i18n_redirected') ? Cookie.get('i18n_redirected') : null) : null

    const { data } = await ctx.root.$axios.get(`${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/search`, {
      params: {
        per_page: 10,
        search: searchContent,
        page: infiniteLoadingPage + 1,
        type: type,
        subtype: subtype,
        lang: cookieLang
      }
    })
    globalState.searchResults = data
    apiState.fetching = false
  }

  const setSelectedResult = async (val: any) => {
    // We need to load the data from the value passed, call api, then return the api data
    const { data } = await ctx.root.$axios.get(val._links.self[0].href)
    globalState.selectedResult = data
  }

  const emptySearchResults = () => {
    globalState.searchResults = {}
  }

  return {
    ...toRefs(apiState),
    ...toRefs(globalState),
    fetchSearchResults,
    setSelectedResult,
    emptySearchResults
  }
}
