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

  const globalState = reactive({ searchResults: {}, searchResult: {} })

  const fetchSearchResults = async (infiniteLoadingPage: number, searchContent: string, type: string = 'post') => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/search`, {
      params: {
        per_page: 10,
        search: searchContent,
        page: infiniteLoadingPage + 1,
        type: type
      }
    })
    globalState.searchResults = data
    console.log('useSearch -> data', data)
  }

  return {
    ...toRefs(apiState),
    ...toRefs(globalState),
    fetchSearchResults
  }
}
