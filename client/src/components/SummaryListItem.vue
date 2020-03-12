<template lang="html">
  <div class="summary-list-items">
    <li class="summary-list-item"><h2>{{stock.name}}</h2></li>
    <li class="summary-list-item"><h3>${{stock.totalValue}}</h3></li>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
export default {
  name: 'summary-list-item',
  props: ['stock'],
}
</script>

<style lang="css" scoped>

  .summary-list-items {
    text-align: center;
    border: 1px solid ghostwhite;
    border-radius: 2em;
    width: 20%;
    padding: 0.5em 1em;
    margin: 2em 1em;
  }

  .summary-list-item {
    list-style: none;
  }

  .summary-list-item h3 {
    color: #F4B41A;
    font-size: 1.3em;
  }

  .summary-list-item h2 {
    font-size: 1.1em;
  }


</style>
