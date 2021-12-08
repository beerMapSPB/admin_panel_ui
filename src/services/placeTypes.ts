import axios from 'axios'
import { Pageable } from '../models/Pageable'
import { Option, OptionImpl } from '../models/Option'
import { plainToClass } from 'class-transformer'

const API_PATH = import.meta.env.VITE_API_PATH || ''
const PLACE_TYPES_PATH = API_PATH + '/types'

export async function getPlaceTypes(): Promise<Option[]> {
  const { data } = await axios.get<Pageable<Option>>(PLACE_TYPES_PATH)

  return data.items.map(item => plainToClass(OptionImpl, item))
}
