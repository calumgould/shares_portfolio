<template lang="html">
  <div class="chart-container">
    <highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions" />
  </div>
</template>

<script>

export default {
  name: "stock-chart",
  data(){
    return {
      stockOptions: {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'MSFT Stock Price'
        },

        scrollbar: {
            barBackgroundColor: 'gray',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'gray',
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: 'none',
            trackBorderWidth: 1,
            trackBorderRadius: 8,
            trackBorderColor: '#CCC'
        },

        series: [{
            name: 'MSFT Stock Price',
            data: [10, 20, 30, 40, 30, 10],
            tooltip: {
                valueDecimals: 2
            }
        }]
      }
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
