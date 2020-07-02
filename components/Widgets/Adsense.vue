<template>
  <v-card class shaped style="border-radius: 1rem !important">
    <template>
      <v-card-title class="font-weight-bold">{{ $t('common.ads.title') }}</v-card-title>
      <v-card-text style="min-height:150px;min-width:150px">
        <adsbygoogle />
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
