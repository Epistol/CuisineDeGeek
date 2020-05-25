<template>
  <div class="article-list">
    <article v-for="article in articles" :key="article.id">
      <div class="date">
        <!-- <span v-html="shortTimestamp(article.date)"></span> -->
        &nbsp;–&nbsp;
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
      <nuxt-link :to="`/${article.slug}`" class="row">
        <div class="col no-flex-shrink">
          <div class="lazy thumbnail" v-if="article._embedded['wp:featuredmedia']">
            <img
              :alt="article._embedded['wp:featuredmedia'][0].alt_text"
              v-lazy="
                article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url
              "
            />
          </div>
          <div class="lazy medium" v-if="article._embedded['wp:featuredmedia']">
            <img
              :alt="article._embedded['wp:featuredmedia'][0].alt_text"
              v-lazy="
                article._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
              "
            />
          </div>
        </div>
        <div class="col">
          <h2 v-html="article.title.rendered"></h2>
          <div class="excerpt" v-html="article.excerpt.rendered"></div>
        </div>
      </nuxt-link>
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
