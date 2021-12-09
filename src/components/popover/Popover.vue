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
           ref="popover"
           v-click-outside="close"
           class="w-40 absolute bg-white border border-gray-200 shadow-sm py-1 top-full z-10"
           :class="[popoverPosition === Positions.BOTTOM_LEFT ? 'left-0' : 'right-0']"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script lang='ts' setup>
import { Ref, ref } from '@vue/reactivity'
import { nextTick } from 'vue'

enum Positions {
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

const isOpen = ref(false)
const popover: Ref<any> = ref(null)
const popoverPosition = ref(Positions.BOTTOM_LEFT)

function toggle() {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

function open() {
  isOpen.value = true
  nextTick(() => {
    setPopoverPosition()
  })
}

function close() {
  isOpen.value = false
}

function setPopoverPosition() {
  const rect = popover.value.getBoundingClientRect()
  const fitsRight = rect.x + rect.width <= window.innerWidth

  if (!fitsRight && popoverPosition.value === Positions.BOTTOM_LEFT) {
    popoverPosition.value = Positions.BOTTOM_RIGHT
  }
}

defineExpose({
  close
})
</script>
