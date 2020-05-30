<template>
  <div class="article-list">
    <article v-for="article in articles" :key="article.id">
      <v-container>
        <v-layout row>
          <v-flex md6>...</v-flex>
          <v-flex md6>...</v-flex>
        </v-layout>
      </v-container>

      <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <v-img
          v-if="article._embedded['wp:featuredmedia']"
          height="250"
          :alt="article._embedded['wp:featuredmedia'][0].alt_text"
          :src="article._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url"
        ></v-img>

        <v-card-title>
          <nuxt-link :to="`/${article.slug}`">
            <span v-html="article.title.rendered"></span>
          </nuxt-link>
        </v-card-title>

        <v-card-text>
          <!--
          <v-row align="center" class="mx-0">
            <v-rating :value="4.5" color="orange" dense half-increments readonly size="14"></v-rating>
            <div class="grey--text ml-4">4.5 (413)</div>
          </v-row>
          -->

          <!-- <div class="mb-4 subtitle-1">$ • Italian, Cafe</div> -->
          <div class="mb-4 subtitle-1">
            <span class="topics">
              <span class="topic" :key="topic" v-for="topic in article._embedded['wp:term'][0]">
                <nuxt-link
                  class="fancy"
                  :to="`/topics/${topic.slug}`"
                  :key="topic.id"
                  v-html="topic.name"
                ></nuxt-link>
              </span>
            </span>
          </div>

          <div>
            <span v-html="article.content.rendered"></span>
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Tonight's availability</v-card-title>

        <v-card-text>
          <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
            <v-chip>5:30PM</v-chip>

            <v-chip>7:30PM</v-chip>

            <v-chip>8:00PM</v-chip>

            <v-chip>9:00PM</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="reserve">Reserve</v-btn>
        </v-card-actions>
      </v-card>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ArticleList',
  props: {
    articles: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    return {}
  }
})
</script>
