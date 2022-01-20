import React, { useState, useEffect } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate,
  Extrapolate
} from 'react-native-reanimated'
import { useNetInfo } from '@react-native-community/netinfo';
import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OffLineInfo
} from './styles'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import { Car as ModelCar } from '../../database/model/Car'
import { CarDTO } from '../../dtos/CarsDTO'
import theme from '../../styles/theme'
import api from '../../services/api'

interface Params {
  car: ModelCar;
}

export function CarDetails(){
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
  
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;
  const netInfo = useNetInfo();
  
  const scrollY = useSharedValue(0);
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  })

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleConfirmRental(){
    navigation.navigate('Scheduling', { car });
  }

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
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Animated.View
        style={[
          headerStyleAnimation, 
          styles.header,
          { backgroundColor: theme.colors.background_secundary }
        ]}
      >
        <Header>
          <BackButton />
        </Header>

        <Animated.View style={sliderCarStyleAnimation}>
          <CarImages>
            <ImageSlider 
              imagesUrl={
                !!carUpdated.photos ? 
                  carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
              } 
            />
          </CarImages>
        </Animated.View>
      </Animated.View>


      <Animated.ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: getStatusBarHeight() + 160,
          }} 
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16.6}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
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

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button 
          title="Escolher período do aluguel" 
          onPress={handleConfirmRental} 
          enabled={netInfo.isConnected === true}
        />
        {netInfo.isConnected === false && 
          <OffLineInfo>
            Você está offline... Conecte-se para aprovietar nossos serviços
          </OffLineInfo>
        }
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
})
