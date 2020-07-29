import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

const siteTitle = 'Cuisine De Geek'

export default {
  mode: 'universal',

  generate: {
    fallback: true,
    routes() {
      return axios.get(`${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/recipe`)
        .then((res) => {
          return res.data.map((data) => {
            return '/' + data.slug
          })
        })
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + siteTitle,
    title: siteTitle || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#f7a072' },
      { name: 'robots', content: 'index,follow' },
      { name: 'googlebot', content: 'index,follow' },
      // -- OpenGraph --
      { hid: 'og:site_name', name: 'og:site_name', content: siteTitle },
      { hid: 'og:title', name: 'og:title', content: siteTitle },
      { hid: 'theme-color', name: 'theme-color', content: '#f7a072' },
      { hid: 'mobile-web-app-capable', name: 'mobile-web-app-capable', content: 'yes' },
      // -- Twitter --
      { hid: 'twitter:title', name: 'twitter:title', content: siteTitle },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: siteTitle },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@CuisineDeGeek' },
      { hid: 'twitter:description', name: 'twitter:description', content: siteTitle },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/ogimage.png' },
      { rel: 'apple-touch-startup-image', href: '/ogimage.png' },
      { rel: 'alternate', hreflang: 'fr', href: '/fr' },
      { rel: 'alternate', hreflang: 'ja', href: '/ja' },
      { rel: 'me', href: 'mailto:contact@cuisinedegeek.com' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f7a072' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/scss/tailwind.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/composition',
    '~/plugins/disqus',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-analytics', {
      id: 'UA-56116805-1'
    }],
    '@aceforth/nuxt-netlify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-3386226072112083'
    }],
    ['nuxt-lazy-load', {
      directiveOnly: true,
    }],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'en', iso: 'en_US', file: 'en-US.js', name: 'English' },
          { code: 'fr', iso: 'fr-FR', file: 'fr-FR.js', name: 'Français' },
          { code: 'ja', iso: 'ja', file: 'jp-JP.js', name: '日本人' }
        ],
        defaultLocale: 'en',
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true
        },
        lazy: true,
        langDir: 'lang/'
      }
    ],
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    hostname: 'https://cuisinedegeek.com',
    gzip: true,
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  proxy: {
    '/api/newsletter/subscribe': {
      target: 'https://cuisinedegeek.us17.list-manage.com/subscribe/post?u=ab342c65399cf46191cfe0ac8&amp;id=78d555f792m',
    }
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true
      },
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: '#f8f8f8'
        },
        light: {
          background: '#f8f8f8'
        },
      }
    },
    defaultAssets: { icons: 'fa' }
  },


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
