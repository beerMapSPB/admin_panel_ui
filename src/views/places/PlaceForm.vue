<template>
  <ViewHeader :title="pageTitle"
              :subtitle="pageSubtitle"
  >
    <template #actions>
      <Button :loading="processing"
              @click="submit"
      >
        Save
      </Button>
    </template>
  </ViewHeader>

  <div v-if="form"
       class="px-6 grid grid-cols-1 xl:grid-cols-2 gap-8"
  >
    <Input v-model="form.name"
           label="Name"
           placeholder="Place name"
           required
    />
    <Multiselect v-model="form.types"
                 :options="placeTypesOptions"
                 required
                 label="Place type"
                 placeholder="Select a type"
    />
    <Textarea v-model="form.description"
              label="Description"
              placeholder="Description"
    />

    <Input v-model="form.address"
           label="Address"
           placeholder="Place address"
           required
           class="xl:col-start-2 xl:col-end-2 xl:row-start-1 xl:row-end-1"
    />
    <Map :key="form.location[0]"
         :point="form.location"
         :label="form.address"
         class="xl:col-start-2 xl:col-end-2 xl:row-start-2 xl:row-end-6"
    />
    <Input v-model="form.webSite"
           label="Web site"
           placeholder="Web site url"
    />
    <div v-for="(phone, i) in form.phones"
         :key="'phone-' + i"
         class="flex items-end w-full space-x-2"
    >
      <Input v-model="form.phones[i]"
             :label="`Phone number (${i + 1})`"
             placeholder="Phone number"
             class="flex-grow"
      />
      <Button v-if="i === form.phones.length - 1"
              size="sm"
              look="border"
              rounded
              class="mb-1.5"
      >
        <Icon name="plus"
              :size="16"
              @click="addPhone"
        />
      </Button>
      <Button v-else
              size="sm"
              look="border"
              rounded
              class="mb-1.5"
              color="accent"
      >
        <Icon name="trash"
              :size="16"
              @click="removePhone(i)"
        />
      </Button>
    </div>
    <div v-for="(social, i) in form.socials"
         :key="social.name"
         class="flex items-end space-x-2"
    >
      <Select v-model="form.socials[i].name"
              :options="socialMediaOptions"
              :label="`Social media name (${i + 1})`"
              class="flex-grow"
              placeholder="Select social media"
      />
      <Input v-model="form.socials[i].link"
             :label="`Link (${i + 1})`"
             class="flex-grow"
             placeholder="Link to social media"
      />
      <Button v-if="i === form.phones.length - 1"
              size="sm"
              look="border"
              rounded
              class="mb-1.5"
      >
        <Icon name="plus"
              :size="16"
              @click="addSocialMedia"
        />
      </Button>
      <Button v-else
              size="sm"
              look="border"
              rounded
              class="mb-1.5"
              color="accent"
      >
        <Icon name="trash"
              :size="16"
              @click="removeSocialMedia(i)"
        />
      </Button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, markRaw, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import ViewHeader from '/~/components/view-header/view-header.vue'
import Map from '../../components/map/Map.vue'
import { Place, PlaceImpl } from '/~/models/Place'
import { getPlaceById, createPlace, updatePlace } from '/~/services/places'
import { Button, Input, Multiselect, Textarea, Select } from 'noidea-ui'
import { getPlaceTypes } from '/~/services/placeTypes'
import Icon from '/~/components/icon/Icon.vue'
import { getGeocoding } from '/~/services/maps'
import { useRouter } from 'vue-router'

const router = useRouter()
const pageTitle = computed<string>(() => props.id ? 'Edit place' : 'Create place')
const pageSubtitle = computed<string>(() => props.id ? 'ID: ' + props.id : 'Fill in all the required form fields')
const placeTypesOptions = ref<{label: string, value: string}[]>([])
const socialMediaOptions = [{ label: 'instagram', value: 'instagram' }, { label: 'telegram', value: 'telegram' }]
const processing = ref(false)
const form = ref<Place | null>(null)

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

  placeTypesOptions.value = placeTypes
})

watch(form, async (value, oldValue) => {
  if (!value || !form.value || value.address === oldValue?.address) {
    return
  }
  const point = await getGeocoding(value.address)

  form.value.location = markRaw(point.coordinates)
}, { deep: true })

function addPhone() {
  form.value?.phones.push('')
}

function addSocialMedia() {
  form.value?.socials.push({ name: '', link: '' })
}

function removePhone(i: number) {
  form.value?.phones.splice(i, 1)
}

function removeSocialMedia(i: number) {
  form.value?.socials.splice(i, 1)
}

async function submit() {
  if (!form || !form.value) {
    return
  }
  try {
    processing.value = true

    if (props.id) {
      await updatePlace(props.id, form.value)
    } else {
      await createPlace(form.value)
    }
    router.push({ name: 'places-list' })
  } finally {
    processing.value = false
  }
}

</script>
