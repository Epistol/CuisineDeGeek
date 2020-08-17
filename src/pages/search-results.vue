<template>
  <div>
    <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        cache-items
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="id"
        label="Search"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
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

<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),

  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    items() {
      return this.entries.map(entry => {
        const Description =
          entry.title.length > this.descriptionLimit ? entry.title.slice(0, this.descriptionLimit) + '...' : entry.title

        return Object.assign({}, entry, { Description })
      })
    }
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      fetch(`${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/search`)
        .then(res => res.json())
        .then(res => {
          this.entries = res
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
