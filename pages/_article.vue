<template>
  <Article :data="article" type="article" />
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import Article from '~/components/ArticlePage.vue'

export default defineComponent({
  name: 'FooterMenu',
  props: {
    articleSlug: {
      default: ''
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { getArticleData } = usePosts({ ctx })
    let articleData = reactive({})

    onMounted(async () => {
      articleData = await getArticleData(props.articleSlug) // fetch main product
    })

    return {}
  }
})
</script>

