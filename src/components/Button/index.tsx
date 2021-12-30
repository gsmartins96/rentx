import React from 'react';
import { ActivityIndicator } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Container,
  Title
} from './styles'

import theme from '../../styles/theme';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({ title, color, enabled = true, loading = false, ...rest } : Props){
  return (
    <Container 
      {...rest } 
      color={color} 
      enabled={enabled} 
      style={{ opacity: (enabled === false || loading === true ) ? .5 : 1 }} 
    >
      {loading 
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title>{title}</Title>
      }
    </Container>
  )
}
