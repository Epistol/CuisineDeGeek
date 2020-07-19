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

    const loadFullDataset = async (val: any) => {
      // We need to load the data from the value passed, call api, then return the api data
      const { data } = await ctx.root.$axios.get(val)
      return data
    }

    const url = computed(() => window.location.href)

    const getRecipeStructuredData = async () => {
      let structuredData: any = {
        '@context': 'http://schema.org',
        '@type': 'Recipe',
        author: {
          '@type': 'Person',
          name: 'Cuisine De Geek'
        }
      }

      const prepTime = propData.value.acf.preparing_time ? parseFloat(propData.value.acf.preparing_time) : 0
      const cookTime = propData.value.acf.cooking_time ? parseFloat(propData.value.acf.cooking_time) : 0
      const restTime = propData.value.acf.resting_time ? parseFloat(propData.value.acf.resting_time) : 0

      if (propData.value.id) {
        structuredData.name = propData.value.title.rendered ? propData.value.title.rendered : null
        structuredData.datePublished = propData.value.date ? propData.value.date : null
        structuredData.recipeYield = propData.value.acf.servings ? propData.value.acf.servings : null
        structuredData.recipeCategory = propData.value._embedded['wp:term'][0][0].name
          ? propData.value._embedded['wp:term'][0][0].name
          : null
        structuredData.description =
          propData.value.content.rendered && propData.value.content.protected === false
            ? propData.value.content.rendered
            : null

        structuredData.prepTime = 'PT' + prepTime + 'M'
        structuredData.cookTime = 'PT' + cookTime + 'M'
        structuredData.totalTime = 'PT' + (prepTime + cookTime + restTime) + 'M'

        structuredData.keywords = propData.value._embedded['wp:term'][1]
          ? propData.value._embedded['wp:term'][1]
              .map((data: any) => {
                return data.name
              })
              .join(', ')
          : null

        structuredData.recipeIngredient = propData.value.acf.ingredients
          ? propData.value.acf.ingredients.map((data: any) => {
              return data.quantity + ' ' + data.name
            })
          : null

        structuredData.recipeInstructions = propData.value.acf.steps
          ? propData.value.acf.steps.map((data: any, index: number) => {
              return {
                '@type': 'HowToStep',
                text: data.content,
                url: url.value + '#step' + (index + 1)
              }
            })
          : null
      }

      if (propData.value._links) {
        const recipePictures = await loadFullDataset(propData.value._links['wp:featuredmedia'][0].href)
        if (recipePictures) {
          structuredData.image = [recipePictures.source_url]
        }
      }

      console.log('getRecipeStructuredData -> structuredData', structuredData)
      return structuredData
    }

    return { propData, getRecipeStructuredData, loadFullDataset }
  }
})
</script>
