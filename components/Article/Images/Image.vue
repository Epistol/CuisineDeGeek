<template>
  <div>
    <v-img
      :class="propClasses"
      v-if="propImageLink"
      :height="propHeight"
      :alt="propImageLink.alt_text"
      :src="propImageLink"
    ></v-img>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, computed, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'ArticleImage',
  components: {},
  props: {
    imageLink: String,
    classProp: String,
    height: String
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const propImageLink = computed(() => props.imageLink)
    const propClasses = computed(() => props.classProp)
    const propHeight = computed(() => props.height)

    return { propImageLink, propClasses, propHeight }
  }
})
</script>
