import axios from 'axios'
import { Place, PlaceId } from '../models/Place'

const PLACES_PATH = '/api/v1.0/places'

export async function getPlaces(): Promise<Place[]> {
  const { data } = await axios.get<Place[]>(PLACES_PATH)

  return data
}

export async function getPlaceById(placeId: PlaceId): Promise<Place> {
  const { data } = await axios.get<Place>(PLACES_PATH + '/' + placeId)

  return data
}

export async function createPlace(body: Place): Promise<Place> {
  const { data } = await axios.post<Place>(PLACES_PATH, { body })

  return data
}

export async function updatePlace(placeId: PlaceId, body: Place): Promise<Place> {
  const { data } = await axios.put<Place>(PLACES_PATH + '/' + placeId, { body })

  return data
}

export async function deletePlace(placeId: PlaceId): Promise<void> {
  return axios.delete(PLACES_PATH + '/' + placeId)
}
