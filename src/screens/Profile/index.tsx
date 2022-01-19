import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableNativeFeedback, Keyboard, Alert } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons'
import * as Yup from 'yup';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles'

import { useAuth } from '../../hooks/auth'

import theme from '../../styles/theme'

import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import is from 'date-fns/esm/locale/is/index.js';

export function Profile(){
  const { user, signOut, updateUser } = useAuth();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
    setOption(optionSelected)
  }

  async function handleAvatarSelect(){
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(result.cancelled){
      return;
    }

    if(result.uri){
      setAvatar(result.uri)
    }
  }

  async function handleProfileUpdate(){
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH Obrigatória'),
        name: Yup.string().required('Nome não pode ficar em branco'),
      })

      const data = { name, driverLicense };
      await schema.validate(data)

      await updateUser({
        id: user.id,
        user_id: user.id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });

      Alert.alert('Perfil atualizado');
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      }
      Alert.alert('Não foi possível atualizar o perfil');
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={signOut} > 
                <Feather name='power' size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name='camera' size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }} >
            <Options>
              <Option 
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'} >
                  Dados
                </OptionTitle>
              </Option>
              <Option 
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'} >
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ? 
              <Section>
                <Input 
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={name}
                  onChangeText={setName}
                />
                <Input 
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input 
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </Section>
            :
              <Section>
                <InputPassword 
                  iconName='lock'
                  placeholder='Senha Atual'
                />
                <InputPassword 
                  iconName='lock'
                  placeholder='Nova Senha'
                />
                <InputPassword 
                  iconName='credit-card'
                  placeholder='Repetir Senha'
                />
              </Section>
            }

            <Button 
              title='Salvar alterações'
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  )
}
