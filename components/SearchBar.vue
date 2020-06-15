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
            @keydown.enter="search.value ? redirectToRecipe(search.value) : ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="absolute z-10 w-1/4 pt-2" v-if="items.length && search">
        <v-expand-transition>
          <v-list v-if="items.length && search" class="absolute text-black shadow white lighten-3" v-cloak>
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

    const items = computed(() => {
      return searchResults.value
      // return searchResults.value.map((entry: any) => {
      //   console.log('items -> entry', entry)
      //   const Description =
      //     entry.title.length > descriptionLimit ? entry.title.slice(0, descriptionLimit) + '...' : entry.title

      //   return Object.assign({}, entry, { Description })
      // })
    })

    const selectedResultLocal = computed(() => {
      return selectedResult.value
    })

    const searchItems = (subtype: string) => {
      // Items have already been requested
      console.info('val')
      if (fetching.value) return

      // Lazily load input items
      fetchSearchResults(0, search.value, 'post', subtype)
    }

    const debouncedInput = debounce(searchItems, 370)

    const setItemClick = (val: any) => {
      setSelectedResult(items.value[val])
      search.value = selectedResultLocal.value.title
      console.log('setItemClick -> selectedResultLocal', selectedResultLocal.value)
      emptySearchResults()
      // Now redirect to the item
      redirectToRecipe(selectedResultLocal.value.title)
    }

    const redirectToRecipe = (val: any) => {
      console.log('redirectToRecipe', val)
      ctx.root.$router.push(val)
    }

    return { descriptionLimit, searchResults, entries, search, items, debouncedInput, setItemClick, redirectToRecipe }
  }
})
</script>
