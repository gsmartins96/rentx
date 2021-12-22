import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
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
  About,
  Accessories,
  Footer
} from './styles'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import { CarDTO } from '../../dtos/CarsDTO'

interface Params {
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental(){
    navigation.navigate('Scheduling');
  }

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos} 
        />
      </CarImages>

      <ContentScrollView>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
      
        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type} 
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <About>{car.about}</About>
      </ContentScrollView>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}
