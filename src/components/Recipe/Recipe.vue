<template>
  <article class="single" v-if="propData">
    <v-row class>
      <v-col :lg="4" :md="4" :sm="12">
        <v-card class shaped style="border-radius: 1rem !important;">
          <Rimage :data="propData"></Rimage>
          <template v-if="propData.acf" id="ingredients">
            <v-card-title class="font-weight-bold">{{ $tc('common.recipe.ingredient', 2) }}</v-card-title>
            <v-card-text>
              <Ingredients :data="propData.acf.ingredients"></Ingredients>
            </v-card-text>
          </template>
        </v-card>
      </v-col>
      <v-col :lg="7" :md="7" :sm="12" offset-xs="0" offset-md="1">
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
import Rimage from '~/components/Recipe/Rimage.vue'

export default defineComponent({
  name: 'Recipe',
  components: {
    FeaturedImage,
    Steps,
    Ingredients,
    TitleCard,
    Comments,
    Rimage
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
