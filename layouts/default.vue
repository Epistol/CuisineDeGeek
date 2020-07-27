<template>
  <v-app :dark="goDark">
    <header class="toolbar">
      <v-container>
        <v-row align="center" justify="center">
          <v-col
            align="center"
            justify="center"
            class="items-center justify-center hidden-sm-and-down"
            cols="3"
            sm="0"
          >
            <nuxt-link :to="slugUrl()">
              <v-btn text>
                <v-icon left color="white">fa-utensils</v-icon>
                <span class="menu-text">{{ $t('common.menu.recipe') }}</span>
              </v-btn>
            </nuxt-link>
            <!-- <nuxt-link :to="slugUrl()">
              <v-btn text>
                <v-icon left color="white">fas fa-hat-wizard</v-icon>
                <span class="menu-text">{{ $t('common.menu.universe') }}</span>
              </v-btn>
            </nuxt-link>-->
            <v-btn text href="https://cuisinedegeek.com/shop">
              <v-icon left color="white">fas fa-shopping-cart</v-icon>
              <span class="menu-text">{{ $t('common.menu.shop') }}</span>
            </v-btn>
          </v-col>
          <v-col :lg="6" :md="6" :sm="12" align="center" justify="center">
            <nuxt-link :to="slugUrl()">
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
          <v-col :lg="4" :md="4" :sm="12" offset-md="1" :offset-sm="0" class>
            <!-- Widgets -->
            <carousel-shop></carousel-shop>
            <adsense></adsense>
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
import Adsense from '~/components/Widgets/Adsense.vue'

export default defineComponent({
  name: 'ContentLayout',
  components: {
    footerMenu,
    SearchBar,
    LangSwitcher,
    Cookies,
    CarouselShop,
    Adsense
  },
  head() {
    return {
      meta: [
        { name: 'og:locale', content: this.locale, hid: 'og:locale' },
        { hid: 'description', name: 'description', content: this.description || 'Cuisine De Geek' },
        { hid: 'og:description', name: 'og:description', content: this.description || 'Cuisine De Geek' },
        { hid: 'twitter:description', name: 'twitter:description', content: this.description || 'Cuisine De Geek' },
        { hid: 'og:image', name: 'og:image', content: this.ogImage },
        { hid: 'twitter:url', name: 'twitter:url', content: this.url }
      ]
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    let goDark = ref<boolean>(false)
    const locale = computed(() => ctx.root.$i18n.locale)
    watch(goDark, (value, prevValue) => {
      ctx.root.$vuetify.theme.dark = value
    })

    const description = ctx.root.$i18n.t('common.meta.description')
    const ogImage = process.env.BASE_URL + '/ogimage.png'

    const title = ref('Cuisine De Geek')
    const url = computed(() => window.location.href)

    const slugUrl = () => {
      const Cookie = process.client ? require('js-cookie') : undefined
      const cookieLang = process.client ? (Cookie.get('i18n_redirected') ? Cookie.get('i18n_redirected') : null) : null

      let slugUrl = null

      if (cookieLang && cookieLang !== ctx.root.$i18n.defaultLocale) {
        slugUrl = '/' + cookieLang
      } else {
        slugUrl = '/'
      }
      return slugUrl
    }

    return {
      title,
      goDark,
      locale,
      slugUrl,
      description,
      url
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
