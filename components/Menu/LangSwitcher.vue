<template>
  <div>
    <nuxt-link
      v-for="(locale,i) in availableLocales "
      :key="i"
      :to="switchLocalePath(locale.code)"
    >{{ locale.name }}</nuxt-link>
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
      ctx.root.$i18n.locales.filter(locale => locale.code !== ctx.root.$i18n.locale)
    )
    const changeLocale = async (locale: string) => {
      // ctx.root.$i18n.setLocaleCookie(locale)
      console.log('we entered changeLocale')
      // ctx.root.$router.push(await ctx.root.switchLocalePath(locale))
    }
    return { availableLocales, changeLocale }
  }
})
</script>
