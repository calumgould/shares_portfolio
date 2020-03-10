<template lang="html">
  <div class="summary-list">
    <ul>
      <summary-list-item v-for="(stock, index) in stocks" :stock="stock" :key="index" />
    </ul>
      <div class="total">
        <h1>Total Value: <span>£ TOTAL VALUE</span></h1>
      </div>
  </div>
</template>

<script>
import SummaryListItem from './SummaryListItem.vue'
import { eventBus } from '@/main'
export default {
  name: 'summary-list',
  props: ['stocks'],
  components: {
    'summary-list-item': SummaryListItem
  }
}
</script>

<style lang="css" scoped>

  .summary-list ul {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 5%;
    justify-content: center;
  }

  .summary-list {
    width: 100%;
    background-color: #4c4c4d;
    margin-right: 2%;
    border-radius: 2em;
    padding-bottom: 1em;
  }

</style>
