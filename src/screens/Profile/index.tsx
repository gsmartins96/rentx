import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableNativeFeedback, Keyboard } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
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
  Section,
} from './styles'

import { useAuth } from '../../hooks/auth'

import theme from '../../styles/theme'

import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { BackButton } from '../../components/BackButton';

export function Profile(){
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const { user } = useAuth();

  function handleSignOut(){}

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
    setOption(optionSelected)
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
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

          <Content style={{ marginBottom: useBottomTabBarHeight() }} >
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

            {option === 'dataEdit' ? 
              <Section>
                <Input 
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input 
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input 
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                />
              </Section>
            :
              <Section>
                <InputPassword 
                  iconName='lock'
                  placeholder='Senha Atual'
                />
                <InputPassword 
                  iconName='lock'
                  placeholder='Nova Senha'
                />
                <InputPassword 
                  iconName='credit-card'
                  placeholder='Repetir Senha'
                />
              </Section>
            }
          </Content>
        </Container>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  )
}
