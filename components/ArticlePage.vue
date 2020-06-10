<template>
  <article class="single">
    <!--  <FeaturedImage
      v-if="getFeaturedImage(data, 'large')"
      :expanded="expanded"
      :article="data"
      :featured-image="getFeaturedImage(data, 'large')"
    />-->
    <transition name="slide-fade">
      <div
        class="narrow"
        :class="{ expanded: expanded, 'no-featured-image': !getFeaturedImage(data, 'large') }"
      >
        <button
          class="expand-featured-image"
          title="Show full image"
          @click.prevent="expanded = !expanded"
          :class="{ expanded: expanded }"
          v-if="getFeaturedImage(data, 'large')"
        >
          <svg
            fill="#000000"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
        <div class="meta">
          <h1 class="title" v-html="data.title.rendered"></h1>
          <div class="details">
            <!-- <span>{{ longTimestamp(data.date) }}</span> -->
            <span class="separator">|</span>
            <nuxt-link class="author fancy" :to="`/authors/${data._embedded.author[0].slug}`">
              <span>{{ data._embedded.author[0].name }}</span>
            </nuxt-link>
          </div>
        </div>
        <div class="content" v-html="data.content.rendered"></div>
        <!-- <Comments :article="data" v-if="$store.state.enableComments && type === 'article'" /> -->
      </div>
    </transition>
    <div v-if="colorAccentStyles" v-html="colorAccentStyles"></div>
  </article>
</template>


<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from '@vue/composition-api'
import usePosts from '~/composables/use-posts'

export default defineComponent({
  name: 'PageArticle',
  components: {},
  props: {
    data: Object,
    type: String
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const { fetchArticleForUserLang, article } = usePosts({ ctx })
    const slug = ctx.root.$route.params?.article

    const expanded = ref<boolean>(false)
    const colorAccentStyles = ref<any>(null)

    const getFeaturedImage = (article: any, size: any) => {
      const featuredImage = article._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes[size]
      }
    }

    onMounted(async () => {
      await fetchArticleForUserLang(slug)
    })

    return { article, getFeaturedImage, expanded, colorAccentStyles, slug }
  }
})
</script>



<style lang="scss" scoped>
article {
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  &.page-enter-active .narrow {
    transition: transform 1s cubic-bezier(0.11, 0.89, 0.31, 0.99), opacity 0.75s ease-out;
  }

  &.page-enter .narrow,
  .page-leave-to .narrow {
    transform: translateY(16px);
  }

  .narrow {
    background-color: #efefef;
    margin: 0 auto;
    max-width: 842px;
    min-height: calc(100vh - 80px - 96px - 200px);
    padding: 0 96px 96px 96px;
    position: relative;
    transition: min-height 1s, transform 1s;
    transform: translateY(0);
    width: 100%;

    &.expanded {
      min-height: 0;
    }

    @media (max-width: 900px) {
      margin-top: 0 !important;
      max-width: 100%;
      min-height: initial;
    }

    @media (max-width: 700px) {
      max-width: none;
      padding: 0 16px 16px 16px;
    }

    .expand-featured-image {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      outline: 0;
      position: absolute;
      right: 32px;
      top: 32px;
      transition: 1s;
      z-index: 1;

      @media (max-width: 900px) {
        display: none;
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }

      &.expanded {
        transform: rotate(180deg);
      }

      svg {
        height: 24px;
        opacity: 0.7;
        transition: 0.1s;
        width: 24px;
      }
    }

    &.no-featured-image {
      margin: 0 auto;
    }
  }

  .meta {
    .title {
      font-size: 40px;
      line-height: 1;
      margin-bottom: 16px;
      margin-top: 0;
      padding-top: 64px;

      @media (max-width: 700px) {
        padding-top: 48px;
      }

      @media (max-width: 500px) {
        padding-top: 32px;
      }
    }

    .details {
      font-size: 0.8rem;

      .separator {
        padding: 0 0.5rem;
      }
    }
  }
}
</style>

