<template>
  <v-btn :href="url" tile icon color="#1778f2" target="_blank">
    <v-icon>fab fa-facebook</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'SocialSharing',
  props: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    let themeColor = ref<string>('light')
    watch(themeColor, (value, prevValue) => {
      if (ctx.root.$vuetify.theme.dark === true) {
        value = 'dark'
      } else {
        value = 'light'
      }
    })

    const networksParams = {
      facebook: {
        color: '#1778f2',
        url:
          'https://www.facebook.com/sharer/sharer.php?u=@u&title=@t&description=@d&quote=@q&hashtag=@h'
      }
    }

    const url = window.location.href

    return { themeColor, url }
  }
})
</script>
