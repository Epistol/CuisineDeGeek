<template>
  <div>
    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <p class="display-1 text--primary" v-html="data.title.rendered"></p>
        <div class="text--primary"></div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4">Learn More</v-btn>
      </v-card-actions>
    </v-card>

    <div class>
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
              <template>{{ difficulties[data.acf.difficulty] }}</template>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'TitleCard',
  components: {},
  props: {
    data: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const difficulties = ['Simple', 'Medium', 'Difficult']

    return { difficulties }
  }
})
</script>
