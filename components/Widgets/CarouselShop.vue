<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover v-if="products">
    <v-carousel-item v-for="(product, i) in products" :key="i">
      <v-sheet height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">{{ product.image.src }}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
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
      ...toRefs(products)
    }
  }
})
</script>
