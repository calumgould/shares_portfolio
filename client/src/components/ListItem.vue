<template lang="html">
  <li class="list-item" v-on:click="handleClick">{{stock.symbol}}</li>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  name: 'list-item',
  props: ['stock'],
  methods: {
    handleClick() {
      eventBus.$emit('stock-selected', this.stock);
    }
  }
}
</script>

<style lang="css" scoped>


</style>
