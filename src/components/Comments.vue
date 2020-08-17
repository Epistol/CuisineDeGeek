<template>
  <v-layout class="mt-12">
    <v-container>
      <v-card shaped style="border-radius: 1rem !important;">
        <h2 class="m-4 text-2xl font-bold text-center">{{ $t('common.comments') }}</h2>
        <v-card-text>
          <Disqus shortname="cdg-site" :identifier="`cdg-site`" :url="url"></Disqus>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
// @ts-ignore
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
