<template lang="html">
  <div class="chart-container">
    <highcharts v-if="msft" class="stock" :constructor-type="'stockChart'" :options="stockOptions" />
  </div>
</template>

<script>
const API_KEY=process.env.VUE_APP_ENV_SHARESAPI
import Highcharts from 'highcharts'
import dark from '@/themes/dark.js'

export default {
  name: "stock-chart",
  mounted(){
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.msft = data
      })

    },
    data(){
      return {
        msft: null,
        stockOptions: {
          rangeSelector: {
            selected: 4
          },
          title: {
            text: 'MSFT Stock Price'
          },
          subtitle: {
            text: 'Source: Alpha Vantage'
          },
          series: [{
            name: 'MSFT Stock Price',
            data: [],
            type: 'areaspline',
            threshold: null,
            pointStart: Date.UTC(2019, 10, 14),
            pointInterval: 1000 * 3600 * 24,
            tooltip: {
              valueDecimals: 2
            },
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            }
          }]
        }
      }
    },
    watch: {
      closeValuesResult: function(newValue){
        this.stockOptions.series[0].data = newValue
      //   this.stockOptions = {
      //     ...this.stockOptions,
      //     series: [{
      //       ...this.stockOptions.series[0],
      //       data: this.closeValuesResult
      //     }
      //   ]
      // }
    }
  },
  computed: {
    closeValuesResult: function(){
      if (!this.msft) return;
      const closeValues = []
      const data = this.msft['Time Series (Daily)']
      for (let date in data) {

        let closeValue = data[date]['4. close']
        closeValues.unshift(closeValue)
      }
      const result =  closeValues.map(function(value) {
        return parseFloat(value)
      })
      return result;
    }
  }
}



</script>

<style lang="css" scoped>


.chart-container {
  width: 100%;
  height: 400px;
}
</style>
