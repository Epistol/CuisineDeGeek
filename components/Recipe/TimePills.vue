<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-chip class="mr-2" v-if="getTimes(article.acf).prepTime > 0" v-on="on">
          <v-icon size="medium" class="ml-1" left>{{ bowlIcon }}</v-icon>
          <template>{{ getTimes(article.acf).prepTime }} {{ $t('common.recipe.minutes') }}</template>
        </v-chip>
      </template>
      <span>{{ $t('common.recipe.time.prep') }}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-chip class="mr-2" v-if="getTimes(article.acf).cookTime > 0" v-on="on">
          <v-icon size="medium" class="ml-1" left>{{ stoveIcon }}</v-icon>
          <template>{{ getTimes(article.acf).cookTime }} {{ $t('common.recipe.minutes') }}</template>
        </v-chip>
      </template>
      <span>{{ $t('common.recipe.time.cook') }}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-chip class="mr-2" v-if="getTimes(article.acf).restTime > 0" v-on="on">
          <v-icon size="medium" class="ml-1" left>{{ coffeeIcon }}</v-icon>
          <template>{{ getTimes(article.acf).restTime }} {{ $t('common.recipe.minutes') }}</template>
        </v-chip>
      </template>
      <span>{{ $t('common.recipe.time.rest') }}</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mdiStove } from '@mdi/js'
import { mdiBowlMix } from '@mdi/js'
import { mdiCoffee } from '@mdi/js'

export default defineComponent({
  name: 'GlobalTimePill',
  props: {
    article: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const getTimes = (article: any) => {
      const { preparing_time, cooking_time, resting_time } = article

      const prepTime: number = preparing_time ? parseInt(preparing_time) : 0
      const cookTime: number = cooking_time ? parseInt(cooking_time) : 0
      const restTime: number = resting_time ? parseInt(resting_time) : 0

      return { prepTime, cookTime, restTime }
    }

    const leftFillNum: any = (num: number, targetLength: number) => {
      return num.toString().padStart(targetLength, '0')
    }

    const stoveIcon = mdiStove
    const bowlIcon = mdiBowlMix
    const coffeeIcon = mdiCoffee

    return { getTimes, leftFillNum, stoveIcon, bowlIcon, coffeeIcon }
  }
})
</script>
