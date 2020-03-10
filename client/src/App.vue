<template>
  <div id="app">
    <div class="header">
      <!-- <h1>Spend<span>.</span>Stock<sup>&#8482;</sup></h1> -->
      <h1>Storacle<span>.</span></h1>
    </div>

    <div class="tab">
      <button class="tablinks" v-on:click="openTab('SummaryPage')" id="defaultOpen">Summary</button>
      <button class="tablinks" v-on:click="openTab('StockChart')">Stocks</button>
    </div>

    <div id="SummaryPage"class="tabcontent">
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
        <portfolio-chart></portfolio-chart>
      </div>
    </div>

    <div id="StockChart" class="tabcontent">
      <div class="tabelement">
        <stocks-list :stocks="stocks"></stocks-list>
      </div>

      <stock-detail v-if="selectedStock" :stock="selectedStock"></stock-detail>

      <div class="tabelement">
        <stock-chart></stock-chart>
      </div>
    </div>

    <div class="footer">
      <p class="sponsor">Sponsored by OnTrack<span>.</span></p>
    </div>

  </div>
</template>

<script>

import StockChart from './components/StockChart.vue'
import PortfolioChart from './components/PortfolioChart.vue'
import StockList from './components/StockList.vue'
import StockDetail from './components/StockDetail.vue'
import ListItem from './components/ListItem.vue'
import StockService from './services/StockService.js'
import { eventBus } from '@/main'

export default {
  name: 'App',
  data(){
    return {
      stocks: [
        {
          name: 'APPL',
          shares: 75
        },
        {
          name: 'MSFT',
          shares: 54
        },
        {
          name: 'GOOG',
          shares: 32
        }
      ],
      selectedStock: null
    }
  },
  components: {
    'stock-chart': StockChart,
    'stocks-list': StockList,
    'stock-detail': StockDetail,
    'portfolio-chart': PortfolioChart
  },
  mounted() {
    eventBus.$on('submit-stock', (stock) => {
      StockService.addStock(stock)
      .then(stockWithId => this.stocks.push(stockWithId));
    });

    eventBus.$on('updated-stock', (stock) => {
      StockService.updateStock(stock)
      .then(() => getStocks())
    });

    eventBus.$on('stock-selected', stock => (this.selectedStock = stock));

    this.openDefaultTab('defaultOpen');
  },
  methods: {
    openTab(pageName) {
      // Declare all variables
      let i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(pageName).style.display = "block";
      event.currentTarget.className += " active";
    },
    openDefaultTab(tabId) {
      document.getElementById(tabId).click();
    }
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

  .header h1 span, .stock h2, .total h1 span, .list-item h2 span, .sponsor span {
    color: #F4B41A;
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

  .chart {
    width: 80%;
    float: right;
    padding: 1em;
    border: 1px solid ghostwhite;
    border-radius: 2em;
  }

  .chart-container {
    width: 90%;
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

  .footer {
    max-width: 100%;
    margin-top: 4%;
  }

  .sponsor {
    text-align: right;
    padding: 1em;
  }

  /* STOCK TAB */

  .tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
  }

  /* Style the buttons that are used to open the tab content */
  .tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
  }

  /* Change background color of buttons on hover */
  .tab button:hover {
    background-color: #ddd;
  }

  /* Create an active/current tablink class */
  .tab button.active {
    background-color: #ccc;
  }
  /* Style the tab content */
  .tabcontent {
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
  }

  .tabelement {
    display: inline-block;
    padding: 20px;
  }
</style>
