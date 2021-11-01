export type PlaceId = string

export type PlaceType = {
  id: string,
  label: string
}

export type Social = {
  name: string,
  link: string
}

export type Rating = {
  value: number
  votes: number
}

export type Location = {
  lat: number,
  lng: number
}

export type Place = {
  id?: PlaceId
  name: string
  description: string
  address: string
  location: Location
  phones: string[]
  webSite: string
  socials: Social[]
  types: PlaceType[]
  tags: string[]
  logoUrl: string
  rating: Rating
  photosUrls: string[]
}

export class PlaceImpl implements Place {
  name = ''
  address = ''
  description = ''
  location = { lat: 0, lng: 0 }
  webSite = ''
  socials = [{ name: '', link: '' }]
  types: PlaceType[] = []
  tags = []
  logoUrl = ''
  rating = { value: 0, votes: 0 }
  photosUrls = []
  phones = ['']

  get typesLabels(): string[] {
    return this.types.map(item => item.label)
  }
}
