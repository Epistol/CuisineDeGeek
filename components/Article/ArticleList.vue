<template>
  <div class="article-list" v-if="articles">
    <article v-for="article in articles" :key="article.id">
      <ArticleExcerpt :article="article" />
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ArticleExcerpt from '~/components/Article/ArticleExcerpt.vue'

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleExcerpt
  },
  props: {
    articles: Array
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {}
})
</script>
