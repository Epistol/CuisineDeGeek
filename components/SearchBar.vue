<template>
  <div>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="9" sm="9" md="6">
          <v-text-field
            label="Search"
            solo
            rounded
            append-icon="fas fa-search"
            v-model="search"
            @input="debouncedInput()"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- @select="loadArticle()" -->
    </v-card-text>
    <v-divider v-if="fields.length"></v-divider>
    <v-expand-transition>
      <v-list v-if="model" class="red lighten-3">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from '@vue/composition-api'
import useSearch from '~/composables/use-search'
import { debounce } from 'ts-debounce'

export default defineComponent({
  name: 'ArticleList',
  components: {},
  props: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const descriptionLimit = 60
    let entries: any = []
    let model: any = ref<any>(null)
    const search = ref<any>(null)
    const { fetchSearchResults, searchResults, fetching } = useSearch({ ctx })

    const items = computed(() => {
      return searchResults.value
      // return searchResults.value.map((entry: any) => {
      //   console.log('items -> entry', entry)
      //   const Description =
      //     entry.title.length > descriptionLimit ? entry.title.slice(0, descriptionLimit) + '...' : entry.title

      //   return Object.assign({}, entry, { Description })
      // })
    })

    const fields = computed(() => {
      if (!model) return []

      return Object.keys(model).map(key => {
        return {
          key,
          value: model[key] || 'n/a'
        }
      })
    })

    const searchItems = (val: any) => {
      // Items have already been loaded
      console.log('searchItems -> searchItems', searchItems)
      if (searchItems.length) return

      // Items have already been requested
      if (fetching.value) return

      // Lazily load input items
      fetchSearchResults(0, val)
      console.log('searchItems -> entries', entries)
    }
    const debouncedInput = debounce(searchItems, 370)

    return { descriptionLimit, entries, model, search, items, fields, debouncedInput }
  }
})
</script>
