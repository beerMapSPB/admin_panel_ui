import axios from 'axios'
import { plainToClass, classToPlain } from 'class-transformer'
import { Pageable } from '../models/Pageable'
import { Place, PlaceId, PlaceImpl } from '../models/Place'

const API_PATH = import.meta.env.VITE_API_PATH || ''
const PLACES_PATH = API_PATH + '/places'

export async function getPlaces(): Promise<Place[]> {
  const { data } = await axios.get<Pageable<Place>>(PLACES_PATH)

  return data.items.map(item => plainToClass(PlaceImpl, item))
}

export async function getPlaceById(placeId: PlaceId): Promise<Place> {
  const { data } = await axios.get<Place>(PLACES_PATH + '/' + placeId)

  return plainToClass(PlaceImpl, data)
}

export async function createPlace(place: Place): Promise<Place> {
  const body = classToPlain(place)
  const { data } = await axios.post<Place>(PLACES_PATH, body)

  return plainToClass(PlaceImpl, data)
}

export async function updatePlace(placeId: PlaceId, place: Place): Promise<Place> {
  const body = classToPlain(place, { excludeExtraneousValues: true })
  const { data } = await axios.patch<Place>(PLACES_PATH + '/' + placeId, body)

  return plainToClass(PlaceImpl, data)
}

export async function deletePlaceById(placeId: PlaceId): Promise<void> {
  return axios.delete(PLACES_PATH + '/' + placeId)
}
