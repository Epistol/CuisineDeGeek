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
                <!-- Excerpt -->
                <span v-html="article.content.rendered"></span>
                <global-time-pill :article="article"></global-time-pill>
                <!-- Servings -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="mr-2" v-if="article.acf.servings > 0" v-on="on">
                      <v-icon size="medium" class="ml-1" left>fas fa-utensils</v-icon>
                      <template>{{ article.acf.servings }}</template>
                    </v-chip>
                  </template>
                  <span>Servings</span>
                </v-tooltip>
                <!-- Universe -->
                <v-chip class="mr-2" v-if="article.acf.universe">
                  <v-icon size="medium" class="ml-1" left>fas fa-disease</v-icon>
                  <template>{{ article.acf.universe }}</template>
                </v-chip>
                <!-- Difficulty -->
                <v-chip class="mr-2" v-if="article.acf.difficulty">
                  <v-icon size="medium" class="ml-1" left>fas fa-star</v-icon>
                  <template>
                    {{
                    difficulties[article.acf.difficulty]
                    }}
                  </template>
                </v-chip>
                <social-sharing
                  network-selected="facebook"
                  :article-title="article.title.rendered"
                  :article-excerpt="article.excerpt.rendered"
                ></social-sharing>
                <social-sharing
                  network-selected="twitter"
                  :article-title="article.title.rendered"
                  :article-excerpt="article.excerpt.rendered"
                ></social-sharing>
                <social-sharing
                  v-if="article._embedded['wp:featuredmedia']"
                  network-selected="pinterest"
                  :article-title="article.title.rendered"
                  :article-excerpt="article.excerpt.rendered"
                  :article-media="article._embedded['wp:featuredmedia'][0].source_url"
                ></social-sharing>
                <social-sharing
                  network-selected="email"
                  :article-title="article.title.rendered"
                  :article-excerpt="(article.excerpt.rendered)"
                ></social-sharing>
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
import SocialSharing from '~/components/Article/SocialSharing.vue'

export default defineComponent({
  name: 'ArticleList',
  components: {
    GlobalTimePill,
    SocialSharing
  },
  props: {
    articles: Array
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const difficulties = ['Simple', 'Medium', 'Difficult']
    return { difficulties }
  }
})
</script>
