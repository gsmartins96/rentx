import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
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
  Acessories,
  Footer
} from './styles'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
 
export function CarDetails(){
  const navigation = useNavigation<any>();
  const theme = useTheme()

  function handleConfirmRental(){
    navigation.navigate('Scheduling');
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={['https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_BMW_M4_14.png/revision/latest?cb=20191111201655']} 
        />
      </CarImages>

      <ContentScrollView>
        <Details>
          <Description>
            <Brand>BMW</Brand>
            <Name>M4 CS</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 320</Price>
          </Rent>
        </Details>
      
        <Acessories>
          <Accessory name="380 Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="600 Whp" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="4 Pessoas" icon={peopleSvg} />
        </Acessories>

        <About>
          Este é um automóvel exotico, perfeito e meu sonho de consumo com um valor mais alcançavel
          nos próximos anos. "Bmzinha top das galaxya, vem ni min!".
        </About>
      </ContentScrollView>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}
