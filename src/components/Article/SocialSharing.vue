<template>
  <v-btn :href="getNetworkParams().url" tile icon :color="getNetworkParams().color" target="_blank">
    <v-icon>{{getNetworkParams().icon}}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'SocialSharing',
  props: {
    networkSelected: {
      type: String,
      default: ''
    },
    articleTitle: {
      type: String,
      default: ''
    },
    articleMedia: {
      type: String,
      default: ''
    },
    articleExcerpt: {
      type: String,
      default: ''
    }
  },
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

    const propSelectedNetwork = computed(() => props.networkSelected)
    const propArticleMedia = computed(() => props.articleMedia)
    const propArticleExcerpt = computed(() =>
      props?.articleExcerpt.replace(/<[^>]+>/g, '')
    )

    const networksParams: any = {
      facebook: {
        color: '#1778f2',
        url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&title=${props.articleTitle}&description=${propArticleExcerpt.value}`,
        icon: 'fab fa-facebook'
      },
      pinterest: {
        color: '#e60023',
        url: `https://pinterest.com/pin/create/button/?url=${window.location.href}&media=${propArticleMedia.value}&description=${propArticleExcerpt.value}`,
        icon: 'fab fa-pinterest'
      },
      email: {
        color: '#000',
        url: `mailto:?subject=${props.articleTitle}&body=${window.location.href}%0D%0A${propArticleExcerpt.value}`,
        icon: 'far fa-envelope'
      },
      twitter: {
        color: '#1da1f2',
        url: `https://twitter.com/intent/tweet?text=${props.articleTitle}&url=${window.location.href}&via=CuisineDeGeek`,
        icon: 'fab fa-twitter'
      }
    }

    const getNetworkParams = () => {
      if (propSelectedNetwork.value) {
        return networksParams[propSelectedNetwork.value]
      }
      return {}
    }

    return { themeColor, getNetworkParams, propSelectedNetwork }
  }
})
</script>
