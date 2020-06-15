<template>
  <v-app :dark="goDark">
    <header class="toolbar">
      <v-container>
        <v-row>
          <v-col class="flex items-center justify-center" cols="3">
            <nuxt-link :to="`/`">
              <v-btn text>
                <v-icon left color="white">far fa-file-alt</v-icon>
                <span class="text-white">{{ $t('common.menu.recipe') }}</span>
              </v-btn>
            </nuxt-link>
            <nuxt-link :to="`/`">
              <v-btn text>
                <v-icon left color="white">fas fa-hat-wizard</v-icon>
                <span class="text-white">{{ $t('common.menu.universe') }}</span>
              </v-btn>
            </nuxt-link>
          </v-col>
          <v-col cols="6">
            <nuxt-link :to="`/`">
              <img data-src="/logo.svg" v-lazy-load :alt="title" />
            </nuxt-link>
            <SearchBar></SearchBar>
          </v-col>
          <v-col cols="3" id="social" class="flex items-center justify-center">
            <v-btn text href="https://cuisinedegeek.com/shop">
              <v-icon left color="white">fas fa-shopping-cart</v-icon>
              <span class="text-white">{{ $t('common.menu.shop') }}</span>
            </v-btn>
            <v-btn icon color="white" :href="`https://www.facebook.com/Cuisine2Geek`">
              <v-icon>fab fa-facebook</v-icon>
            </v-btn>
            <v-btn icon color="white" :href="`https://www.instagram.com/cuisinedegeek`">
              <v-icon>fab fa-instagram</v-icon>
            </v-btn>
            <v-btn icon color="white" :href="`https://twitter.com/CuisineDeGeek`">
              <v-icon>fab fa-twitter</v-icon>
            </v-btn>
          </v-col>
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
