<template>
  <div v-if="propArticle">
    <v-container>
      <v-row no-gutters class="shadow rounded-r-xl">
        <v-col v-if="propArticle._links" class="rounded-xl" :sm="6" :md="3">
          <ArticleImage
            :imageLink="propArticle._links['wp:featuredmedia'][0].href"
            :class-prop="'rounded-l-xl'"
            height="200px"
            :hrefProp="slugUrl(propArticle.slug)"
          />
        </v-col>
        <v-col
          v-if="propArticle._links"
          :sm="6"
          :md="propArticle._links['wp:featuredmedia'][0].href ? 9 : 12"
          class="bg-white rounded-r-xl"
        >
          <div class="p-4">
            <nuxt-link :to="slugUrl(propArticle.slug)">
              <span class="recipe-title" v-html="propArticle.title.rendered"></span>
            </nuxt-link>

            <div class="mb-4 subtitle-1">
              <span class="topics">
                <!-- <span class="topic" v-for="topic in article._embedded['wp:term'][0]">
                    <nuxt-link
                      class="fancy"
                      :to="`/topics/${topic.slug}`"
                      :key="topic.id"
                      v-html="topic.name"
                    ></nuxt-link>
                </span>-->
              </span>
            </div>

            <div id="content">
              <!-- Excerpt -->
              <span v-html="propArticle.content.rendered"></span>
              <div class="flex">
                <div class="flex-auto" id="infos">
                  <!-- Time -->
                  <global-time-pill :article="propArticle"></global-time-pill>
                  <Metas :data="propArticle"></Metas>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, computed, onMounted } from '@vue/composition-api'
import ArticleImage from '~/components/Article/Images/Image.vue'
import GlobalTimePill from '~/components/Recipe/GlobalTimePill.vue'
import Metas from '~/components/Recipe/Metas.vue'

export default defineComponent({
  name: 'ArticleExcerpt',
  components: { ArticleImage, GlobalTimePill, Metas },
  props: {
    article: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const propArticle = computed(() => props.article)

    const slugUrl = (slug: string) => {
      const Cookie = process.client ? require('js-cookie') : undefined
      const cookieLang = Cookie.get('i18n_redirected')

      // Change for prod :
      let slugUrl = null

      if (cookieLang && cookieLang !== ctx.root.$i18n.defaultLocale) {
        slugUrl = '/' + cookieLang + '/recipe/' + slug + '/'
      } else {
        slugUrl = '/recipe/' + slug + '/'
      }
      return slugUrl
    }

    return { propArticle, slugUrl }
  }
})
</script>
