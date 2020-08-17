<template>
  <div>
    <v-dialog v-model="dialog" max-width="1200">
      <template v-slot:activator="{ on, attrs }">
        <v-img
          v-if="getFeaturedImage(propData, 'full')"
          :src="getFeaturedImage(propData, 'full').source_url"
          height="200px"
          class="rounded-lg cursor-pointer"
          v-bind="attrs"
          v-on="on"
        ></v-img>
      </template>

      <v-card>
        <v-img
          v-if="getFeaturedImage(propData, 'full')"
          :src="getFeaturedImage(propData, 'full').source_url"
          class="rounded-lg"
        ></v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, computed } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'

export default defineComponent({
  name: 'Rimage',
  props: {
    data: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    // @ts-ignore
    const propData = computed(() => props.data)
    const dialog = false

    const getFeaturedImage = (recipe: any, size: any) => {
      let featuredImage = null
      featuredImage = recipe._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes[size]
      }
    }

    return { getFeaturedImage, propData, dialog }
  }
})
</script>
