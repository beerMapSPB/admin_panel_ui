<template>
  <div id="map"
       class="w-full h-96"
  />
</template>

<script lang='ts' setup>
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import { onMounted } from '@vue/runtime-core'

const props = defineProps<{
  point: [number, number]
  label?: string
}>()

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: props.point, // starting position [lng, lat]
    zoom: 13 // starting zoom
  })

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl())

  const marker = new mapboxgl.Marker()
    .setLngLat(props.point)
    .addTo(map)

  if (props.label) {
    const popup = new mapboxgl.Popup()
      .setText(props.label)
      .addTo(map)

    marker.setPopup(popup)
  }
})

</script>

<style>
  .mapboxgl-popup-close-button {
    padding: 1px 4px;
    line-height: normal
  }
</style>
