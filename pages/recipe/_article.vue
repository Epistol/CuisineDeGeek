<template>
  <div class="w-full">
    <template v-if="article[0]">
      <template v-if="article[0].type === 'recipe'">
        <Recipe :data="article[0]" v-if="article[0]" type="recipe" />
        <StructuredData :data="article[0]" v-if="article[0]"></StructuredData>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import Recipe from '~/components/Recipe/Recipe.vue'
import StructuredData from '~/components/Recipe/StructuredData.vue'

export default defineComponent({
  name: 'PageArticle',
  layout: 'content',
  head() {
    return {
      title: `${this.title}`,
      meta: [
        { name: 'og:title', content: `${this.title}`, hid: 'og:title' },
        { name: 'og:description', content: `${this.title}`, hid: 'og:description' }
      ]
    }
  },

  components: {
    Recipe,
    StructuredData
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { fetchArticleForUserLang, article } = usePosts({ ctx })
    const slug = ctx.root.$route.params?.article
    let title = ref('Cuisine De Geek')

    onMounted(async () => {
      await fetchArticleForUserLang({ articleSlug: slug, subcategory: 'recipe' })
      if (article.value) {
        title.value = article.value[0].title.rendered
      }
    })

    return { article, title }
  }
})
</script>
