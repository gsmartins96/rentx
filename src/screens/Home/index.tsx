import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync'

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles'

import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/CarsDTO';

import api from '../../services/api';
import { database } from '../../database'
import { Car as ModelCar } from '../../database/model/Car'

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home(){
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();

  function handleNavigateCarDetails(car: ModelCar){
    navigation.navigate('CarDetails', {car});
  }

  async function offlineSynchroneze(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user)
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars(){
      try{
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if(isMounted){
          setCars(cars);
        }
      } catch(error){
        console.log(error);
      } finally {
        if(isMounted){
          setLoading(false);
        }
      }
    } 

    fetchCars();
    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    if(netInfo.isConnected === true){
      offlineSynchroneze();
    }
  }, [netInfo.isConnected])

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
