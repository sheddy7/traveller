import React, { useState } from 'react'
import { Text } from '@chakra-ui/react'

type LoadingTypes = {
  setLoading: (loading: boolean) => void
  setError: (error: boolean) => void
}

export function IsLoadingHOC<P>(WrappedComponent: React.ComponentType<P & LoadingTypes>) {
  return (props: P): JSX.Element => {
    const [isLoading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
    const [error, setError]: [boolean, (error: boolean) => void] = useState<boolean>(false)

    const setLoadingState = (isComponentLoading: boolean): void => {
      setLoading(isComponentLoading)
    }
    const setErrorState = (isComponentErrored: boolean): void => {
      setError(isComponentErrored)
    }

    return (
      <>
        {error && <Text fontSize="2xl">An error has occured! Please reload the page to try again.</Text>}
        {!error && isLoading && <Text fontSize="2xl">Loading...</Text>}
        <WrappedComponent {...props} setLoading={setLoadingState} setError={setErrorState} />
      </>
    )
  }
}
