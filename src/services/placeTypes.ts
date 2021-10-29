import axios from 'axios'
import { PlaceType } from '../models/Place'

const PLACE_TYPES_PATH = '/api/v1.0/place_types'

export async function getPlaceTypes(): Promise<PlaceType[]> {
  const { data } = await axios.get<PlaceType[]>(PLACE_TYPES_PATH)

  return data
}
