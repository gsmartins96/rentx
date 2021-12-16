import React from 'react'
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container,
  Header,
  HeaderContent,
  TotalCars
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

  const carDataTwo = {
    brand: 'VW',
    name: 'Golf GTI',
    rent: {
      period: 'Ao dia',
      price: 130
    },
    thumbnail: 'https://assets-global.website-files.com/5c4b6af93b460b2d2ec8e8e6/602d23cacb385ebfc20ad889_consorcio-golf-gti.png'
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

      <Car data={carDataOne} />
      <Car data={carDataTwo} />
    </Container>
  )
}
