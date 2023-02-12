<script setup lang="ts">
import { ConvertToThree } from "../stores/store"

const props = defineProps(["title"])
const convertToThree = ConvertToThree()
</script>

<template>
  <header class="tree-header">
    <h2>{{ props.title }}</h2>
  </header>
  <pre class="three-main">{{ convertToThree.tree }}</pre>
</template>

<style scoped>
header {
  padding-bottom: 12px;
  border-bottom: 1px solid;
}
.three-main {
  font-size: 16px;
  margin-top: 24px;
  line-height: 1.9;

  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  -webkit-font-smoothing: antialiased;
}
</style>
