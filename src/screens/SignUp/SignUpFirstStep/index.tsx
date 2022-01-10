import React from 'react'
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

export function SignUpFirstStep(){
  const navigation = useNavigation<any>();
  
  return (
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
      </Form>
    </Container>
  )
}
