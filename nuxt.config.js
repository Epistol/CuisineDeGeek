import colors from 'vuetify/es5/util/colors'
const siteTitle = 'Cuisine De Geek'
export default {
  mode: 'universal',
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
          { code: 'fr', iso: 'fr-FR', file: 'fr-FR.js', name: 'Français' }
        ],
        defaultLocale: 'en',
        detectBrowserLanguage: {
          useCookie: true,
        },
        lazy: true,
        langDir: 'lang/'
      }
    ],
    'nuxt-purgecss',
    '@nuxtjs/google-gtag'
  ],
  purgeCSS: {
    mode: 'postcss',
    enabled: (process.env.NODE_ENV === 'production')
  },
  'google-gtag': {
    id: 'UA-56116805-1',
    config: {
      anonymize_ip: true, // anonymize IP
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
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
