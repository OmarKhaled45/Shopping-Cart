<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CategoryFilter from './components/CategoryFilter.vue';
import ItemCard from './components/ItemCard.vue';
import ReceiptPopup from './components/ReceiptPopup.vue';
import data from './data/items.json';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',
};
</script>

<style lang="scss">
.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

button {
  margin: 20px;
}
</style>
