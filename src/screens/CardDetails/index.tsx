import React from 'react'
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About
} from './styles'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

export function CardDetails(){
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

      <Content>
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

        <About>
          Este automóvel é meu sonho de consumo mais alcançavel nos proximo 5~10 anos
          dependendo somente do quanto eu sou bom no que faço e no quanto estou disposto
          a se dedicar para realizar meus sonhos.
        </About>
      </Content>
    </Container>
  )
}
