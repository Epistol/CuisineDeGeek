<template>
  <div>
    <v-card-text style="padding:0px!important">
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12">
          <v-text-field
            label="Search"
            solo
            rounded
            hide-details
            append-icon="fas fa-search"
            v-model="search"
            flat
            @input="debouncedInput('recipe')"
            @change="redirectToSearchResults"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="absolute z-10 w-1/4 pt-2" v-if="items.length && search">
        <v-expand-transition>
          <v-list
            v-if="items.length && search"
            class="absolute text-black shadow white lighten-3"
            v-cloak
          >
            <v-list-item v-for="(item, i) in items" :key="i" @click="setItemClick(i)">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <!-- <v-list-item-subtitle v-text="item.key"></v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expand-transition>
      </div>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from '@vue/composition-api'
import useSearch from '~/composables/use-search'
import { debounce } from 'ts-debounce'

export default defineComponent({
  name: 'SearchBar',
  components: {},
  props: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const descriptionLimit = 60
    let entries: any = []
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

    const selectedResultLocal = computed(() => selectedResult.value)

    const searchItems = (subtype: string) => {
      // Items have already been requested
      if (fetching.value) return

      // Lazily load input items
      fetchSearchResults(0, search.value, 'post', subtype)
    }

    const debouncedInput = debounce(searchItems, 370)

    const setItemClick = (val: any) => {
      setSelectedResult(items.value[val])
      search.value = selectedResultLocal.value
      console.log('setItemClick -> selectedResultLocal', selectedResultLocal.value)
      emptySearchResults()
      // Now redirect to the item
      // redirectToRecipe(selectedResultLocal.value.title)
    }

    const redirectToRecipe = (val: any) => {
      ctx.root.$router.push(val)
    }

    const redirectToSearchResults = (val: any) => {
      ctx.root.$router.push(val)
    }

    return {
      descriptionLimit,
      searchResults,
      entries,
      search,
      items,
      debouncedInput,
      setItemClick,
      redirectToRecipe,
      redirectToSearchResults
    }
  }
})
</script>
