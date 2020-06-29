<template>
  <div>
    <div v-if="featuredImage.source_url" class>
      <!-- <div class="image-height" :style="{ paddingTop: featuredImageAspectRatio }"></div> -->
      <!-- <img
        :alt="article._embedded['wp:featuredmedia'][0].alt_text"
        :title="article._embedded['wp:featuredmedia'][0].alt_text"
        :data-src="featuredImage.source_url"
        v-lazy-load
        class="rounded-lg"
      />-->
      <!-- <div class="featured-image-padding" :style="{ paddingTop: featuredImageAspectRatio }"></div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'

export default defineComponent({
  name: 'RecipeFeaturedImage',
  components: {},
  props: {
    article: Object,
    expanded: Boolean,
    featuredImage: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const featuredImageAspectRatio = computed(() => {
      if (props.featuredImage) {
        return (props.featuredImage.height / props.featuredImage.width) * 100 + '%'
      }
      return null
    })

    return { featuredImageAspectRatio }
  }
})
</script>
