import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import {
  Container,
  IconContainer,
  InputText,
} from './styles'

import theme from '../../styles/theme'

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
  value?: string;
}

export function InputPassword({ iconName, value, ...rest }: Props){
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus(){
    setIsFocused(true)
  }

  function  handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value);
  }
  function handlePasswordVisibleChange(){
    setIsPasswordVisible(prevState => !prevState)
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
        {...rest} 
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />


      <BorderlessButton onPress={handlePasswordVisibleChange} >
        <IconContainer> 
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  )
}
