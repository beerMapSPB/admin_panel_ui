<template>
  <div
    class="relative"
  >
    <button class="w-full"
            @click="toggle"
    >
      <slot />
    </button>
    <transition enter-active-class="transition duration-100 ease-in-out"
                enter-from-class="transform -translate-y-2 opacity-0"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in-out"
                leave-from-class="transform opacity-100 translate-y-0"
                leave-to-class="-translate-y-2 opacity-0"
    >
      <div v-if="isOpen"
           v-click-outside="close"
           class="w-40 absolute bg-white border border-gray-200 shadow-sm py-1 top-full"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script lang='ts' setup>
import { ref } from '@vue/reactivity'

const isOpen = ref(false)

function toggle() {
  if (isOpen.value) {
    isOpen.value = false
  } else {
    isOpen.value = true
  }
}

function close() {
  isOpen.value = false
}

defineExpose({
  close
})
</script>
