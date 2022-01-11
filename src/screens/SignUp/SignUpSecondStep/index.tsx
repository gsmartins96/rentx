import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
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

interface Params {
  user: {
    name: string; 
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep(){
  const navigation = useNavigation<any>();
  const route = useRoute()
  const { user } = route.params as Params;

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleRegister(){
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a confirmação de senha.')
    }

    if(password !== passwordConfirm){
      return Alert.alert('As senhas não são iguais.')
    }
  }
  
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
              value={password}
              onChangeText={setPassword}
            />      
            <InputPassword 
              iconName='lock'
              placeholder='Repetir senha'
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />      

          <Button 
            title="Criar Conta"
            color={theme.colors.success}
            onPress={handleRegister}
          />

          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
