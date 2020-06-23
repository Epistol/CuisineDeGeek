<template>
  <div class="article-list">
    <article v-for="article in articles" :key="article.id">
      <ArticleExcerpt :article="article" />
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import GlobalTimePill from '~/components/Recipe/GlobalTimePill.vue'
import Metas from '~/components/Recipe/Metas.vue'
import SocialSharing from '~/components/Article/SocialSharing.vue'
import ArticleExcerpt from '~/components/Article/ArticleExcerpt.vue'

export default defineComponent({
  name: 'ArticleList',
  components: {
    GlobalTimePill,
    SocialSharing,
    Metas,
    ArticleExcerpt
  },
  props: {
    articles: Array
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {}
})
</script>
