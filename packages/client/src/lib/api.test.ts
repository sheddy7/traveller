import axios from 'axios'
import { CITIES_URL, HEADERS, getCities, getVisitedCities, getWishlistCities, updateCityAttributes } from './api'
import cities from './cities.json'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const errorMessage = 'Network Error'

describe('api testing suite', () => {
  describe('getCities', () => {
    describe('when API call is successful', () => {
      it('should return a list of cities', async () => {
        mockedAxios.get.mockResolvedValue({ data: { cities } })

        const response = await getCities('lon')

        expect(axios.get).toHaveBeenCalledWith(`${CITIES_URL}?name=lon`, HEADERS)
        expect(response).toEqual(cities)
      })
    })

    describe('when API call fails', () => {
      it('should return null', async () => {
        mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)))

        const response = await getCities('lon')

        expect(axios.get).toHaveBeenCalledWith(`${CITIES_URL}?name=lon`, HEADERS)
        expect(response).toEqual(null)
      })
    })
  })

  describe('getVisitedCities', () => {
    describe('when API call is successful', () => {
      it('should return a list of cities', async () => {
        mockedAxios.get.mockResolvedValue({ data: { cities } })

        const response = await getVisitedCities()

        expect(axios.get).toHaveBeenCalledWith(`${CITIES_URL}?visited=true`, HEADERS)
        expect(response).toEqual(cities)
      })
    })
  })

  describe('getWishlistCities', () => {
    describe('when API call is successful', () => {
      it('should return a list of cities', async () => {
        mockedAxios.get.mockResolvedValue({ data: { cities } })

        const response = await getWishlistCities()

        expect(axios.get).toHaveBeenCalledWith(`${CITIES_URL}?wishlist=true`, HEADERS)
        expect(response).toEqual(cities)
      })
    })
  })

  describe('updateCityAttributes', () => {
    describe('when API call is successful', () => {
      it('should return the updated city', async () => {
        mockedAxios.put.mockResolvedValue({ data: { ...cities[0] } })

        const response = await updateCityAttributes(1, { visited: true })

        expect(axios.put).toHaveBeenCalledWith(`${CITIES_URL}/1`, { visited: true }, HEADERS)
        expect(response).toEqual(cities[0])
      })
    })

    describe('when API call fails', () => {
      it('should return null', async () => {
        mockedAxios.put.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)))

        const response = await updateCityAttributes(1, { visited: true })

        expect(axios.put).toHaveBeenCalledWith(`${CITIES_URL}/1`, { visited: true }, HEADERS)
        expect(response).toEqual(null)
      })
    })
  })
})
