<template>
  <ViewHeader title="Places"
              :subtitle="'Total ' + placesCount"
  >
    <template #actions>
      <Button @click="goToNewPlaceForm()">
        Add
      </Button>
    </template>
  </ViewHeader>
  <Table :cols="tableCols"
         class="w-full"
         :data="places"
         :actions="tableActions"
  />
</template>

<script lang='ts' setup>
import { Button } from 'noidea-ui'
import { computed, onMounted, Ref, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { Place } from '/~/models/Place'
import { getPlaces } from '/~/services/places'
import Table from '/~/components/table/Table.vue'
import { Column } from '/~/components/table/types/Column'
import ViewHeader from '/~/components/view-header/view-header.vue'

const router = useRouter()
const places: Ref<Place[]> = ref([])
const placesCount = computed<number>(() => places.value.length)

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
    param: 'name',
    label: {
      text: 'Title'
    },
    type: 'text'
  },
  {
    param: 'types',
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
      router.push({ name: 'edit-place', params: { id: data.id }})
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

function goToNewPlaceForm() {
  router.push({ name: 'create-place' })
}

</script>
