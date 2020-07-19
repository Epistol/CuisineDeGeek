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
      { hid: 'description', name: 'description', content: siteTitle || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
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
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
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
