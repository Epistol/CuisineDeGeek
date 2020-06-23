<template>
  <div v-if="propArticle">
    {{propArticle._links}}
    <v-container>
      <v-row no-gutters class="shadow">
        <v-col v-if="propArticle._links" cols="3" class="rounded-md">
          <ArticleImage :imageLink="propArticle._links['wp:featuredmedia'][0].href" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, computed, onMounted } from '@vue/composition-api'
import ArticleImage from '~/components/Article/Images/Image.vue'
export default defineComponent({
  name: 'ArticleExcerpt',
  components: { ArticleImage },
  props: {
    article: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const propArticle = computed(() => props.article)
    console.log('setup -> propArticle', propArticle)

    return { propArticle }
  }
})
</script>
