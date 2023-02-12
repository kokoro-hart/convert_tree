<script setup lang="ts">
import { defineProps } from "vue"
import { ConvertToThree } from "../stores/store"

const props = defineProps(["title"])
const convertToThree = ConvertToThree()
</script>

<template>
  <header class="list-header">
    <h2>{{ props.title }}</h2>
    <button type="button" class="delete" @click="convertToThree.deleteList()">
      Ｘ
    </button>
  </header>
  <div class="list-main">
    <div
      contenteditable="true"
      v-for="(item, index) in convertToThree.items"
      :key="item.id"
      :ref="
        (el) => {
          convertToThree.divs[item.id] = el as HTMLElement
        }
      "
      :style="{ marginLeft: item.indent * 20 + 20 + 'px' }"
      @input="convertToThree.onInput($event, item)"
      @keydown.tab.exact.prevent="convertToThree.onTab(item, index)"
      @keydown.tab.shift.prevent="convertToThree.onTabShift(item, index)"
      @keydown.up.prevent="convertToThree.onUp(index)"
      @keydown.down.prevent="convertToThree.onDown(index)"
      @keydown.enter.prevent="convertToThree.onEnter(item, index)"
      @keydown.backspace="convertToThree.onBackspace(item, index)"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<style scoped>
div[contenteditable] {
  position: relative;
  display: list-item;
  outline: none;
  margin-bottom: 4px;
  line-height: 1.7;
}

div[contenteditable]:focus {
  border: 2px solid;
  display: block;
}

div[contenteditable]:focus::before {
  position: absolute;
  left: -23px;
  top: 50%;
  transform: translateY(-50%);
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 10px;
  border-color: transparent transparent transparent #fff;
}

.delete {
  color: #fff;
  display: block;
}

.list-main {
  margin-top: 24px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid;
}
</style>
