import React from 'react'
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles'

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

export function Home(){
  const carDataOne = {
    brand: 'bmw',
    name: 'M4 CS',
    rent: {
      period: 'Ao dia',
      price: 320
    },
    thumbnail: 'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_BMW_M4_14.png/revision/latest?cb=20191111201655'
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CarList 
        data={[1,2,3,4,5,6,7,8,9]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={carDataOne} />}
      />
    </Container>
  )
}
