import { replaceUpdatedCity, removeUpdatedCity } from './helpers'
import cities from './cities.json'

const cityNoLongerWishlisted = {
  id: 1,
  name: 'London',
  country: 'United Kingdom',
  visited: true,
  wishlist: false,
}

const notFoundCity = {
  id: 1000,
  name: 'Marazion',
  country: 'United Kingdom',
  visited: true,
  wishlist: false,
}

describe('api testing suite', () => {
  describe('replaceUpdatedCity', () => {
    describe('if updatedCity parameter is null', () => {
      it('returns null', () => {
        expect(replaceUpdatedCity(cities, null)).toBe(null)
      })
    })

    describe('if updatedCity parameter is NOT in cities list', () => {
      it('returns cities list unchanged', () => {
        expect(replaceUpdatedCity(cities, notFoundCity)).toEqual(cities)
      })
    })

    describe('if updatedCity parameter is in cities list', () => {
      it('returns cities list with city updated', () => {
        const expectedResult = JSON.parse(JSON.stringify(cities))
        expectedResult[0].wishlist = false

        expect(replaceUpdatedCity(cities, cityNoLongerWishlisted)).toEqual(expectedResult)
      })
    })
  })

  describe('removeUpdatedCity', () => {
    describe('if updatedCity parameter is null', () => {
      it('returns null', () => {
        expect(removeUpdatedCity(cities, null)).toBe(null)
      })
    })

    describe('if updatedCity parameter is NOT in cities list', () => {
      it('returns cities list unchanged', () => {
        expect(removeUpdatedCity(cities, notFoundCity)).toEqual(cities)
      })
    })

    describe('if updatedCity parameter is in cities list', () => {
      it('returns cities list without the updated city', () => {
        const expectedResult = JSON.parse(JSON.stringify(cities))
        expectedResult.shift()

        expect(removeUpdatedCity(cities, cityNoLongerWishlisted)).toEqual(expectedResult)
      })
    })
  })
})
