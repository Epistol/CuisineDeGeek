<template>
  <script v-html="getRecipeStructuredData()" type="application/ld+json"></script>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'StructuredData',
  props: {
    data: Object
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const propData: any = computed(() => props.data)

    const getRecipeStructuredData = () => {
      let structuredData: any = {
        '@context': 'http://schema.org',
        '@type': 'Recipe'
      }
      if (propData.value.id) {
        if (propData.value.title.rendered) {
          structuredData.name = propData.value.title.rendered
        }
      }
      console.log('getRecipeStructuredData -> structuredData', structuredData)
      return structuredData
    }

    return { propData, getRecipeStructuredData }
  }
})
</script>
