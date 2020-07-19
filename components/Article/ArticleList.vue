<template>
  <div class="article-list" v-if="articles">
    <article v-for="article in articles" :key="article.id">
      <template v-if="article.type === 'recipe'">
        <RecipeExcerpt :article="article" />
      </template>

      <template v-else>
        <ArticleExcerpt :article="article" />
      </template>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ArticleExcerpt from '~/components/Article/ArticleExcerpt.vue'
import RecipeExcerpt from '~/components/Recipe/Excerpt.vue'

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleExcerpt,
    RecipeExcerpt
  },
  props: {
    articles: Array
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {}
})
</script>
