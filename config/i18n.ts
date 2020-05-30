// import veeValidateFr from 'vee-validate/dist/locale/fr'
import en from '../locales/en'
import fr from '../locales/fr'

export default {
  locales: [{ code: 'en', iso: 'en_US' }, { code: 'fr', iso: 'fr-FR' }],
  defaultLocale: 'en',
  vuex: { syncLocale: true },
  strategy: 'prefix_and_default',
  detectBrowserLanguage: {
    useCookie: true,
    alwaysRedirect: true
  },
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en: {
        ...en,
        // validations: veeValidateFr.messages,
      },
      fr: {
        ...fr,
        // validations: veeValidateFr.messages,
      },
    },
  },
}
