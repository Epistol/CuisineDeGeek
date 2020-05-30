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

  const fetchArticlesList = async () => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(
      `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts?orderby=date&per_page=10&_embed`,
      {
        params: {
          _embed: true
        }
      }
    )
    globalState.articles = data
  }

  const fetchMoreArticlesList = async (infiniteLoadingPage: number) => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(
      `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts`,
      {
        params: {
          orderby: 'date',
          per_page: 10,
          categories_exclude: process.env.FEATURED_CATEGORY_ID || null,
          page: infiniteLoadingPage + 1,
          _embed: true
        }
      }
    )
    globalState.articles = data
  }

  const fetchArticleForUserLang = async (articleSlug?: string, id?: number) => {
    await fetchArticleData(articleSlug, id)
    if (globalState.article[0].lang !== ctx.root.$i18n.locale) {
      const articleIdLangMatch =
        globalState.article[0].translations[ctx.root.$i18n.locale]
      await fetchArticleData(undefined, articleIdLangMatch)
    }
  }

  const fetchArticleData = async (articleSlug?: string, id?: number) => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(
      `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts`,
      {
        params: {
          slug: articleSlug,
          id,
          _embed: true
        }
      }
    )
    globalState.article = data
    return data
  }

  return {
    ...toRefs(apiState),
    ...toRefs(globalState),
    fetchArticlesList,
    fetchMoreArticlesList,
    fetchArticleForUserLang
  }
}
