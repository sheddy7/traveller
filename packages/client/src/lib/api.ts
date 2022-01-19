import axios from 'axios'
import type { ICity } from './types'

export const CITIES_URL = 'http://localhost:4000/rest/cities'
export const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const getCitiesWithQuery = async (query: string): Promise<ICity[] | null> => {
  try {
    const response = await axios.get(`${CITIES_URL}?${query}`, HEADERS)
    return response.data.cities
  } catch (err) {
    return null
  }
}

export const getCities = async (searchTerm: string): Promise<ICity[] | null> =>
  await getCitiesWithQuery(`name=${searchTerm}`)

export const getVisitedCities = async (): Promise<ICity[] | null> => await getCitiesWithQuery('visited=true')

export const getWishlistCities = async (): Promise<ICity[] | null> => await getCitiesWithQuery('wishlist=true')

export const updateCityAttributes = async (
  cityId: number,
  payload: { visited?: boolean; wishlist?: boolean }
): Promise<ICity | null> => {
  try {
    const response = await axios.put(`${CITIES_URL}/${cityId}`, payload, HEADERS)

    return response.data
  } catch (err) {
    return null
  }
}
