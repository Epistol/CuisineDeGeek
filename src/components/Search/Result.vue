<template>
  <div v-if="searchResult">
    <ArticleExcerpt :article="searchResult" :key="searchResult.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, computed, onMounted } from '@vue/composition-api'
import ArticleList from '~/components/Article/ArticleList.vue'
import ArticleExcerpt from '~/components/Article/ArticleExcerpt.vue'

export default defineComponent({
  name: 'SearchResult',
  components: {
    ArticleList,
    ArticleExcerpt
  },
  props: {
    item: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const propItem = computed(() => props.item)
    const globalState = reactive({ searchResult: {} })

    // Now with the data passed, we can easily make our call to load the full dataset

    const loadFullDataset = async () => {
      // We need to load the data from the value passed, call api, then return the api data
      const { data } = await ctx.root.$axios.get(
        `${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/recipe/${propItem?.value?.id}`
      )
      globalState.searchResult = data
    }

    onMounted(async () => {
      if (propItem.value) {
        await loadFullDataset()
      }
      // propItem.value need to be watched
    })

    return { propItem, ...toRefs(globalState) }
  }
})
</script>
