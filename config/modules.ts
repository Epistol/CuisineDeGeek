export interface NuxtLazyLoad {
  [0]: 'nuxt-lazy-load'
  [1]?: {
    directiveOnly?: boolean
  }
}

export default [
  '@nuxtjs/axios',
  '@nuxtjs/pwa',
  'cookie-universal-nuxt',
  '@nuxtjs/dotenv',
  '@nuxtjs/google-adsense',
  [
    'nuxt-lazy-load',
    {
      directiveOnly: true
    }
  ] as NuxtLazyLoad,
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
  '@nuxtjs/sitemap'
]
