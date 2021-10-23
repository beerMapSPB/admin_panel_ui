<template>
  <div v-if="place">
    <h1 class="text-lg font-medium mb-2">
      {{ place?.title }}
    </h1>
    {{ place }}
  </div>
</template>

<script lang='ts' setup>
import { Ref, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { Place } from '/~/models/Place'
import { getPlaceById } from '/~/services/places'

const props = defineProps<{
  id: string
}>()
const place: Ref<Place | null> = ref(null)

onMounted(async () => {
  place.value = await getPlaceById(props.id)
})

</script>
