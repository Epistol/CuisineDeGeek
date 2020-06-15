<template>
  <div>
    <v-card class="mt-6" shaped style="border-radius: 1rem !important;">
      <v-card-title>{{ $tc('common.recipe.step', steps.length) }}</v-card-title>
      <v-card-text v-if="steps">
        <div v-for="(step, i) in steps" :key="i">
          <h2>{{ $tc('common.recipe.step', steps.length) }} {{ i + 1 }}</h2>
          <p>{{ step.content }}</p>
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
