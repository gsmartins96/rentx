import React, { useEffect, useState } from 'react'
import { StatusBar, FlatList } from 'react-native';
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

import { Car } from '../../components/Car'
import { BackButton } from '../../components/BackButton';

import { CarDTO } from '../../dtos/CarsDTO'
import { Load } from '../../components/Load';

interface CarProps{
  id: number;
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get('/schedules_byuser?user_id=1');

        setCars(response.data);
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchCars()
  }, [])

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

      {loading ? <Load /> : 
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
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign name="arrowright" size={20} color={theme.colors.title} style={{ marginHorizontal: 10 }} />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
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
