import React from 'react'
import { BackButton } from '../../components/BackButton'
import { Feather } from '@expo/vector-icons'
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
} from './styles'

import theme from '../../styles/theme'

export function Profile(){
  function handleSignOut(){}

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut} > 
            <Feather name='power' size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: 'https://github.com/gsmartins96.png' }} />
          <PhotoButton onPress={() => {}}>
            <Feather name='camera' size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  )
}
