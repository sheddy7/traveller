import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Container, Heading, Text } from '@chakra-ui/react'
import { ListItemCard } from './ListItemCard'
import { IsLoadingHOC } from './IsLoadingHOC'
import { getWishlistCities } from '../lib/api'
import type { ICity } from '../lib/types'

type AppProps = {
  cities: ICity[]
  setCities: (cities: ICity[]) => void
  refresh: boolean
  setRefresh: (refresh: boolean) => void
  setError: (error: boolean) => void
  setLoading: (loading: boolean) => void
  onVisitedClick: (cities: ICity[], cityId: number, payload: { visited: boolean }) => Promise<ICity[] | null>
  onWishlistClick: (cities: ICity[], cityId: number, payload: { wishlist: boolean }) => Promise<ICity[] | null>
}

export const WishList: FC<AppProps> = ({
  cities,
  setCities,
  refresh,
  setRefresh,
  setError,
  setLoading,
  onVisitedClick,
  onWishlistClick,
}): JSX.Element => {
  useEffect(() => {
    const getCities = async (): Promise<void> => {
      const cities = await getWishlistCities()
      console.log(cities)
      if (!cities) {
        setError(true)
      } else {
        setCities(cities)
        setRefresh(false)
      }
      setLoading(false)
    }

    if (cities.length === 0 || refresh) {
      setLoading(true)
      getCities()
    }
  }, [])

  const handleVisitedClick = async (cityId: number, wasVisited: boolean): Promise<void> => {
    const payload = { visited: !wasVisited }
    const updatedCities = await onVisitedClick(cities, cityId, payload)
    if (!updatedCities) {
      setError(true)
    } else {
      setCities(updatedCities)
    }
  }

  const handleWishlistClick = async (cityId: number, wasWishlisted: boolean): Promise<void> => {
    const payload = { wishlist: !wasWishlisted }
    const updatedCities = await onWishlistClick(cities, cityId, payload)
    if (!updatedCities) {
      setError(true)
    } else {
      setCities(updatedCities)
    }
  }

  let message = `You have ${cities.length} cities on your wishlist`
  if (cities.length === 1) {
    message = 'You have 1 city on your wishlist'
  }

  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md">
        <Text p={4}>{message}</Text>
        {cities.map(city => (
          <ListItemCard
            key={city.id}
            city={city}
            onVisitedClick={handleVisitedClick}
            onWishlistClick={handleWishlistClick}
          />
        ))}
      </Container>
    </>
  )
}

export const WishListWithLoading = IsLoadingHOC(WishList)
