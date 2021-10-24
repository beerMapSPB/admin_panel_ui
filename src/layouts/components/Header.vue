<template>
  <div class="h-16 bg-gray-200 flex justify-between">
    <button class="px-4"
            @click="emit('toggleMenu')"
    >
      <Icon name="menu" />
    </button>
    <UserInfo class="w-44" />
  </div>
</template>

<script lang='ts' setup>
import Icon from '/~/components/icon/Icon.vue'
import UserInfo from './UserInfo.vue'

const emit = defineEmits<{(e: 'toggleMenu'): void}>()

</script>
