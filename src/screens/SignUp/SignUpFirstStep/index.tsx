import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup';
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  async function handleNextStep(){
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH obrigatóra'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        name: Yup.string()
          .required('Nome obrigatório')
        })

      const data = { name, email, driverLicense }
      await schema.validate(data)

      navigation.navigate('SignUpSecondStep', { user: data })
    } catch (error) {
      if (error instanceof Yup.ValidationError){
        return Alert.alert('Opa', error.message)
      }
    }
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
              value={name}
              onChangeText={setName}
            />
            <Input 
              iconName="mail"
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              value={email}
              onChangeText={setEmail}
            />
            <Input 
              iconName="credit-card"
              placeholder='CNH'
              keyboardType='numeric'
              value={driverLicense}
              onChangeText={setDriverLicense}
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
