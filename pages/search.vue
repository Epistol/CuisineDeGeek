<template>
  <div class="home">
    <div class="articles">
      <h1 class="text-xl">
        {{ $t('common.search.title') }}
        <span class="italic">{{query}}</span>
      </h1>
      <!-- <client-only>
        <InfiniteLoading ref="infiniteLoading" @infinite="moreArticles">
          <span slot="spinner">
            <Spinner1 />
          </span>
          <span slot="no-results">
            <Smile />
            <div>No more articles!</div>
          </span>
          <span slot="no-more">
            <Smile />
            <div>No more articles!</div>
          </span>
        </InfiniteLoading>
      </client-only>-->
    </div>
    <!-- <TheSidebar /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import ArticleList from '~/components/Article/ArticleList.vue'

export default defineComponent({
  name: 'SearchResults',
  components: {
    ArticleList
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const query = computed(() => ctx.root.$route.query.query)

    return { query }
  }
})
</script>
