<template>
  <div id="app">
    <stock-chart></stock-chart>
  </div>
</template>

<script>
const API_KEY=process.env.VUE_APP_ENV_SHARESAPI
import StockChart from './components/StockChart.vue'

export default {
  name: 'App',
  data(){
    return {
      msft: []
    }
  },
  components: {
    'stock-chart': StockChart
  },
  mounted(){
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => this.msft = data)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
