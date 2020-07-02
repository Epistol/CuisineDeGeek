<template>
  <v-card shaped style="border-radius: 1rem !important" class="mb-8">
    <template>
      <v-card-title class="font-weight-bold">{{ $t('common.ads.title') }}</v-card-title>
      <v-card-text style="min-height:150px;min-width:150px">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- CDG-SIDEBAR -->
        <ins
          class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-3386226072112083"
          data-ad-slot="9559436534"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>
          ;(adsbygoogle = window.adsbygoogle || []).push({})
        </script>
      </v-card-text>
    </template>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'Adsense',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  }
})
</script>
