<script lang='ts' setup>
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header class="w-full sm:hidden" />
    <div class="flex-grow flex">
      <Menu class="hidden sm:block" />
      <div class="flex-grow">
        <RouterView />
      </div>
    </div>
  </div>
</template>
