import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles'

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/CarsDTO';

import api from '../../services/api';

export function Home(){
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleNavigateCarDetails(car: CarDTO){
    navigation.navigate('CarDetails', {car});
  }

  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get('/cars');
        setCars(response.data);
      } catch(error){
        console.log(error);
      } finally {
        setLoading(false);
      }
    } 

    fetchCars()
  }, [])

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          {!loading && 
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      {loading ? 
        <LoadAnimation /> 
        : 
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Car data={item} onPress={() => handleNavigateCarDetails(item)} />
          }
        />
      }
    </Container>
  )
}
