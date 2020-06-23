<template>
  <div class="home">
    <div class="articles">
      <h1 class="text-xl">
        {{ $t('common.search.title') }}
        <span class="italic">{{query}}</span>
      </h1>
      <div class="absolute z-10 w-1/4 pt-2" v-if="items.length && query">
        <template v-for="(item,i) in items">
          <Result :item="item" :key="i" />
        </template>
        <!-- <ArticleList :articles="items" v-if="items.length" /> -->
      </div>
    </div>
    <!-- <TheSidebar /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import useSearch from '~/composables/use-search'
import ArticleList from '~/components/Article/ArticleList.vue'
import Result from '~/components/Article/Result.vue'

export default defineComponent({
  name: 'SearchResults',
  components: {
    ArticleList,
    Result
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const query = computed(() => (ctx.root.$route.query.query ? ctx.root.$route.query.query : ''))

    let entries: any = []
    let test = ref<any>(null)
    const search = ref<any>(null)
    const {
      fetchSearchResults,
      searchResults,
      fetching,
      emptySearchResults,
      setSelectedResult,
      selectedResult
    } = useSearch({ ctx })

    const items = computed(() => searchResults.value)

    const getSearchResults = async (subtype: string) => {
      // Items have already been requested
      if (fetching.value) return
      if (query.value !== null) {
        // Lazily load input items
        fetchSearchResults(0, query.value, 'post', subtype)
        console.info('searchResults', searchResults)
      }
    }

    onMounted(async () => {
      await getSearchResults('recipe')
    })

    return { query, getSearchResults, items, test }
  }
})
</script>
