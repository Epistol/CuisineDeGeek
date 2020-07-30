const siteTitle = 'Cuisine De Geek'

export default {
  title: siteTitle || '',
  titleTemplate: '%s - ' + siteTitle,
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
    { hid: 'twitter:description', name: 'twitter:description', content: siteTitle }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/ogimage.png' },
    { rel: 'apple-touch-startup-image', href: '/ogimage.png' },
    { rel: 'alternate', hreflang: 'fr', href: '/fr' },
    { rel: 'alternate', hreflang: 'ja', href: '/ja' },
    { rel: 'me', href: 'mailto:contact@cuisinedegeek.com' }
  ]
}
