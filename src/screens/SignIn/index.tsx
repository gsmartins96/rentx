import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { 
  StatusBar, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import * as Yup from 'yup';
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

import { useAuth } from '../../hooks/auth'

import theme from '../../styles/theme'

export function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const { signIn } = useAuth()

  async function handleSignIn(){
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error){
      if (error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message)
      } else {
        Alert.alert(
          'Error na autenticação', 
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        )
      }
    }
  }

  function handleNewAccount(){
    navigation.navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              value={email}
              onChangeText={setEmail}
            />
            <InputPassword 
              iconName='lock'
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
            />
          </Form>
          
          <Footer>
            <Button 
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button 
              title="Criar conta gratuita"
              color={theme.colors.background_secundary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
