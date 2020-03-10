<template lang="html">
  <div id="stockList" class="stock-list">
  <ul>
    <list-item v-for="(stock, index) in stocks" :stock="stock" :key="index"></list-item>
  </ul>

</div>
</template>

<script>

import ListItem from './ListItem'
import { eventBus } from '@/main'
import AddStock from './AddStockForm'


export default {
  name: 'stocks-list',
  props: ['stocks'],
  components: {
  'list-item': ListItem,

  },
}
</script>

<style lang="css" scoped>

</style>
