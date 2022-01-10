import React from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

export function SignUpFirstStep(){
  const navigation = useNavigation<any>();

  function handleNextStep(){
    navigation.navigate('SignUpSecondStep')
  }
  
  return (
    <KeyboardAvoidingView behavior='position' enabled >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua {'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input 
              iconName="user"
              placeholder='Nome'
              autoCorrect={false}
            />
            <Input 
              iconName="mail"
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
            />
            <Input 
              iconName="credit-card"
              placeholder='CNH'
              keyboardType='numeric'
            />

          <Button 
            title="Próximo"
            onPress={handleNextStep}
          />

          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
