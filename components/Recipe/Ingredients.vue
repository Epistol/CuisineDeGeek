<template>
  <div>
    <v-checkbox
      v-for="(ingredient,i) in data"
      :key="i"
      :label="`${ingredient.quantity} ${ingredient.name}`"
    ></v-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'Ingredients',
  components: {},
  props: {
    data: Array
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  }
})
</script>
