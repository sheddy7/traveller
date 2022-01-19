import React from 'react'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from './test-utils'
import { App } from './App'
import cities from './lib/cities.json'
import type { ICity } from './lib/types'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('<App /> component', () => {
  describe('when network call is successful', () => {
    it('should display expected cities when user searches', async () => {
      const promise: Promise<{ data: { cities: ICity[] } }> = Promise.resolve({ data: { cities } })

      mockedAxios.get.mockImplementationOnce(() => promise)

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      const searchBar = screen.getByRole('textbox', { name: /enter city name/i })
      userEvent.type(searchBar, 'lon')

      await userEvent.click(screen.getByLabelText('Search cities'))

      expect(screen.getByText('Loading...')).toBeInTheDocument()

      // @ts-expect-error New to Typescript and didn't have time to solve this one!
      await act((): Promise<{ data: { cities: ICity[] } }> => promise)

      expect(screen.getByText('London - United Kingdom')).toBeInTheDocument()
      expect(screen.getByText('Barcelona - Spain')).toBeInTheDocument()
      expect(screen.getByText('Thessaloniki - Greece')).toBeInTheDocument()
      expect(screen.getByText('Badalona - Spain')).toBeInTheDocument()
    })
  })
  describe('when network call is unsuccessful', () => {
    it('should display expected error message', async () => {
      mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error()))

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      const searchBar = screen.getByRole('textbox', { name: /enter city name/i })
      userEvent.type(searchBar, 'lon')

      await userEvent.click(screen.getByLabelText('Search cities'))

      const message = await screen.findByText('An error has occured! Please reload the page to try again.')

      expect(message).toBeInTheDocument()
    })
  })
  describe('when user browses to Visited tab', () => {
    it('should display expected visted cities', async () => {
      const visitedCities = JSON.parse(JSON.stringify(cities))
      visitedCities.pop()
      const promise: Promise<{ data: { cities: ICity[] } }> = Promise.resolve({ data: { cities: visitedCities } })

      mockedAxios.get.mockImplementationOnce(() => promise)

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      userEvent.click(screen.getByRole('link', { name: /visited/i }))

      expect(screen.getByText('Loading...')).toBeInTheDocument()

      // @ts-expect-error New to Typescript and didn't have time to solve this one!
      await act((): Promise<{ data: { cities: ICity[] } }> => promise)

      expect(screen.getByText('London - United Kingdom')).toBeInTheDocument()
      expect(screen.getByText('Barcelona - Spain')).toBeInTheDocument()
      expect(screen.getByText('Thessaloniki - Greece')).toBeInTheDocument()
    })
  })
})
