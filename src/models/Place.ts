import { Expose, Transform, Type } from 'class-transformer'
import { OptionImpl, Option } from './Option'

export type PlaceId = string

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
  typesIds: (number | undefined)[]
  tags: Option[]
  tagsIds: (number | undefined)[]
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
  @Type(() => OptionImpl)
  types: Option[] = []

  @Expose({ name: 'types_ids' })
  typesIds: (number | undefined)[] = []

  @Expose()
  @Type(() => OptionImpl)
  tags: Option[] = []

  @Expose({ name: 'tags_ids' })
  tagsIds: (number | undefined)[] = []

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
