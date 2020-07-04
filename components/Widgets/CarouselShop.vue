<template>
  <v-card shaped style="border-radius: 1rem !important" class="mb-10">
    <template>
      <v-card-title class="font-weight-bold">{{ $t('common.ads.shop') }}</v-card-title>
      <v-card-text style="min-height:150px;min-width:150px">
        <v-carousel
          cycle
          interval="12000"
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          v-if="products"
        >
          <v-carousel-item
            v-for="(product, i) in products.products"
            :key="i"
            :src="product.image.src"
            :href="'https://shop.cuisinedegeek.com/'"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-card-text>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref, toRefs } from '@vue/composition-api'
import useShopProducts from '~/composables/use-shop-products'

export default defineComponent({
  name: 'CarouselShop',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { products, fetchProductsList } = useShopProducts({ ctx })

    onMounted(async () => {
      await fetchProductsList()
    })

    return {
      products
    }
  }
})
</script>
