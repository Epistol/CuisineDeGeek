<template>
  <div class="w-full">
    <template v-if="article[0]">
      <template v-if="article[0].type !== 'recipe'">
        <Recipe :data="article[0]" v-if="article[0]" type="recipe" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import Recipe from '~/components/Recipe/Recipe.vue'

export default defineComponent({
  name: 'PageArticle',
  components: {
    Recipe
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { fetchArticleForUserLang, article } = usePosts({ ctx })
    const slug = ctx.root.$route.params?.article
    onMounted(async () => {
      await fetchArticleForUserLang({ articleSlug: slug, subcategory: 'recipe' })
    })

    return { article }
  }
})
</script>
