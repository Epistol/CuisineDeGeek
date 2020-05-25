import { reactive, toRefs, SetupContext } from '@vue/composition-api'
// import { apiState, globalState } from '~/types/State'

interface Options {
  ctx: SetupContext
}

export default function usePosts({ ctx }: Options) {
  // Setting up the endpoint
  const apiState = reactive({
    response: [],
    error: null,
    fetching: false
  })

  const globalState = reactive({
    articles: {},
    article: {}
  })

  const getArticlesList = async () => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?orderby=date&per_page=10&_embed`,
      {
        params: {
          _embed: true
        }
      },
    )
    globalState.articles = data
    return data
  }

  const getMoreArticlesList = async (infiniteLoadingPage: number) => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts`,
      {
        params: {
          orderby: 'date',
          per_page: 10,
          categories_exclude: process.env.FEATURED_CATEGORY_ID || null,
          page: infiniteLoadingPage + 1,
          _embed: true
        }
      },
    )
    globalState.articles = data
    return data
  }

  const getArticleData = async (articleSlug: string) => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts`,
      {
        params: {
          slug: articleSlug,
          _embed: true
        }
      },
    )
    globalState.article = data
    return data
  }

  return {
    ...toRefs(apiState),
    ...toRefs(globalState),
    getArticlesList,
    getMoreArticlesList,
    getArticleData,
  }
}
