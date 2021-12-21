import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components'
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueContainer,
  Content,
  Footer,
} from './styles'

import { BackButton } from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export function Scheduling(){
  const navigation = useNavigation<any>();
  const theme = useTheme();

  function handleConfirmRental(){
    navigation.navigate('SchedulingDetails');
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
      <Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'} data de início e {'\n'} fim do aluguel 
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue></DateValue>
            </DateValueContainer>
          </DateInfo>
          
          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValueContainer selected={true}>
              <DateValue>19/10/2022</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}
