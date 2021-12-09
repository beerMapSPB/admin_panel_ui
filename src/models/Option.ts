import { Expose } from 'class-transformer'

export type Option = {
  value?: number,
  label: string
}

export class OptionImpl implements Option {
  @Expose({ name: 'id' })
  value = -1

  @Expose()
  label = ''
}
