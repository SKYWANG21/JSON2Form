<script setup lang="ts">
import { Data, JSON2Form } from './components/JSON2HTML';

const data: Data[] = [
  {
    type: 'div',
    cont: 'hello world',
  },
];
</script>

<template>
  <JSON2Form :data="data" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
