<template lang="html">
  <div class="summary-list">
    <ul>
      <summary-list-item v-for="(stock, index) in stocks" :stock="stock" :key="index" />
    </ul>
      <div class="total">
        <h1>Total Value: <span>$ {{totalPortfolioValue}}</span></h1>
      </div>
  </div>
</template>

<script>
import StockChart from './StockChart.vue'
import SummaryListItem from './SummaryListItem.vue'
import { eventBus } from '@/main'
export default {
  name: 'summary-list',
  props: ['stocks'],
  data(){
    return {
    }
  },
  components: {
    'summary-list-item': SummaryListItem
  },
  computed: {
    totalPortfolioValue() {
      if (!this.stocks) return {}
      return this.$totalPortfolioValue = this.stocks.reduce( (runningTotal, stock) => {
        return runningTotal += stock.totalValue
      }, 0)
    }
  }
  }
</script>

<style lang="css" scoped>

  .summary-list ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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
