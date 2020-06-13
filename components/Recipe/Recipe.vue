<template>
  <article class="single">
    <FeaturedImage
      v-if="getFeaturedImage(data, 'large')"
      :article="data"
      :featured-image="getFeaturedImage(data, 'large')"
    />

    <div class="" :class="{ 'no-featured-image': !getFeaturedImage(data, 'large') }">
      <div class="meta">
        <h1 class="title" v-html="data.title.rendered"></h1>
        <div class="details">
          <div class="flex-auto" id="infos">
            <!-- Time -->
            <global-time-pill :article="data"></global-time-pill>
            <!-- Servings -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="mr-2" v-if="data.acf.servings > 0" v-on="on">
                  <v-icon size="medium" class="ml-1" left>fas fa-utensils</v-icon>
                  <template>{{ data.acf.servings }}</template>
                </v-chip>
              </template>
              <span>Servings</span>
            </v-tooltip>
            <!-- Universe -->
            <v-chip class="mr-2" v-if="data.acf.universe">
              <v-icon size="medium" class="ml-1" left>fas fa-disease</v-icon>
              <template>{{ data.acf.universe }}</template>
            </v-chip>
            <!-- Difficulty -->
            <v-chip class="mr-2" v-if="data.acf.difficulty">
              <v-icon size="medium" class="ml-1" left>fas fa-star</v-icon>
              <template>
                {{ difficulties[data.acf.difficulty] }}
              </template>
            </v-chip>
          </div>
          <span class="separator">|</span>
          <nuxt-link class="author fancy" :to="`/authors/${data._embedded.author[0].slug}`">
            <span>{{ data._embedded.author[0].name }}</span>
          </nuxt-link>
        </div>
      </div>
      <div class="content" v-html="data.content.rendered"></div>
      <Steps :steps="data.acf.steps"></Steps>
      <!-- <Comments :article="data" v-if="$store.state.enableComments && type === 'article'" /> -->
    </div>
    <div v-if="colorAccentStyles" v-html="colorAccentStyles"></div>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'
import FeaturedImage from '~/components/Recipe/FeaturedImage.vue'
import Steps from '~/components/Recipe/Steps.vue'

export default defineComponent({
  name: 'Recipe',
  components: {
    FeaturedImage,
    Steps
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

    const difficulties = ['Simple', 'Medium', 'Difficult']

    return { article, getFeaturedImage, colorAccentStyles, slug, difficulties }
  }
})
</script>
