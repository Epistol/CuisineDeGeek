<template>
  <v-chip class="mr-2" v-if="getGlobalTime(article.acf).sumMinutes > 0">
    <v-icon size="medium" class="ml-1" left>far fa-hourglass</v-icon>
    <template
      v-if="getGlobalTime(article.acf).remHours > 0"
    >{{getGlobalTime(article.acf).remHours}}h{{leftFillNum(getGlobalTime(article.acf).remMinutes, 2)}}</template>
    <template v-else>{{leftFillNum(getGlobalTime(article.acf).remMinutes, 2)}} min</template>
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'GlobalTimePill',
  props: {
    article: Object
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const getGlobalTime = (article: any) => {
      const { preparing_time, cooking_time, resting_time } = article

      let remHours: number = 0
      let remMinutes: number = 0

      const prepTime: number = preparing_time ? parseInt(preparing_time) : 0
      const cookTime: number = cooking_time ? parseInt(cooking_time) : 0
      const restTime: number = resting_time ? parseInt(resting_time) : 0

      const sumMinutes: number = prepTime + cookTime + restTime

      remMinutes = sumMinutes
      if (sumMinutes >= 60) {
        remHours = Math.trunc(sumMinutes / 60)
        remMinutes = sumMinutes - remHours * 60
      }

      return { sumMinutes, remMinutes, remHours }
    }

    const leftFillNum: any = (num: number, targetLength: number) => {
      return num.toString().padStart(targetLength, '0')
    }

    return { getGlobalTime, leftFillNum }
  }
})
</script>
