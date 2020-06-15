<template>
  <span>
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
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-chip class="mr-2" v-if="data.acf.difficulty" v-on="on">
          <v-icon size="medium" class="ml-1" left>fas fa-tachometer-alt</v-icon>
          <template>{{ difficulties[data.acf.difficulty] }}</template>
        </v-chip>
      </template>
      <span>Difficulty</span>
    </v-tooltip>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Metas',
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
