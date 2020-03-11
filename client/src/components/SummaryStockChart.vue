<template lang="html">
  <div class="chart">
    <highcharts class="summary-stock-chart" :constructor-type="'stockChart'" :options="summaryStockOptions" />
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import dark from '@/themes/dark.js'

export default {
  name: "summary-stock-chart",
  data(){
    return {
      stocks: null,
    }
  },
  methods: {
    importShareData(){
      fetch('http://localhost:3000/api/shares/')
        .then(res => res.json())
        .then(data => this.stocks = data)
    }
  },
  mounted(){
    this.importShareData();
  },
  computed: {
    series() {
      if (!this.stocks) return {}
      return this.stocks.map( (stock) => {
        return {
          name: stock.name,
          data: stock.closeValues,
          threshold: null,
          pointStart: stock.startDate,
          pointInterval: 1000 * 3600 * 24,
          showInNavigator: true,
          compare: 'percent'
        }
      })
    },

    summaryStockOptions() {
      return {
        rangeSelector: {
          selected: 4
        },
        yAxis: {
          labels: {
            formatter: function () {
              return (this.value > 0 ? ' + ' : '') + this.value + '%';
            }
          },
          plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
          }]
        },
        plotOptions: {
          series: {
            showInNavigator: true
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2,
          split: true
        },
        title: {
          text: `Your Stocks: Close Values`
        },
        subtitle: {
          text: 'Source: Alpha Vantage'
        },
        series: this.series
      }
    }
  }

}
</script>

<style>



</style>
