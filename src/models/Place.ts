import { Expose, Transform } from 'class-transformer'

export type PlaceId = string

export type PlaceType = {
  value: string,
  label: string
}

export type Tag = {
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
  location: [number, number]
  phones: string[]
  webSites: string[]
  socials: Social[]
  types: PlaceType[]
  tags: Tag[]
  logoUrl: string
  rating: Rating
  photosUrls: string[]
}

export class PlaceImpl implements Place {
  name = ''
  address = ''
  description = ''

  @Transform(({ value }) => [value.lat, value.lon])
  location = [0, 0] as [number, number]

  @Expose({ name: 'web_sites' })
  webSites = []

  socials = [{ name: '', link: '' }]

  types: PlaceType[] = []

  tags = []

  @Expose({ name: 'logo_url' })
  logoUrl = ''

  rating = { value: 0, votes: 0 }

  @Expose({ name: 'photo_urls' })
  photosUrls = []

  phones = ['']

  get typesLabels(): string[] {
    return this.types.map(item => item.label)
  }
}
