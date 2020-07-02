<template>
  <v-app :dark="goDark">
    <header class="toolbar">
      <v-container>
        <v-row align="center" justify="center">
          <v-col align="center" justify="center" class="items-center justify-center hidden-sm-and-down" cols="3" sm="0">
            <nuxt-link :to="`/`">
              <v-btn text>
                <v-icon left color="white">fa-utensils</v-icon>
                <span class="menu-text">{{ $t('common.menu.recipe') }}</span>
              </v-btn>
            </nuxt-link>
            <nuxt-link :to="`/`">
              <v-btn text>
                <v-icon left color="white">fas fa-hat-wizard</v-icon>
                <span class="menu-text">{{ $t('common.menu.universe') }}</span>
              </v-btn>
            </nuxt-link>
          </v-col>
          <v-col :lg="6" :md="6" :sm="12" align="center" justify="center">
            <nuxt-link :to="`/`">
              <img data-src="/logo.svg" v-lazy-load :alt="title" />
            </nuxt-link>
            <SearchBar></SearchBar>
          </v-col>
          <v-col
            cols="3"
            align="center"
            justify="center"
            id="social"
            class="items-center justify-center hidden-sm-and-down"
            sm="0"
          >
            <v-btn text href="https://cuisinedegeek.com/shop">
              <v-icon left color="white">fas fa-shopping-cart</v-icon>
              <span class="menu-text">{{ $t('common.menu.shop') }}</span>
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
    <v-main>
      <v-container>
        <v-row class="mt-6 mb-6">
          <v-col :lg="7" :md="7" :sm="12">
            <nuxt />
          </v-col>
          <v-col :lg="4" :md="4" :sm="12" offset-md="1" :offset-sm="0" class="sm:mb-8">
            <!-- Widgets -->
            <carousel-shop></carousel-shop>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer :fixed="true" app class="hidden-md-and-up">
      <footerMenu></footerMenu>
    </v-footer>
    <v-footer class="hidden-sm-and-down">
      <LangSwitcher></LangSwitcher>
      <!-- <client-only>
        <Cookies />
      </client-only>-->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from '@vue/composition-api'
import footerMenu from '~/components/Menu/FooterMenu.vue'
import LangSwitcher from '~/components/Menu/LangSwitcher.vue'
import SearchBar from '~/components/SearchBar.vue'
import Cookies from '~/components/Cookies.vue'
import CarouselShop from '~/components/Widgets/CarouselShop.vue'

export default defineComponent({
  name: 'ContentLayout',
  components: {
    footerMenu,
    SearchBar,
    LangSwitcher,
    Cookies,
    CarouselShop
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    let goDark = ref<boolean>(false)
    const locale = computed(() => ctx.root.$i18n.locale)
    watch(goDark, (value, prevValue) => {
      ctx.root.$vuetify.theme.dark = value
    })

    const title = ref('Cuisine De Geek')
    return {
      title,
      goDark,
      locale
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
