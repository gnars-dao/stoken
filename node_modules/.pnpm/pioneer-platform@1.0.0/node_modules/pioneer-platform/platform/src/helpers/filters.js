import Vue from 'vue'

Vue.filter('toUSD', function (value) {
  return Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
})
