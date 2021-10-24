<script lang='ts' setup>
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import { ref } from '@vue/reactivity'

const isMobileMenuVisible = ref(false)

function toggleMobileMenu() {
  isMobileMenuVisible.value = !isMobileMenuVisible.value
}

function closeMobileMenu() {
  isMobileMenuVisible.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header class="w-full lg:hidden"
            @toggleMenu="toggleMobileMenu"
    />
    <div class="flex-grow flex relative">
      <!-- Mobile menu -->
      <transition enter-active-class="transition duration-100 ease-in-out"
                  enter-from-class="transform -translate-x-full"
                  enter-to-class="translate-x-0"
                  leave-active-class="transition duration-100 ease-in-out"
                  leave-from-class="translate-x-0"
                  leave-to-class="transform -translate-x-full"
      >
        <Menu v-if="isMobileMenuVisible"
              :show-user-info="false"
              class="absolute h-full"
        />
      </transition>

      <!-- Desktop menu -->
      <Menu class="hidden lg:block" />

      <div class="flex-grow"
           @click="closeMobileMenu"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>
