<template>
  <div>
    <v-img
      :class="propClasses"
      v-if="propImageLink"
      :height="propHeight"
      :alt="propImageLink.alt_text"
      :src="searchResult.source_url"
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
    const globalState = reactive({ searchResult: {} })

    const propImageLink = computed(() => props.imageLink)
    const propClasses = computed(() => props.classProp)
    const propHeight = computed(() => props.height)

    const loadFullDataset = async (val: any) => {
      // We need to load the data from the value passed, call api, then return the api data
      const { data } = await ctx.root.$axios.get(val)
      globalState.searchResult = data
    }

    onMounted(async () => {
      await loadFullDataset(propImageLink.value)
    })

    return { propImageLink, propClasses, propHeight, ...toRefs(globalState) }
  }
})
</script>
