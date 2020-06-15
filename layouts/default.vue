<template>
  <v-app :dark="goDark">
    <header class="toolbar">
      <v-container>
        <v-row>
          <v-col>
            <nuxt-link :to="`/`" class="text-white">
              <v-icon>far fa-file-alt</v-icon>Recettes
            </nuxt-link>
          </v-col>
          <v-col>
            <nuxt-link :to="`/`">
              <img data-src="/logo.svg" v-lazy-load :alt="title" />
            </nuxt-link>
            <SearchBar></SearchBar>
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
    </header>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="true" app>
      <footerMenu></footerMenu>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import footerMenu from '~/components/Menu/FooterMenu.vue'
import SearchBar from '~/components/SearchBar.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    footerMenu,
    SearchBar
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    let goDark = ref<boolean>(false)
    watch(goDark, (value, prevValue) => {
      ctx.root.$vuetify.theme.dark = value
    })

    const title = ref('Cuisine De Geek')
    return {
      title,
      goDark
    }
  }
})
</script>

<style scoped>
.toolbar {
  background: #f7a072;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
}
</style>
