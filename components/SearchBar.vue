<template>
  <div>
    <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input="search"
        @update:search-input="val => search = val"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="id"
        label="Search"
        placeholder="Start typing to Search"
        prepend-icon="fas fa-search"
        return-object
      ></v-autocomplete>
      <!-- @select="loadArticle()" -->
    </v-card-text>
    <!-- <v-divider></v-divider> -->
    <!-- <v-expand-transition>
      <v-list v-if="model" class="red lighten-3">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from '@vue/composition-api'
import useSearch from '~/composables/use-search'

export default defineComponent({
  name: 'ArticleList',
  components: {},
  props: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const descriptionLimit = 60
    let entries: any = []
    let isLoading = ref<boolean>(false)
    let model: any = ref<any>(null)
    const search = ref<any>(null)
    const { fetchSearchResults, searchResults } = useSearch({ ctx })

    const items = computed(() => {
      return entries.map((entry: any) => {
        console.log('items -> entry', entry)
        const Description =
          entry.title.length > descriptionLimit ? entry.title.slice(0, descriptionLimit) + '...' : entry.title

        return Object.assign({}, entry, { Description })
      })
    })

    const watchSearch = (val: any) => {
      console.log('watchSearch -> val', val)
      // Items have already been loaded
      if (items.value.length > 0) return

      // Items have already been requested
      if (isLoading.value) return

      isLoading.value = true
      console.log('passed is loaded watchSearch')

      // Lazily load input items
      fetchSearchResults(0, val)
      entries = searchResults.value
      console.log('watchSearch -> searchResults', searchResults)
      isLoading.value = false
    }

    watch(() => search, watchSearch)

    return { descriptionLimit, entries, isLoading, model, search, watchSearch, items }
  }
})
</script>
