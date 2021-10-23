<template>
  <h1 class="text-lg font-medium mb-2">
    Places
  </h1>
  <Table :cols="tableCols"
         class="w-full"
         :data="places"
         :actions="tableActions"
  />
</template>

<script lang='ts' setup async>
import { onMounted, Ref, ref } from '@vue/runtime-core'
import { Place } from '/~/models/Place'
import { getPlaces } from '/~/services/places'
import Table from '/~/components/table/Table.vue'
import { Column } from '/~/components/table/types/Column'
import { useRouter } from 'vue-router'

const router = useRouter()
const places: Ref<Place[]> = ref([])

onMounted(async () => {
  places.value = await getPlaces()
})

const tableCols: Column[] = [
  {
    param: 'id',
    label: {
      text: 'ID'
    },
    type: 'text'
  },
  {
    param: 'title',
    label: {
      text: 'Title'
    },
    type: 'text'
  },
  {
    param: 'type',
    label: {
      text: 'Type'
    },
    type: 'text'
  },
  {
    param: 'address',
    label: {
      text: 'Address'
    },
    type: 'text'
  }
]

const tableActions = [
  {
    label: 'View',
    icon: 'eye',
    handler: (data: Place) => {
      router.push({ name: 'view-place', params: { id: data.id }})
    }
  },
  {
    label: 'Edit',
    icon: 'edit',
    handler: (data: Place) => {
      alert(data)
    }
  },
  {
    label: 'Delete',
    icon: 'trash',
    handler: (data: Place) => {
      alert(data)
    }
  }
]

</script>
