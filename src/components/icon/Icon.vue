
<script lang='ts' setup>
import * as feather from 'feather-icons'

const props = defineProps({
  name: {
    type: String,
    required: true,
    validator(name: string) {
      if (!feather) {
        throw new Error('The Feather icons is required.')
      }
      if (!feather.icons[name]) {
        throw new Error(`"${name}" is not an available icon type.`)
      }
      return true
    }
  },
  size: {
    type: [Number, String],
    default: 24
  },
  strokeWidth: {
    type: [Number, String],
    default: 2
  },
  tag: {
    type: String,
    default: 'i'
  }
})

const icon = feather.icons[props.name]
</script>

<template>
  <component :is="tag"
             v-bind="$attrs"
             :data-name="name"
             :data-tags="icon.tags"
             :data-type="name"
  >
    <!-- eslint-disable vue/no-v-html -->
    <svg v-bind="icon.attrs"
         :height="size"
         :width="size"
         :stroke-width="strokeWidth"
         :class="[icon.attrs.class]"
         v-html="icon.contents"
    />
  </component>
</template>
