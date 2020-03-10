<template lang="html">
  <div class="chart">
    <highcharts v-if="stock" class="stock-chart" :constructor-type="'stockChart'" :options="stockOptions" />
  </div>
</template>

<script>
const API_KEY=process.env.VUE_APP_ENV_SHARESAPI
import Highcharts from 'highcharts'
import dark from '@/themes/dark.js'

export default {
  name: "stock-chart",
  mounted(){
    this.importShareData();
  },
  data(){
    return {
      stock: null,
      stockSymbol: "AMZN",

      stockOptions: {
        rangeSelector: {
          selected: 4
        },
        title: {
          text: `MSFT Close Values`
        },
        subtitle: {
          text: 'Source: Alpha Vantage'
        },
        series: [{
          name: 'MSFT',
          data: [],
          type: 'areaspline',
          threshold: null,
          pointStart: this.formatDate,
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
    formatDate: function(newValue) {
      this.stockOptions = {
        ...this.stockOptions,
        series: [{
          ...this.stockOptions.series[0],
          pointStart: newValue
        }]
      }
    },
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
      if (!this.stock) return;
      const closeValues = []
      const data = this.stock['Time Series (Daily)']
      for (let date in data) {
        let closeValue = data[date]['4. close']
        closeValues.unshift(closeValue)
      }
      const result =  closeValues.map(function(value) {
        return parseFloat(value)
      })
      return result;
    },

    formatDate: function(){
      if (!this.stock) return;
      const data = this.stock['Time Series (Daily)']
      const startDate = Object.keys(data)[Object.keys(data).length-1]
      const UTCStartDate = startDate.split('-')

      UTCStartDate[1] = UTCStartDate[1] - 1
      return Date.UTC(...UTCStartDate)
    }
  },
  methods: {
    importShareData(){
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.stockSymbol}&outputsize=compact&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          this.stock = data
        })
      }

    }
  }

</script>

  <style>

  </style>
