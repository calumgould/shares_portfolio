<template lang="html">
  <div class="summary-list-items">
    <li class="summary-list-item"><h2>{{stock.name}}</h2></li>
    <li class="summary-list-item"><h3><span>£ VALUE</span></h3></li>
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
    width: 25%;
    padding: 0.5em 1em;
    margin: 1em 1em;
  }

  .summary-list-item {
    list-style: none;
  }

  .summary-list-items:hover {
    background-color: #7e7e81;
    cursor: pointer;
  }

  .summary-list-item span {
    color: #F4B41A;
  }


</style>
