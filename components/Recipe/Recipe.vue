<template>
  <article class="single" v-if="propData">
    <v-row class="">
      <v-col cols="4">
        <v-card class shaped style="border-radius: 1rem !important;">
          <v-img
            v-if="getFeaturedImage(propData, 'full')"
            :src="getFeaturedImage(propData, 'full').source_url"
            height="200px"
            class="rounded-lg"
          ></v-img>
          <template v-if="propData.acf" id="ingredients">
            <v-card-title class="font-weight-bold">{{ $tc('common.recipe.ingredient', 2) }}</v-card-title>
            <v-card-text>
              <Ingredients :data="propData.acf.ingredients"></Ingredients>
            </v-card-text>
          </template>
        </v-card>
      </v-col>
      <v-col cols="7" offset="1">
        <TitleCard :data="propData" v-if="propData"></TitleCard>
        <steps v-if="propData" :steps="propData.acf.steps"></steps>
        <comments></comments>
      </v-col>
    </v-row>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, computed } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import FeaturedImage from '~/components/Recipe/FeaturedImage.vue'
import Steps from '~/components/Recipe/Steps.vue'
import Ingredients from '~/components/Recipe/Ingredients.vue'
import TitleCard from '~/components/Recipe/TitleCard.vue'
import Comments from '~/components/Comments.vue'

export default defineComponent({
  name: 'Recipe',
  components: {
    FeaturedImage,
    Steps,
    Ingredients,
    TitleCard,
    Comments
  },
  props: {
    data: Object,
    type: String
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    // @ts-ignore
    const { fetchArticleForUserLang, article } = usePosts({ ctx })
    const slug = ctx.root.$route.params?.article
    const propData = computed(() => props.data)
    const colorAccentStyles = ref<any>(null)

    const getFeaturedImage = (recipe: any, size: any) => {
      let featuredImage = null
      featuredImage = recipe._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes[size]
      }
    }

    return { article, getFeaturedImage, colorAccentStyles, slug, propData }
  }
})
</script>
