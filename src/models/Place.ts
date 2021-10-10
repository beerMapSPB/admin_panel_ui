export type PlaceId = string

export type PlaceType = 'bar' | 'beershop'

export type Place = {
  id: PlaceId
  type: PlaceType
  title: string
  address: string
  description: string
  phone: number
}
