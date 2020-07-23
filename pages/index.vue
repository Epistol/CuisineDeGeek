<template>
  <div class="home">
    <div class="articles" v-if="articles.length">
      <!-- <TheHero :hero-article="articlesList[0]" /> -->
      <h1 class v-cloak>{{ $tc('common.recipe.last', articles.length) }}</h1>
      <ArticleList :articles="articles" />
      <Newsletter></Newsletter>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import ArticleList from '~/components/Article/ArticleList.vue'
import Newsletter from '~/components/Widgets/Newsletter.vue'

export default defineComponent({
  name: 'Index',
  layout: 'content',

  components: {
    ArticleList,
    Newsletter
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { articles, article, fetchArticlesList } = usePosts({ ctx })

    onMounted(async () => {
      await fetchArticlesList('recipe')
    })

    return { articles }
  }
})
</script>
