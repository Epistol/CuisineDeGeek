import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
import { Configuration } from '@nuxt/types'
import head from './config/head'
import modules from './config/modules'

declare module NuxtConfiguration {
  interface NuxtOptions extends Configuration {
    isArray: any
  }
}

const config: any = {
  mode: 'universal',
  srcDir: 'src/',

  server: {
    port: 8383, // par défaut : 3000
    host: '0.0.0.0' // par défaut : localhost
  },

  generate: {
    fallback: true,
    routes() {
      return axios.get(`${process.env.NUXT_ENV_WORDPRESS_API_URL}/wp-json/wp/v2/recipe`).then(res => {
        return res.data.map((data: any) => {
          return '/' + data.slug
        })
      })
    }
  },

  /*
   ** Headers of the page
   */
  head,

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#f7a072' },
  /*
   ** Global CSS
   */
  css: ['~assets/scss/tailwind.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/composition', '~/plugins/disqus'],
  modules,

  'google-adsense': {
    id: 'ca-pub-3386226072112083'
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-56116805-1'
      }
    ],
    '@aceforth/nuxt-netlify'
  ],
  /*
   ** Nuxt.js modules
   */

  sitemap: {
    hostname: 'https://cuisinedegeek.com',
    gzip: true,
    path: '/sitemap.xml'
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
      target: 'https://cuisinedegeek.us17.list-manage.com/subscribe/post?u=ab342c65399cf46191cfe0ac8&amp;id=78d555f792m'
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
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: '#413F47'
        },
        light: {
          background: '#f8f8f8',
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: { icons: 'fa' }
  },

  purgeCSS: {
    paths: ['components/**/*.vue', 'layouts/**/*.vue', 'pages/**/*.vue']
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config: any, ctx: any) {}
  }
}

export default config
