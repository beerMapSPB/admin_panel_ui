<template>
  <div class="flex justify-between px-6 py-6 mb-4">
    <div>
      <h1 class="text-xl font-medium">
        {{ title }}
      </h1>
      <h3 class="text-gray-500 text-sm">
        {{ subtitle }}
      </h3>
    </div>
    <slot name="actions" />
  </div>
</template>

<script lang='ts' setup>
defineProps<{
  title: string,
  subtitle: string
}>()
</script>
