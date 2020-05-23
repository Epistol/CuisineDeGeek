import { reactive, toRefs, SetupContext } from '@vue/composition-api'
// import { apiState, globalState } from '~/types/State'

interface Options {
  ctx: SetupContext
}

export default function useMovieApi({ ctx }: Options) {
  // Setting up the endpoint
  const endpoint: string = 'https://api.themoviedb.org/3/tv/'
  const apiState = reactive({
    response: [],
    error: null,
    fetching: false
  })

  const globalState = reactive({
    showDetails: {},
  })

  const loadShowInfos = async () => {
    const url = endpoint
    apiState.fetching = true
    const { data } = await ctx.root.$axios.get(url,
      {
        params: {
          api_key: process.env.NUXT_ENV_TMDB_API
        },
      },
    )
    globalState.showDetails = data
  }

  return {
    ...toRefs(apiState),
    loadShowInfos,
  }
}
