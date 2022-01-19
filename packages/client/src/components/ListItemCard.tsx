import React from 'react'
import type { FC } from 'react'
import { Box, Checkbox, HStack, Flex, Spacer, useColorModeValue } from '@chakra-ui/react'
import type { ICity } from '../lib/types'

type AppProps = {
  city: ICity
  onVisitedClick: (id: number, visited: boolean) => void
  onWishlistClick: (id: number, wishlist: boolean) => void
}

export const ListItemCard: FC<AppProps> = ({ city, onVisitedClick, onWishlistClick }) => {
  const { id, name, country, visited, wishlist } = city
  const bgColor = useColorModeValue('gray.600', 'gray.200')
  const textColor = useColorModeValue('white', 'black')
  const checkboxBorderColor = useColorModeValue('white', 'black')

  return (
    <Box id={id.toString()} bg={bgColor} w="100%" p={4} color={textColor} borderWidth="1px" borderRadius="lg" mt={4}>
      <Flex>
        <Box>
          {name} - {country}
        </Box>
        <Spacer />
        <HStack spacing="50">
          <Checkbox
            aria-label="visited"
            colorScheme="green"
            borderColor={checkboxBorderColor}
            isChecked={visited}
            onChange={() => onVisitedClick(id, visited)}
          >
            Visited
          </Checkbox>
          <Checkbox
            aria-label="wishlist"
            colorScheme="green"
            borderColor={checkboxBorderColor}
            isChecked={wishlist}
            onChange={() => onWishlistClick(id, wishlist)}
          >
            Wishlist
          </Checkbox>
        </HStack>
      </Flex>
    </Box>
  )
}
