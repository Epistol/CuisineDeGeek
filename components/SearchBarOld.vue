<template>
  <div>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12">
          <v-autocomplete
            v-model="model"
            :items="recipes"
            item-text="title"
            item-value="id"
            label="Select a recipe..."
            :search-input.sync="search"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, onMounted } from '@vue/composition-api'
import useRecipes from '~/composables/use-recipes'
import { debounce } from 'ts-debounce'

export default defineComponent({
  name: 'ArticleList',
  components: {},
  props: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const model = ref(null)

    const { fetchRecipesResults, recipes } = useRecipes({ ctx })

    const search = () => {
      console.log('entered search function')
      fetchRecipesResults(0, model.value)
    }

    onMounted(async () => {
      if (model.value !== null) {
        await fetchRecipesResults(0, model.value)
      } else {
        await fetchRecipesResults(0, '')
      }
      console.log(recipes)
    })

    // const debouncedInput = debounce(searchResults, 370)

    // const setItemClick = (val: any) => {
    //   setSelectedResult(items.value[val])
    //   search.value = selectedResultLocal.value.title
    //   console.log('setItemClick -> selectedResultLocal', selectedResultLocal.value)
    //   emptySearchResults()
    //   // Now redirect to the item
    // }

    return { fetchRecipesResults, recipes, model, search }
  }
})
</script>

