<template lang="html">

  <div class="popup">
    <div class="popup-add" v-on:click="loadAddNewStockForm">Add New Stock</div>
    <span v-bind:class="[isActive ? 'popuptext popuptextvisable' : 'popuptext popuptexthidden']" id="myPopup">
      <span v-on:click="CloseAddNewStockForm" class="close" id="myPopupClose">&times;</span>

      <form id="submit-form" class="popup-form" @submit.prevent="handleSubmit">

        <form @submit.prevent="searchSymbol">
          <label for="search"></label>
          <input type="text" v-model="search" name="search" value="" required>
          <br>
          <input type="submit" name="search" value="Search">
          <br><hr>
        </form>
        <label for="stocksearch">Select Stock: </label>

        <select v-model="selectedStock.symbol" class="" name="stocksearch">
          <option value="" disabled></option>
          <option v-for="stock in searchResult" v-bind:value="stock" required>{{stock['1. symbol']}} - {{ stock['2. name']}}</option>

        </select>
        <br>
        <br>
        <label for="shares-amount">Shares owned:</label>
        <br>
        <input type="number" id="shares-amount" required name="shares-amount" v-model.number="selectedStock.shares"/>
        <br>
        <input type="submit" name="submit" value="Add Stock"/><br>

      </form>
    </span>
  </div>
</template>

<script>
import { eventBus } from '@/main'
const API_KEY=process.env.VUE_APP_ENV_SHARESAPI

export default {
  name: 'add-stock',
  data(){
    return {
      search: '',
      searchResult: [],
      selectedStock: {
        symbol: '',
        shares: ''
      },
      newStock: {
        name: '',
        symbol: '',
        shares: ''
      },
      isActive: false,
      selected: []
    }
  },
  methods: {
    loadAddNewStockForm() {
      this.isActive = true;
    },
    handleSubmit() {
      this.newStock = {
        name: this.selectedStock.symbol['2. name'],
        symbol: this.selectedStock.symbol['1. symbol'],
        shares: this.selectedStock.shares
      }
      eventBus.$emit('submit-stock', this.$data.newStock)
      this.newStock.name = this.newStock.shares = this.newStock.symbol = this.search = this.selectedStock.shares = this.selectedStock.symbol = ''
      this.searchResult = []
      this.isActive = false
    },

    CloseAddNewStockForm() {
      this.isActive = false;
    },

    searchSymbol(){
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.search}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          this.searchResult = data.bestMatches
        })
      }
    }
  }

</script>

  <style>

  hr {
  border: 1px solid ghostwhite;
  border-radius: 4em;
  margin: 0em 5% 0.5em 5%;
}
  /* Popup container */
  .popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 100%;
    text-align: center;
    margin: 6em 0;
  }

  .popup .popuptextvisable {
    display: block;
  }

  .popup .popuptexthidden {
    display: none;
  }
  /* The actual popup (appears on top) */
  .popup .popuptext {
    width: 90%;
    background-color: #555;
    color: #fff;
    text-align: center;
    border: 1px solid ghostwhite;
    border-radius: 2em;
    padding: 0 1em 1em 1em;
    position: absolute;
    text-align: center;
    z-index: 1;
    bottom: 125%;
    left: 29%;
    margin-left: -70px;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }

  .popup-form {
    justify-content: center;
    text-align: center;
  }

  .popup-form input[type="text"], .popup-form select, .popup-form input[type="number"] {
    padding: 0.5em 1em;
    margin: 1em 0;
    border-radius: 2em;
    border: none;
    outline: none;
    width: 90%;
  }

  .popup-form input[type="submit"] {
    background-color: #F4B41A;
    color: ghostwhite;
    border-radius: 2em;
    padding: 0.5em 1em;
    font-size: 1em;
    margin-bottom: 1em;
  }

  .popup-form input[type="submit"]:hover {
    background-color: #f6be3c;
    cursor: pointer;
  }

  .popup-add {
    text-align: center;
    bottom: 0;
    margin: 0 auto;
    border: 1px solid ghostwhite;
    border-radius: 2em;
    width: 75%;
    margin: 0 auto;
    padding: 0.5em 1.5em;
    font-size: 1.3em;
    text-align: center;
    background-color: #F4B41A;
    color: ghostwhite;
  }

  .popup-add:hover {
    background-color: #f6be3c;
    cursor: pointer;
  }

  .close {
    color: #aaaaaa;
    position: relative;
    font-size: 2em;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  /* Popup arrow */
  .popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  /* Add animation (fade in the popup) */
  @-webkit-keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
  }
  </style>
