import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles'

import { CarDTO } from '../../dtos/CarsDTO'
import GasolineSvg from '../../assets/gasoline.svg'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest } : Props){
  const MotoIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>

          <Type>
            <MotoIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode='contain' />
    </Container>
  )
}
