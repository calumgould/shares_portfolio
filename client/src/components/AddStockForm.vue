<template lang="html">
  <div class="popup" v-on:click="loadAddNewStockForm()">

    <div class="stock-add">
      <h4>Add new stock</h4>
    </div>

  <span class="popuptext" id="myPopup">

    <form v-on:submit.prevent="handleSubmit">

      <label for="stock-name">Stock Name:</label><br>
      <input type="text" id="stock-name" name="stock-name" v-model="name" required /><br>

      <label for="shares-amount">How Many Shares?:</label><br>
      <input type="text" id="shares-amount" name="shares-amount" v-model.number="shares" required /><br>

      <input type="submit" name="submit" value="Add Stock"/><br>

    </form>
    </span>
</div>
</template>

<script>
import { eventBus } from '@/main'

export default {
  name: 'add-stock',
  data(){
    return {
      name: '',
      shares: ''
    }
  },
  methods: {
    loadAddNewStockForm() {
  let popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
    },
    handleSubmit() {
      eventBus.$emit('submit-stock', this.$data);
      this.name = this.shares = '';
    }
  }
}
</script>

<style lang="css" scoped>


  .popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
  }

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

  .popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s
  }

  @-webkit-keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  @keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
}
</style>
