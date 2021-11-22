import axios from 'axios'
import { Pageable } from '../models/Pageable'
import { PlaceType } from '../models/Place'

const API_PATH = import.meta.env.VITE_API_PATH || ''
const PLACE_TYPES_PATH = API_PATH + '/types'

export async function getPlaceTypes(): Promise<PlaceType[]> {
  const { data } = await axios.get<Pageable<{id: string, name: string}>>(PLACE_TYPES_PATH)

  return data.items.map(item => ({ value: item.id, label: item.name }))
}
