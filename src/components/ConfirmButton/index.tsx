import React from 'react'
import {
  Container,
  Title
} from './styles'

interface Props{
  title?: string
}

export function ConfirmButton({ title, ...rest } : Props){
  return (
    <Container {...rest}>
      <Title>{title ? title : 'Ok'}</Title>
    </Container>
  )
}
