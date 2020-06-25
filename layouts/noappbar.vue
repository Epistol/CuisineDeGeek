<template>
  <v-app :dark="goDark">
    <v-main>
      <nuxt />
    </v-main>
    <v-footer :fixed="true" app>
      <footerMenu></footerMenu>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import footerMenu from '~/components/Menu/FooterMenu.vue'

export default defineComponent({
  name: 'NoAppBarLayout',
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
