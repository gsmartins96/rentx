import React, { useState } from 'react'
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
  Content,
  Options,
  Option,
  OptionTitle,
} from './styles'

import theme from '../../styles/theme'

export function Profile(){
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  function handleSignOut(){}

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
    setOption(optionSelected)
  }

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

      <Content>
        <Options>
          <Option 
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange('dataEdit')}
          >
            <OptionTitle active={option === 'dataEdit'} >
              Dados
            </OptionTitle>
          </Option>
          <Option 
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange('passwordEdit')}
          >
            <OptionTitle active={option === 'passwordEdit'} >
              Trocar Senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  )
}