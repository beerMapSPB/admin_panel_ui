import axios from 'axios'
import { PlaceType } from '../models/Place'

const API_PATH = import.meta.env.VITE_API_PATH || ''
const PLACE_TYPES_PATH = API_PATH + '/api/v1.0/place_types'

export async function getPlaceTypes(): Promise<PlaceType[]> {
  const { data } = await axios.get<{id: string, label: string}[]>(PLACE_TYPES_PATH)

  return data.map(item => ({ value: item.id, label: item.label }))
}
