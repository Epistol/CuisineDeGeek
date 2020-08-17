<template>
  <div v-if="isOpen" class="cookie">
    <div class="columns has-p-20 is-vcentered">
      <div class="column is-8">
        <p class="has-text-left">{{ message }}</p>
      </div>
      <div class="column has-text-left">
        <button class="button" @click="accept">{{ buttonTextAccept }}</button>
        <button class="button" @click="deny">{{ buttonTextDeny }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'CookieMessage',
  components: {},
  props: {
    buttonTextAccept: {
      type: String,
      default: 'Accept'
    },
    buttonTextDeny: {
      type: String,
      default: 'Deny'
    },
    message: {
      type: String,
      default: 'We use 🍪(Cookies)'
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    let isOpen = ref<boolean>(false)

    const getGDPR = () => {
      if (process.browser) {
        return localStorage.getItem('GDPR:accepted')
      }
    }

    const accept = () => {
      if (process.browser) {
        isOpen.value = false
        localStorage.setItem('GDPR:accepted', 'yes')
        // ctx.root.$gtag.enable()
        // ctx.root.$gtag.page(this.$route.fullPath)
      }
    }

    const deny = () => {
      if (process.browser) {
        isOpen.value = false
        localStorage.setItem('GDPR:accepted', 'no')
        // ctx.root.$gtag.disable()
        // ctx.root.$gtag.page(this.$route.fullPath)
      }
    }

    onMounted(() => {
      if (!getGDPR() === true) {
        isOpen.value = true
      }
    })

    return {
      isOpen,
      accept,
      deny,
      getGDPR
    }
  }
})
</script>

<style lang="scss" scoped>
.cookie {
  z-index: 1;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #f2f2f2;
}
</style>
