import React, { useState } from 'react'
import type { FC } from 'react'
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { TopBar } from './components/TopBar'
import { HomeWithLoading } from './components/Home'
import { WishListWithLoading } from './components/WishList'
import { VisitedWithLoading } from './components/Visited'
import { updateCityAttributes } from './lib/api'
import { replaceUpdatedCity, removeUpdatedCity } from './lib/helpers'
import type { ICity } from './lib/types'

const fonts = {
  heading:
    '"Museo Sans", museo-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Lato", lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  // chakra default
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}
const defaultCities: ICity[] = []

export const App: FC = (): JSX.Element => {
  const [cities, setCities]: [ICity[], (cities: ICity[]) => void] = useState<ICity[]>(defaultCities)
  const [visitedCities, setVisitedCities]: [ICity[], (visitedCities: ICity[]) => void] =
    useState<ICity[]>(defaultCities)
  const [wishlistCities, setWishlistCities]: [ICity[], (wishlistCities: ICity[]) => void] =
    useState<ICity[]>(defaultCities)
  const [searchTerm, setSearchTerm]: [string, (searchTerm: string) => void] = useState<string>('')
  const [refreshVisited, setRefreshVisited]: [boolean, (refreshVisited: boolean) => void] = useState<boolean>(true)
  const [refreshWishlist, setRefreshWishlist]: [boolean, (refreshWishlist: boolean) => void] = useState<boolean>(true)

  const updateAttributeAndReplace = async (
    cities: ICity[],
    cityId: number,
    payload: { visited?: boolean; wishlist?: boolean }
  ): Promise<ICity[] | null> => {
    const updatedCity = await updateCityAttributes(cityId, payload)
    setRefreshVisited(true)
    setRefreshWishlist(true)
    return replaceUpdatedCity(cities, updatedCity)
  }

  const updateAttributeAndRemove = async (
    cities: ICity[],
    cityId: number,
    payload: { visited?: boolean; wishlist?: boolean }
  ): Promise<ICity[] | null> => {
    const updatedCity = await updateCityAttributes(cityId, payload)
    setRefreshVisited(true)
    setRefreshWishlist(true)
    return removeUpdatedCity(cities, updatedCity)
  }

  return (
    <ChakraProvider theme={extendTheme({ fonts })}>
      <TopBar />
      <Box textAlign="center">
        <Routes>
          <Route
            index
            element={
              // @ts-expect-error New to Typescript and didn't have time to solve this one!
              <HomeWithLoading
                cities={cities}
                setCities={setCities}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onVisitedClick={updateAttributeAndReplace}
                onWishlistClick={updateAttributeAndReplace}
              />
            }
          />
          <Route
            path="wish-list"
            element={
              // @ts-expect-error New to Typescript and didn't have time to solve this one!
              <WishListWithLoading
                cities={wishlistCities}
                setCities={setWishlistCities}
                refresh={refreshWishlist}
                setRefresh={setRefreshWishlist}
                onVisitedClick={updateAttributeAndReplace}
                onWishlistClick={updateAttributeAndRemove}
              />
            }
          />
          <Route
            path="visited"
            element={
              // @ts-expect-error New to Typescript and didn't have time to solve this one!
              <VisitedWithLoading
                cities={visitedCities}
                setCities={setVisitedCities}
                refresh={refreshVisited}
                setRefresh={setRefreshVisited}
                onVisitedClick={updateAttributeAndRemove}
                onWishlistClick={updateAttributeAndReplace}
              />
            }
          />
        </Routes>
      </Box>
    </ChakraProvider>
  )
}
