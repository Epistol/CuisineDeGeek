<template>
  <v-layout class="comment-box">
    <v-container>
      <Disqus shortname="cdg-site" :identifier="`cdg-site`" :url="url"></Disqus>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from '@vue/composition-api'
import { Disqus } from 'vue-disqus'

export default defineComponent({
  name: 'Comments',
  components: {
    Disqus
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const url = computed(() => window.location.href)
    return { url }
  }
})
</script>
