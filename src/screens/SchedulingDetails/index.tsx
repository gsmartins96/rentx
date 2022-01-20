import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { format } from 'date-fns/esm'
import { useNetInfo } from '@react-native-community/netinfo'
import {
  Container,
  Header,
  CarImages,
  ContentScrollView,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetail,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlataformDate'
import { CarDTO } from '../../dtos/CarsDTO'

import api from '../../services/api'
import { Alert } from 'react-native'
import { useAuth } from '../../hooks/auth'
 
interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const { user } = useAuth();
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const theme = useTheme()
  const netInfo = useNetInfo();

  const rentalTotal = Number(dates.length * car.price);
  
  async function handleConfirmRental(){
    setLoading(true);

    await api.post('rentals', {
      user_id: user.id,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentalTotal
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenName: 'Home',
        title: 'Carro alugado!',
        message: `Agora você só precisa ir \naté a concessionaria da RENTX \npegar o seu automóvel`
      })
    })
    .catch(() => {
      setLoading(false)
      Alert.alert('Não foi possível confirmar o agendamento.')
    });
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])

  useEffect(() => {
    async function fetchCarUpdated(){
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true){
      fetchCarUpdated();
    }
  }, [netInfo.isConnected])

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={
            !!carUpdated.photos ? 
              carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
          } 
        />
      </CarImages>

      <ContentScrollView>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
      
        {
        carUpdated.accessories &&
        <Accessories>
          {
            carUpdated.accessories.map(accessory => (
              <Accessory 
                key={accessory.type} 
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>
      }

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(24)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetail>
            <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
        
      </ContentScrollView>

      <Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental} 
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  )
}
