<template>
  <div>
    <div v-for="(step, i) in steps" :key="i">
      <p>{{ step.content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'

export default defineComponent({
  name: 'Steps',
  components: {},
  props: {
    steps: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  }
})
</script>
