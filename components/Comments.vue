<template>
  <v-layout class="comment-box">
    <v-container>
      <VueDisqus shortname="cdg-site" :identifier="`cdg-site`" :url="url"></VueDisqus>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'Comments',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const url = computed(() => window.location.href)
    return { url }
  }
})
</script>
