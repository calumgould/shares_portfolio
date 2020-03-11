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
  data(){
    return {
      stocks: null,
    }
  },
  props: ['stock'],
  computed: {
    stockOptions() {
      if (!this.stock) return {}
      return {
        rangeSelector: {
          selected: 4
        },
        title: {
          text: `${this.stock.name} Close Values`
        },
        series: [{
          name: `${this.stock.symbol}`,
          data: this.stock.closeValues,
          type: 'areaspline',
          threshold: null,
          pointStart: this.stock.startDate,
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
  }
  }

</script>

  <style>

  </style>
