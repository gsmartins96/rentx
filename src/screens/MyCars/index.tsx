import React, { useEffect, useState } from 'react'
import { StatusBar, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/core'
import { format, parseISO } from 'date-fns';
import { AntDesign } from '@expo/vector-icons'
import {
  Container,
  Header, 
  SubTitle, 
  Title,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'
import theme from '../../styles/theme';

import api from '../../services/api';
import { Car as ModelCar } from '../../database/model/Car';

import { Car } from '../../components/Car'
import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars(){
  const [cars, setCars] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true); 
  const screenIsFocus = useIsFocused();

  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get('/rentals');
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
          }
        })
        setCars(dataFormatted);
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchCars()
  }, [screenIsFocus])


  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
      <Header>
        <BackButton color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel 
        </Title>

        <SubTitle>Confoto, segurança e praticidade</SubTitle>
      </Header>

      {loading ? <LoadAnimation /> : 
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />  
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign name="arrowright" size={20} color={theme.colors.title} style={{ marginHorizontal: 10 }} />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }

    </Container>
  )
}
