<template>
  <div id="app">
    <div class="header">
      <h1>Spend<span>.</span>Stock<sup>&#8482;</sup></h1>
    </div>
    <div class="summary-container">
      <h1>Summary</h1>
      <div class="stock">
        <h3>MSFT</h3>
        <h2>£59601</h2>
      </div>
      <div class="stock">
        <h3>APPL</h3>
        <h2>£86142</h2>
      </div>
      <div class="stock">
        <h3>GOOGL</h3>
        <h2>£24312</h2>
      </div>
      <div class="stock">
        <h3>AMZN</h3>
        <h2>£12590</h2>
      </div>
      <div class="total">
        <h1>Total Value: <span>£182,645</span></h1>
      </div>
    </div>
    <div class="chart-container">
      <div class="list-container">
        <h2 class="list-head">Your Shares</h2>
        <div class="list-item">
          <h3>MSFT</h3>
          <h2><span>2000</span> shares</h2>
        </div>
        <div class="list-item">
          <h3>APPL</h3>
          <h2><span>3500</span> shares</h2>
        </div>
        <div class="list-item">
          <h3>GOOGL</h3>
          <h2><span>1000</span> shares</h2>
        </div>
        <div class="list-item">
          <h3>AMZN</h3>
          <h2><span>500</span> shares</h2>
        </div>
      </div>
      <stock-chart></stock-chart>
    </div>
  </div>
</template>

<script>

import StockChart from './components/StockChart.vue'

export default {
  name: 'App',
  data(){
    return {

    }
  },
  components: {
    'stock-chart': StockChart
  }
}
</script>

<style>

  .header h1 {
    font-family: 'Nunito', sans-serif;
    color: ghostwhite;
    font-size: 4em;
    text-align: center;
    padding: 0.5em 0 0 0;
  }

  .header h1 span {
    color: #89B802;
  }

  .header h1 sup {
    position: relative;
    font-size: 30%;
    line-height: 0;
    vertical-align: baseline;
    top: -1.6em;
  }

  .summary-container {
    width: 90%;
    margin: 2em 5%;
    padding: 1em;
    background-color: #4c4c4d;
    border-radius: 2em;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .summary-container h1 {
    width: 100%;
    font-size: 3em;
    padding: 0.2em 0;
  }

  .stock {
    width: 17%;
    border-radius: 2em;
    border: 1px solid ghostwhite;
    margin: 1em 2em;
    padding: 1em 0.5em;
  }

  .stock:hover, .list-item:hover {
    cursor: pointer;
    background-color: #7e7e81;
  }

  .stock h2, .total h1 span, .list-item h2 span {
    color: #89B802
  }

  .chart {
    width: 68%;
    float: right;
    padding: 1em;
    border: 1px solid ghostwhite;
    border-radius: 2em;
  }

  .chart-container {
    width: 100%;
    display: flex;
    margin: 0 5%;
  }

  .list-container {
    width: 20%;
    background-color: #4c4c4d;
    margin-right: 2%;
    border-radius: 2em;
    padding-bottom: 1em;
  }

  .list-head{
    text-align: center;
    padding: 1em 0 0.5em 0;
  }

  .list-item {
    text-align: center;
    border: 1px solid ghostwhite;
    border-radius: 2em;
    width: 80%;
    margin: 1em 10%;
    padding: 0.5em
  }
</style>
