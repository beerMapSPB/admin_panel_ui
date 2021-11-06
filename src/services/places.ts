import axios from 'axios'
import { plainToClass, classToPlain } from 'class-transformer'
import { Place, PlaceId, PlaceImpl } from '../models/Place'

const PLACES_PATH = '/api/v1.0/places'

export async function getPlaces(): Promise<Place[]> {
  const { data } = await axios.get<Place[]>(PLACES_PATH)

  return data.map(item => plainToClass(PlaceImpl, item))
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
  const body = classToPlain(place)
  const { data } = await axios.put<Place>(PLACES_PATH + '/' + placeId, body)

  return plainToClass(PlaceImpl, data)
}

export async function deletePlace(placeId: PlaceId): Promise<void> {
  return axios.delete(PLACES_PATH + '/' + placeId)
}
