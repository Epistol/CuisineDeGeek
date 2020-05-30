<template>
  <v-app :dark="goDark">
    <v-app-bar :clipped-left="true" fixed app>
      <nuxt-link :to="`/`">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
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

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    footerMenu
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
