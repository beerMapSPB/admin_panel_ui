<template>
  <Popover ref="popover">
    <slot />
    <template #content>
      <button v-for="option in options"
              :key="option.label"
              class="w-full px-2 py-1 hover:bg-gray-100 flex items-center space-x-2"
              @click="handleClick(option)"
      >
        <Icon v-if="option.icon"
              :name="option.icon"
              :size="14"
              tag="div"
        />
        <span>
          {{ option.label }}
        </span>
      </button>
    </template>
  </Popover>
</template>

<script lang='ts' setup>
import Popover from '/~/components/popover/Popover.vue'
import Icon from '/~/components/icon/Icon.vue'
import { Option } from './types/Option'
import { ref, Ref } from '@vue/reactivity'

const popover: Ref<any> = ref(null)

const props = defineProps<{
  options: Option[],
  /**
   * Data to be passed into option handler
   */
  data: any
}>()

function handleClick(option: Option) {
  popover.value.close()
  option.handler(props.data)
}
</script>
