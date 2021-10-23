<script lang='ts' setup>
import { PropType } from 'vue'
import Icon from '/~/components/icon/Icon.vue'
import { MenuItem } from '/~/models/MenuItem'

const props = defineProps({
  menuItems: {
    type: Array as PropType<MenuItem[]>,
    default: () => [
      {
        name: 'places-list',
        label: 'Places',
        icon: 'map-pin'
      }
    ]
  }
})
</script>

<template>
  <div class="bg-gray-100 w-full max-w-xs">
    <RouterLink v-for="item of menuItems"
                :key="item.name"
                v-slot="{ isActive }"
                :to="{ name: item.name }"
    >
      <div class="py-2 px-2 flex items-center"
           :class="[isActive ? 'bg-blue-100' : 'hover:bg-white hover:bg-opacity-50 ']"
      >
        <Icon :name="item.icon"
              :size="20"
              class="text-gray-500 mr-2"
              :class="[isActive && 'text-blue-600']"
        />
        {{ item.label }}
      </div>
    </RouterLink>
  </div>
</template>
