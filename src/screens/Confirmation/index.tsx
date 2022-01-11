import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar, useWindowDimensions } from 'react-native'
import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles'

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';

interface Params {
  title: string;
  message: string;
  nextScreenName: string;
}

{/* 
 * Required: title, message, nextScreenName 
 */}
export function Confirmation(){
  const route = useRoute()
  const { title, message, nextScreenName } = route.params as Params;
  const navigation = useNavigation<any>();

  const { width } = useWindowDimensions()

  function handleConfirm(){
    navigation.navigate(nextScreenName);
  }

  return (
    <Container>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}
