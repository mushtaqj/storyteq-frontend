<script setup>
defineProps({
  item: {
    type: Object,
  },
});
</script>

<!--
  Can be inlined inside the App component, but this would set a bad precedent for ppl adapting,
  Created a component to provided to isolate style and support composition and communicate design stratergy.
-->
<template>
  <li>
    {{ item.primary }}, <small>{{ item.secondary }}</small>
  </li>
</template>

<style>
small {
  font-size: 0.6em;
  font-style: italic;
}
</style>
