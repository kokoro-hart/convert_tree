<script setup lang="ts">
import { ConvertToThree } from "../stores/store"
import List from "./List.vue"
import Three from "./Three.vue"

const convertToThree = ConvertToThree()
convertToThree.created()
</script>

<template>
  <header>
    <h1>List to Tree&#x1f332;</h1>
    <p class="desc">リストからツリー（ディレクトリ形式）への変換</p>
  </header>
  <main>
    <div class="container">
      <div class="list-container">
        <List title="List" />
      </div>
      <div class="three-container">
        <Three title="Tree" />
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  width: 100%;
  text-align: center;
  padding-top: 52px;
}

h1 {
  font-weight: 600;
}

.desc {
  margin-top: 8px;
  font-size: 16px;
}
.container {
  max-width: 1280px;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 84px;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.list-container {
  padding: 40px;
  border-radius: 1rem;
  box-shadow: 2px 2px 4px #fff, -2px -2px 4px rgb(0 0 0 / 30%),
    inset -2px -2px 6px hsl(0deg 0% 100% / 30%),
    inset 2px 2px 6px rgba(163, 163, 163, 0.5);
  width: calc(50% - 5% / 2);
  background: linear-gradient(to bottom right,#c7bce6 0,#c8bce6 8.1%,#c9bbe5 15.5%,#cbbbe5 22.5%,#cebae3 29%,#d2b9e2 35.3%,#d5b8e0 41.2%,#d9b7de 47.1%,#ddb6dc 52.9%,#e0b5d9 58.8%,#e3b4d6 64.7%,#e6b3d4 71%,#e8b3d1 77.5%,#eab2d0 84.5%,#ebb2ce 91.9%,#ebb2ce);
}

.three-container {
  padding: 40px;
  border-radius: 1rem;
  box-shadow: 2px 2px 4px #fff, -2px -2px 4px rgb(0 0 0 / 30%),
    inset -2px -2px 6px hsl(0deg 0% 100% / 30%),
    inset 2px 2px 6px rgb(0 0 0 / 50%);
  width: calc(50% - 5% / 2);
  background-color: #292d3d;
}

@media screen and (max-width: 1024px) {
  .container {
    flex-direction: column;
    gap: 32px;
  }

  .list-container {
    width: 100%;
  }

  .three-container {
    overflow: hidden;
    width: 100%;
  }
}
</style>
