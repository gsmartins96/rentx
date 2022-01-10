import React from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import {
  Container
} from './styles'

import theme from '../../styles/theme'

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({ iconName }: Props){
  return (
    <Container>
      <Feather 
        name={iconName}


      />
    </Container>
  )
}
