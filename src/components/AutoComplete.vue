<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { debounce } from "../utils";

const EMIT_SEARCH = "search";

const emit = defineEmits(["search"]);
const props = defineProps({
  minLength: {
    type: Number,
    default: 3,
  },
  prompt: {
    type: String,
    default: "",
  },
  suggestions: {
    type: Array,
    default: () => [],
  },
});

const searchKeyLessThanMinLength = computed(
  () => searchKey.value.length < props.minLength
);

const placeHolder = computed(() => `Search ${props.prompt}`);

const searchKey = ref("");

// TODO : Debounced to prevent "phantom" queries for each keystorke, could have an issue with multiple components have a look
const search = debounce((e) => {
  searchKey.value = e.target.value;
  const searchKeyValue = searchKey.value;

  if (searchKeyValue.length >= props.minLength) {
    emit(EMIT_SEARCH, searchKeyValue);
  }
}, 300);
</script>

<template>
  <!-- Search Box -->
  <!-- TODO : Add a loader in the right side to show progress -->
  <input
    type="search"
    autocomplete="false"
    @input="search"
    :placeholder="placeHolder"
    autofocus
  />

  <!-- TODO : Prompt & Message Can be made into a component, if they become complex and have a style of their own.  -->
  <!-- TODO : Can add some error handling here for timeouts and bad responses -->
  <!-- Prompt -->
  <div v-if="searchKeyLessThanMinLength" class="prompt">
    Type atleast {{ minLength }} characters to begin searching
  </div>

  <!-- Message  -->
  <div v-else-if="!suggestions.length" class="message">
    No {{ prompt }} found for <strong>{{ searchKey }}</strong>
  </div>

  <!-- Render the List with suggestion -->
  <ul v-else>
    <li v-for="item in suggestions" :key="item">
      <!-- The motivation to extract this to a slot is to keep this component open for extension but closed for modificaiton. This component should only change if the responsibility of the component changes -->
      <slot :item="item">
        <!-- Fallback to default if none provided-->
        <li>{{ item }}</li>
      </slot>
    </li>
  </ul>
</template>

<style>
input {
  border-radius: 0.4em;
  width: 90%;
  padding: 9px 4px 9px 40px;
  border: 1px solid var(--vt-c-secondary-text);
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 13px center;
}

ul {
  margin: 10px;
  list-style: none;
  padding-left: 0;
}

.prompt,
.message {
  color: var(--vt-c-secondary-text);
}
</style>
