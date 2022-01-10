import React from 'react'
import { StatusBar } from 'react-native'
import {
  Container,
  Header,
  Title,
  Form,
  SubTitle,
  Footer,
} from './styles'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/InputPassword'

import theme from '../../styles/theme'

export function SignIn(){
  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Header>
        <Title>Estamos {'\n'}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar {'\n'}
          uma experiência incrível
        </SubTitle>
      </Header>

      <Form>
        <Input 
          iconName='mail'
          placeholder='E-mail'
          keyboardType='email-address'
          autoCorrect={false}
          autoCapitalize='none'
        />
        <InputPassword 
          iconName='lock'
          placeholder='Senha'
        />
        
      </Form>


      <Footer>
        <Button 
          title="Login"
          onPress={() => {}}
          enabled={true}
          loading={false}
        />
        <Button 
          title="Criar conta gratuita"
          color={theme.colors.background_secundary}
          light
          onPress={() => {}}
          enabled={true}
          loading={false}
        />
      </Footer>
    </Container>
  )
}
