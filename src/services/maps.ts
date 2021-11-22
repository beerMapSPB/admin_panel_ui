import axios from 'axios'

const API_PATH = 'https://api.mapbox.com'
const GEOCODING_PATH = API_PATH + '/geocoding/v5/mapbox.places/'

export type MapPoint = {
  label: string,
  coordinates: [number, number]
}

type ApiResponse = {
  features: {
    /* eslint-disable camelcase */
    matching_place_name?: string
    place_name: string
    geometry: {
      coordinates: [number, number]
    }
    /* eslint-enable camelcase */
  }[]
}

export async function getGeocoding(query: string): Promise<MapPoint> {
  if (!query) {
    return {
      label: '',
      coordinates: [0, 0]
    }
  }
  const { data } = await axios.get<ApiResponse>(GEOCODING_PATH + query + '.json', { params: { access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN }})

  const point = data.features[0]

  return {
    label: point.matching_place_name || point.place_name,
    coordinates: point.geometry.coordinates
  }
}
