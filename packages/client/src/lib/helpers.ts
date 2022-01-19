import type { ICity } from './types'

export const replaceUpdatedCity = (cities: ICity[], updatedCity: ICity | null): ICity[] | null => {
  if (!updatedCity) return null
  return cities.map(city => (city.id === updatedCity.id ? updatedCity : city))
}

export const removeUpdatedCity = (cities: ICity[], updatedCity: ICity | null): ICity[] | null => {
  if (!updatedCity) return null
  return cities.filter(city => city.id !== updatedCity.id)
}
