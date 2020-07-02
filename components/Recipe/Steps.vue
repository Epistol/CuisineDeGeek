<template>
  <div class="mt-12">
    <v-card class="mt-6" shaped style="border-radius: 1rem !important;">
      <h2 class="m-4 text-2xl font-bold text-center">{{ $tc('common.recipe.step', steps.length) }}</h2>
      <v-card-text v-if="steps" style="font-size:1rem!important">
        <div v-for="(step, i) in steps" :key="i">
          <span class="font-bold uppercase">{{ $tc('common.recipe.step', steps.length) }} {{ i + 1 }}</span>
          <p class="pt-2 pl-8 font-medium">{{ step.content }}</p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'

export default defineComponent({
  name: 'Steps',
  components: {},
  props: {
    steps: Array
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  }
})
</script>
