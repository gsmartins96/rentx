import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useNetInfo } from '@react-native-community/netinfo'
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

import { Car as ModelCara } from '../../database/model/Car'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

interface Props extends RectButtonProps {
  data: ModelCara;
}

export function Car({ data, ...rest } : Props){
  const netInfo = useNetInfo();
  const MotoIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${netInfo.isConnected === true ? data.price : '...'}`}</Price>
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
