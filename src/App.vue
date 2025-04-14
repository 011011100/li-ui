<script setup lang="ts">
import type {liItemProps} from "./components/menu/li-menu-type.ts";
import LiMenu from "./components/menu/li-menu.tsx";

const liItem = ref<liItemProps[]>([
  {
    name: '1',
    content: '111',
    // img:'vite.svg',
    children: [
      {
        name: '1-1',
        content: '222',
        comp: h('div', '213'),
        children: [
          {
            name: '1-1-1',
            content: '333',
            comp: h('div', '333333')
          }
        ]
      },
      {
        name: '1-2',
        content: '222',
        children: [
          {
            name: '1-2-1',
            content: '333'
          }
        ]
      }
    ]
  },
  {
    name: '2',
    content: '123',
    img:'vite.svg',
    children: [
      {
        name: '2-1',
        content: '1233',
        children: [
          {
            name: '2-1-1',
            content: '12333'
          }
        ]
      }
    ]
  }
])

const collapse = ref<boolean>(false)
</script>

<template>
  <button @click="collapse = !collapse">折叠</button>
  <LiMenu :li-item="liItem" :collapse="collapse" style="width: 200px;"/>
</template>

<style scoped>

</style>
