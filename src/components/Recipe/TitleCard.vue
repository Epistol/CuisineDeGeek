<template>
  <div>
    <v-card class="mx-auto" shaped style="border-radius: 1rem !important;">
      <v-card-text>
        <h1 class="mb-6 text-center" v-html="data.title.rendered"></h1>
        <div class="text--primary">
          <Metas :data="data"></Metas>
          <!-- Times -->
          <TimePills :article="data" class="pt-4"></TimePills>
          <div class="content" v-html="data.content.rendered"></div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import Metas from '~/components/Recipe/Metas.vue'
import TimePills from '~/components/Recipe/TimePills.vue'

export default defineComponent({
  name: 'TitleCard',
  components: {
    Metas,
    TimePills
  },
  props: {
    data: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const difficulties = ['Simple', 'Medium', 'Difficult']

    return { difficulties }
  }
})
</script>
