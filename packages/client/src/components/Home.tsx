import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack, Text } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { ListItemCard } from './ListItemCard'
import { IsLoadingHOC } from './IsLoadingHOC'
import { getCities } from '../lib/api'
import type { ICity } from '../lib/types'

type AppProps = {
  cities: ICity[]
  setCities: (cities: ICity[]) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  setError: (error: boolean) => void
  setLoading: (loading: boolean) => void
  onVisitedClick: (cities: ICity[], cityId: number, payload: { visited: boolean }) => Promise<ICity[] | null>
  onWishlistClick: (cities: ICity[], cityId: number, payload: { wishlist: boolean }) => Promise<ICity[] | null>
}

export const Home: FC<AppProps> = ({
  cities,
  setCities,
  searchTerm,
  setSearchTerm,
  setError,
  setLoading,
  onVisitedClick,
  onWishlistClick,
}): JSX.Element => {
  useEffect(() => {
    setLoading(false)
  }, [])

  const handleSearchClick = async (): Promise<void> => {
    setLoading(true)
    const cities = await getCities(searchTerm)
    if (!cities) {
      setError(true)
    } else {
      setCities(cities)
    }
    setLoading(false)
  }

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

  const renderCities = (): JSX.Element => {
    let message = 'No cities found. Please enter/update the search term.'
    if (cities.length > 0) {
      message = `Your search found ${cities.length} cities`
    }

    return (
      <>
        <Text p={4}>{message}</Text>
        {cities.map(city => (
          <ListItemCard
            key={city.id}
            city={city}
            onVisitedClick={handleVisitedClick}
            onWishlistClick={handleWishlistClick}
          />
        ))}
      </>
    )
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input
            aria-label="Enter city name"
            id="search"
            value={searchTerm}
            onChange={event => setSearchTerm(event.currentTarget.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') handleSearchClick()
            }}
            placeholder="Enter all or part of the city name to search"
          />
          <InputRightElement
            children={<IconButton aria-label="Search cities" icon={<Search2Icon />} onClick={handleSearchClick} />}
          />
        </InputGroup>
        {renderCities()}
      </Container>
    </VStack>
  )
}

export const HomeWithLoading = IsLoadingHOC(Home)
