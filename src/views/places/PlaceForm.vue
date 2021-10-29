<template>
  <ViewHeader :title="pageTitle"
              :subtitle="pageSubtitle"
  >
    <template #actions>
      <Button>
        Save
      </Button>
    </template>
  </ViewHeader>

  <form v-if="form"
        class="max-w-lg px-6 space-y-8"
  >
    <Input v-model="form.name"
           label="Name"
           placeholder="Place name"
           required
    />
    <Input v-model="form.description"
           label="Description"
           placeholder="Description"
    />
    <Select :options="placeTypesOptions"
            label="Place type"
            placeholder="Select a type"
    />
    <Input v-model="form.webSite"
           label="Web site"
           placeholder="Web site url"
    />
  </form>
</template>

<script lang='ts' setup>
import { computed, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import ViewHeader from '/~/components/view-header/view-header.vue'
import { Place, PlaceImpl } from '/~/models/Place'
import { getPlaceById } from '/~/services/places'
import { Button, Input, Select } from 'noidea-ui'
import { getPlaceTypes } from '/~/services/placeTypes'

const pageTitle = computed<string>(() => props.id ? 'Edit place' : 'Create place')
const pageSubtitle = computed<string>(() => props.id ? 'ID: ' + props.id : 'Fill in all the required form fields')
const form = ref<Place | null>(null)
const placeTypesOptions = ref<{label: string, value: string}[]>([])

const props = defineProps<{
  id?: string
}>()

onMounted(async () => {
  if (props.id) {
    form.value = await getPlaceById(props.id)
  } else {
    form.value = new PlaceImpl()
  }
  const placeTypes = await getPlaceTypes()

  placeTypesOptions.value = placeTypes.map(item => ({ label: item.label, value: item.id }))
})

</script>
