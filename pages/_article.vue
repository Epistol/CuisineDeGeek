<template>
  <div>
    <p>Coucou</p>
    <Article :data="article" v-if="article" type="article" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import Article from '~/components/ArticlePage.vue'

export default defineComponent({
  name: 'PageArticle',
  components: {
    Article
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { fetchArticleForUserLang, article } = usePosts({ ctx })
    const slug = ctx.root.$route.params?.article
    onMounted(async () => {
      await fetchArticleForUserLang(slug)
    })

    return { article }
  }
})
</script>

