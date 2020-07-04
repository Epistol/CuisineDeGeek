<template>
  <v-card shaped style="border-radius: 1rem !important" class="mb-8">
    <template>
      <v-card-title class="font-weight-bold">{{ $t('common.ads.shop') }}</v-card-title>
      <v-card-text style="min-height:200px;min-width:100px">
        <v-carousel
          cycle
          interval="12000"
          height="500"
          hide-delimiter-background
          show-arrows-on-hover
          v-if="slides"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            :href="'https://shop.cuisinedegeek.com/'"
            transition="fade-transition"
          >
            <span v-html="slide"></span>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref, toRefs } from '@vue/composition-api'
import useShopProducts from '~/composables/use-shop-products'
import { ChildShirt } from '~/components/Widgets/Carousel/ChildShirt'
export default defineComponent({
  name: 'CarouselShop',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { products, fetchProductsList } = useShopProducts({ ctx })
    const slides = ["<div id='product-component-1593884402239'></div>"]

    onMounted(async () => {
      ChildShirt()
    })

    return {
      slides
    }
  }
})
</script>
