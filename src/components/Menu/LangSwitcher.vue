<template>
  <div>
    <nuxt-link v-for="(locale, i) in availableLocales" :key="i" :to="switchLocalePath(locale.code)" class="mr-4">{{
      locale.name
    }}</nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, computed, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'LangSwitcher',
  components: {},
  props: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    // @ts-ignore
    const availableLocales = computed(() =>
      // @ts-ignore
      ctx.root.$i18n.locales.filter(locale => locale.code !== ctx.root.$i18n.locale)
    )
    return { availableLocales }
  }
})
</script>
