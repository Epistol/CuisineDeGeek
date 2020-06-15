<template>
  <div>
    <v-card class="mx-auto" shaped style="border-radius: 1rem !important;">
      <v-card-text>
        <p class="display-1 text--primary" v-html="data.title.rendered"></p>
        <div class="text--primary">
          <Metas :data="data"></Metas>
          <div class="content" v-html="data.content.rendered"></div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import Metas from '~/components/Recipe/Metas.vue'

export default defineComponent({
  name: 'TitleCard',
  components: {
    Metas
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
