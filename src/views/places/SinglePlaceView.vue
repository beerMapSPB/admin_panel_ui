<template>
  <div v-if="place">
    <ViewHeader :title="place.name"
                :subtitle="'ID: ' + place.id"
    />
    {{ place }}
  </div>
</template>

<script lang='ts' setup>
import { Ref, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { Place } from '/~/models/Place'
import { getPlaceById } from '/~/services/places'
import ViewHeader from '/~/components/view-header/view-header.vue'

const props = defineProps<{
  id: string
}>()
const place: Ref<Place | null> = ref(null)

onMounted(async () => {
  place.value = await getPlaceById(props.id)
})

</script>
