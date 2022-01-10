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
import { InputPassword } from '../../../components/InputPassword'
import { Button } from '../../../components/Button'
import theme from '../../../styles/theme'

export function SignUpSecondStep(){
  const navigation = useNavigation<any>();
  
  return (
    <KeyboardAvoidingView behavior='position' enabled >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton />
            <Steps>
              <Bullet />
              <Bullet active />
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
            <FormTitle>2. Senha</FormTitle>

            <InputPassword 
              iconName='lock'
              placeholder='Senha'
            />      
            <InputPassword 
              iconName='lock'
              placeholder='Repetir senha'
            />      

          <Button 
            title="Criar Conta"
            color={theme.colors.success}
          />

          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
