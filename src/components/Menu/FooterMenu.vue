<template>
  <v-bottom-navigation v-model="bottomNav" :absolute="true" :fixed="true">
    <v-btn value="recipes" href="/">
      <span>Recipes</span>
      <v-icon>fa-utensils</v-icon>
    </v-btn>

    <v-btn value="search" href="https://cuisinedegeek.com/shop">
      <span>Shop</span>
      <v-icon>fas fa-shopping-cart</v-icon>
    </v-btn>

    <!-- <v-btn value="universes">
      <span>Universes</span>
      <v-icon>fa-hat-wizard</v-icon>
    </v-btn>-->
  </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'FooterMenu',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const bottomNav = ref<string>('recipes')
    return { bottomNav }
  }
})
</script>
