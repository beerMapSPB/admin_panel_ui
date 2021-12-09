import axios from 'axios'
import { classToPlain, plainToClass } from 'class-transformer'
import { Option, OptionImpl } from '../models/Option'
import { Pageable } from '../models/Pageable'

const API_PATH = import.meta.env.VITE_API_PATH || ''
const TAGS_PATH = API_PATH + '/tags'

export async function createTag(tag: Option): Promise<Option> {
  const body = classToPlain(tag)
  const { data } = await axios.post<{ id: number, label: string }>(TAGS_PATH, body)

  return plainToClass(OptionImpl, data)
}

export async function getTags(): Promise<Option[]> {
  const { data } = await axios.get<Pageable<Option>>(TAGS_PATH)

  return data.items.map(item => plainToClass(OptionImpl, item))
}
