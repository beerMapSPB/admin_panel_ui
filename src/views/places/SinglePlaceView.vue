<template>
  <div v-if="place">
    <ViewHeader :title="place.name"
                :subtitle="'ID: ' + place.id"
    >
      <template #actions>
        <div class="space-x-4">
          <Button size="sm"
                  @click="goToEditForm"
          >
            Edit
          </Button>
          <Button size="sm"
                  color="accent"
                  @click="removePlace"
          >
            Delete
          </Button>
        </div>
      </template>
    </ViewHeader>
    <table class="text-left xl:mx-6">
      <tr>
        <th class="align-top px-6 py-2 bg-gray-50 border border-l-0">
          Types
        </th>
        <td class="px-6 py-2 border border-r-0">
          <p v-for="type in place.types"
             :key="type.value"
          >
            {{ type }}
          </p>
        </td>
      </tr>
      <tr>
        <th class="align-top px-6 py-2 bg-gray-50 border border-l-0">
          Tags
        </th>
        <td class="px-6 py-2">
          <Tag v-for="tag in place.tags"
               :key="tag.label"
               class="mr-2"
          >
            {{ tag.label }}
          </Tag>
        </td>
      </tr>
      <tr>
        <th class="px-6 py-2 bg-gray-50 border border-l-0">
          Address
        </th>
        <td class="px-6 py-2 border border-r-0">
          {{ place.address }}
        </td>
      </tr>
      <tr>
        <th class="px-6 py-2 bg-gray-50 border border-l-0">
          Description
        </th>
        <td class="px-6 py-2 border border-r-0">
          {{ place.description }}
        </td>
      </tr>
      <tr>
        <th class="align-top px-6 py-2 bg-gray-50 border border-l-0">
          Phones
        </th>
        <td class="px-6 py-2 border border-r-0">
          <p v-for="phone in place.phones"
             :key="phone"
          >
            {{ phone }}
          </p>
        </td>
      </tr>
      <tr>
        <th class="align-top px-6 py-2 bg-gray-50 border border-l-0">
          Web sites
        </th>
        <td class="px-6 py-2 border border-r-0">
          <p v-for="site in place.webSites"
             :key="site"
          >
            {{ site }}
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang='ts' setup>
import { Ref, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { Place } from '/~/models/Place'
import { getPlaceById, deletePlace } from '/~/services/places'
import ViewHeader from '/~/components/view-header/view-header.vue'
import { Button, Tag } from 'noidea-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  id: string
}>()
const place: Ref<Place | null> = ref(null)

onMounted(async () => {
  place.value = await getPlaceById(props.id)
})

function goToEditForm() {
  router.push({ name: 'edit-place', params: { id: props.id }})
}

async function removePlace() {
  const confirmed = confirm('Are you sure you want to delete place ' + place.value?.name + '?')

  if (confirmed) {
    await deletePlace(props.id)
    router.push({ name: 'places-list' })
  }
}

</script>
