<template>
  <PopoverMenu :options="options"
               class="text-sm"
  >
    <div class="w-full flex justify-start items-center py-2 px-2 hover:bg-gray-200 h-16">
      <div :style="`background: url(${user.avatarUrl})`"
           class="w-8 h-8 rounded-full border border-gray-300 bg-gray-200"
      />
      <div class="ml-2 truncate">
        {{ user.name }} {{ user.surname }}
      </div>
      <Icon name="chevron-down"
            class="text-gray-500 ml-auto"
            :size="20"
      />
    </div>
  </PopoverMenu>
</template>

<script lang='ts' setup>
import { ref } from '@vue/reactivity'
import PopoverMenu from '/~/components/popover-menu/PopoverMenu.vue'
import Icon from '/~/components/icon/Icon.vue'

const user = ref({
  name: 'Admin',
  surname: 'Admin',
  avatarUrl: 'https://picsum.photos/200/300'
})

const options = [
  {
    label: 'Logout',
    icon: 'log-out',
    handler() {
      alert('logout')
    }
  }
]

</script>
