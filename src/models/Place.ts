import { Expose, Transform } from 'class-transformer'

export type PlaceId = string

export type Option = {
  value: string,
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

export type Place = {
  id?: PlaceId
  name: string
  description: string
  address: string
  location: [number, number]
  phones: string[]
  webSites: string[]
  socials: Social[]
  types: Option[]
  tags: Option[]
  logoUrl: string
  rating: Rating
  photosUrls: string[]
}

export class PlaceImpl implements Place {
  @Expose()
  name = ''

  @Expose()
  address = ''

  @Expose()
  description = ''

  @Expose()
  @Transform(({ value }) => [value.lat, value.lon])
  location = [0, 0] as [number, number]

  @Expose({ name: 'web_sites' })
  webSites = []

  @Expose()
  socials = [{ name: '', link: '' }]

  @Expose()
  types: Option[] = []

  @Expose()
  tags: Option[] = []

  @Expose({ name: 'logo_url' })
  logoUrl = ''

  @Expose()
  rating = { value: 0, votes: 0 }

  @Expose({ name: 'photo_urls' })
  photosUrls = []

  @Expose()
  phones = ['']

  get typesLabelsString(): string {
    return this.types.map(item => item.label).join(', ')
  }
}
