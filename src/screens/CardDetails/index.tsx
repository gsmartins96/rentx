import React from 'react'
import {
  Container,
  Header,
  CarImages,
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
    </Container>
  )
}
