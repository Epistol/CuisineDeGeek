<template>
  <article class="single">
    <v-row class="mb-6">
      <v-col cols="3">
        <!-- <FeaturedImage
          v-if="getFeaturedImage(data, 'large')"
          :article="data"
          :featured-image="getFeaturedImage(data, 'large')"
        />-->

        <v-card class shaped style="border-radius: 1rem !important;">
          <v-img
            v-if="getFeaturedImage(data, 'large')"
            :src="getFeaturedImage(data, 'large').source_url"
            height="200px"
            class="rounded-lg"
          ></v-img>

          <v-card-title>{{ $tc('common.recipe.ingredient', 2) }}</v-card-title>
          <v-card-text v-if="data.acf.ingredients">
            <Ingredients :data="data.acf.ingredients"></Ingredients>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" offset="1">
        <TitleCard :data="data"></TitleCard>
      </v-col>
      <v-col cols="3" offset="1">
        <!-- Widgets -->
      </v-col>
    </v-row>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import FeaturedImage from '~/components/Recipe/FeaturedImage.vue'
import Steps from '~/components/Recipe/Steps.vue'
import Ingredients from '~/components/Recipe/Ingredients.vue'
import TitleCard from '~/components/Recipe/TitleCard.vue'

export default defineComponent({
  name: 'Recipe',
  components: {
    FeaturedImage,
    Steps,
    Ingredients,
    TitleCard
  },
  props: {
    data: Object,
    type: String
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { fetchArticleForUserLang, article } = usePosts({ ctx })
    const slug = ctx.root.$route.params?.article

    const colorAccentStyles = ref<any>(null)

    const getFeaturedImage = (article: any, size: any) => {
      const featuredImage = article._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes[size]
      }
    }

    return { article, getFeaturedImage, colorAccentStyles, slug }
  }
})
</script>
