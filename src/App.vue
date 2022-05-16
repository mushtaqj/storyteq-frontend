<script setup>
import { ref } from "vue";
import AutoComplete from "./components/AutoComplete.vue";
import ACObjectListItem from "./components/ACObjectListItem.vue";
import { useBooksStore, useCitiesStore } from "./stores";

const booksStore = useBooksStore();
const citiesStore = useCitiesStore();

const booksSuggestions = ref([]);
const citiesSuggestions = ref([]);

function searchCities(searchKey) {
  citiesSuggestions.value = citiesStore.search(searchKey);
}

function searchBooks(searchKey) {
  booksSuggestions.value = booksStore.search(searchKey);
}
</script>

<template>
  <AutoComplete @search="searchCities" :suggestions="citiesSuggestions" />

  <AutoComplete
    v-slot="slotProps"
    @search="searchBooks"
    :prompt="'Books'"
    :suggestions="booksSuggestions"
  >
    <ACObjectListItem
      :item="{
        primary: slotProps.item.title,
        secondary: slotProps.item.author,
      }"
    />
  </AutoComplete>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
</style>
