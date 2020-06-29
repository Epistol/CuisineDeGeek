<template>
  <div class="home">
    <div class="articles">
      <!-- <TheHero :hero-article="articlesList[0]" /> -->
      <h1 class>{{ $tc('common.recipe.last', articles.length) }}</h1>
      <ArticleList :articles="articles" v-if="articles.length" />
      <!-- <client-only>
        <InfiniteLoading ref="infiniteLoading" @infinite="moreArticles">
          <span slot="spinner">
            <Spinner1 />
          </span>
          <span slot="no-results">
            <Smile />
            <div>No more articles!</div>
          </span>
          <span slot="no-more">
            <Smile />
            <div>No more articles!</div>
          </span>
        </InfiniteLoading>
      </client-only>-->
    </div>
    <!-- <TheSidebar /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import ArticleList from '~/components/Article/ArticleList.vue'

export default defineComponent({
  name: 'Index',
  components: {
    ArticleList
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { articles, article, fetchArticlesList, fetchMoreArticlesList } = usePosts({ ctx })

    onMounted(async () => {
      await fetchArticlesList('recipe')
    })

    return { articles }
  }
})
</script>
