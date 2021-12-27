import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components'
import { format } from 'date-fns';
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

import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarsDTO';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling(){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();

  function handleConfirmRental(){
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
      Alert.alert('Selecione um período para alugar o carro');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDate)
      });
    }
  }

  function handleChangeDate(date: DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end)
    setMarkedDate(interval)

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
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
            <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
          
          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDate}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}
