<script setup lang="ts">
import type {liItemProps} from "./components/menu/li-menu-type.ts";
import LiMenu from "./components/menu/li-menu.tsx";

const liItem = ref<liItemProps[]>([
  {
    name: '1',
    content: '111',
    children: [
      {
        name: '1-1',
        content: '222',
        children: [
          {
            name: '1-1-1',
            content: '333'
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

</script>

<template>
  <LiMenu :li-item="liItem" style="width: 200px;"/>
</template>

<style scoped>

</style>
