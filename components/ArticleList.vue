<template>
  <div class="article-list">
    <article v-for="article in articles" :key="article.id">
      <v-container>
        <v-row no-gutters class="shadow">
          <v-col v-if="article._embedded['wp:featuredmedia']" cols="3" class="rounded-md">
            <v-img
              class="rounded-l-md"
              v-if="article._embedded['wp:featuredmedia']"
              height="250"
              :alt="article._embedded['wp:featuredmedia'][0].alt_text"
              :src="
                article._embedded['wp:featuredmedia'][0].media_details.sizes
                  .medium_large.source_url
              "
            ></v-img>
          </v-col>
          <v-col
            :cols="article._embedded['wp:featuredmedia'] ? 9 : 12"
            class="bg-white rounded-r-md"
          >
            <div class="p-4">
              <nuxt-link :to="`/${article.slug}`">
                <span class="text-xl" v-html="article.title.rendered"></span>
              </nuxt-link>

              <div class="mb-4 subtitle-1">
                <span class="topics">
                  <span class="topic" v-for="topic in article._embedded['wp:term'][0]">
                    <nuxt-link
                      class="fancy"
                      :to="`/topics/${topic.slug}`"
                      :key="topic.id"
                      v-html="topic.name"
                    ></nuxt-link>
                  </span>
                </span>
              </div>

              <div id="content">
                <span v-html="article.content.rendered"></span>
                <global-time-pill :article="article"></global-time-pill>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import GlobalTimePill from '~/components/Article/GlobalTimePill.vue'

export default defineComponent({
  name: 'ArticleList',
  components: {
    GlobalTimePill
  },
  props: {
    articles: Array
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  }
})
</script>
