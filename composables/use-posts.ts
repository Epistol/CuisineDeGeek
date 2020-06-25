import { reactive, toRefs, SetupContext } from '@vue/composition-api'
// import { apiState, globalState } from '~/types/State'

interface Options {
  ctx: SetupContext
}

interface ArticleConfig {
  articleSlug?: string
  id?: number
  subcategory: string
}
interface ApiState {
  response: object
  error: object | null
  fetching: boolean
}
interface globalState {
  articles: object | null
  article: object[] | null
}

export default function usePosts({ ctx }: Options) {
  // Setting up the endpoint
  const apiState: ApiState = reactive({
    response: [],
    error: null,
    fetching: false
  })

  const globalState: globalState = reactive({
    articles: {},
    article: [{}]
  })

  const fetchArticlesList = async (subtype: string = 'posts') => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(
      `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/${subtype}?orderby=date&per_page=10&_embed`,
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

    const { data } = await ctx.root.$axios.get(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts`, {
      params: {
        orderby: 'date',
        per_page: 10,
        categories_exclude: process.env.FEATURED_CATEGORY_ID || null,
        page: infiniteLoadingPage + 1,
        _embed: true
      }
    })
    globalState.articles = data
  }

  const fetchArticleForUserLang = async (config: ArticleConfig) => {
    await fetchArticleData(config)
    if (globalState.article) {
      // @ts-ignore
      if (globalState.article[0].lang !== ctx.root.$i18n.locale) {
        // @ts-ignore
        const articleIdLangMatch = globalState.article[0].translations[ctx.root.$i18n.locale]
        // await fetchArticleData({undefined, articleIdLangMatch, config.subcategory})
      }
    }
  }

  const fetchArticleData = async (config: ArticleConfig) => {
    apiState.fetching = true

    const { data } = await ctx.root.$axios.get(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/${config.subcategory}`, {
      params: {
        slug: config.articleSlug,
        id: config.id,
        _embed: true
      }
    })
    globalState.article = data
    return data
  }

  return {
    // @ts-ignore
    ...toRefs(apiState),
    // @ts-ignore
    ...toRefs(globalState),
    fetchArticlesList,
    fetchMoreArticlesList,
    fetchArticleForUserLang
  }
}
