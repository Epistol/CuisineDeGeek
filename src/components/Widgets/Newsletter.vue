<template>
  <div>
    <!-- Begin Mailchimp Signup Form -->
    <div id="mc_embed_signup">
      <form @submit.prevent="sendMail()">
        <div id="mc_embed_signup_scroll">
          <label for="mce-EMAIL">{{ $t('common.subscribe') }}</label>
          <input
            type="email"
            v-model="email"
            name="EMAIL"
            class="block w-full px-4 py-2 leading-normal bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline"
            id="mce-EMAIL"
            placeholder="email address"
            required
          />
          <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true">
            <input type="text" name="b_ab342c65399cf46191cfe0ac8_78d555f792" tabindex="-1" value />
          </div>
          <div class="clear">
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            />
          </div>
        </div>
      </form>
    </div>

    <!--End mc_embed_signup-->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Newsletter',

  components: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const email = ref<String>(null)

    const sendMail = async () => {
      // We need to load the data from the value passed, call api, then return the api data
      await ctx.root.$axios.post('/api/newsletter/subscribe', {
        email: email.value
      })
      alert('User added')
    }
    onMounted(async () => {})

    return { sendMail, email }
  }
})
</script>

