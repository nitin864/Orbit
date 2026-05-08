import { View, Text } from 'react-native'
import React, { use } from 'react'
import { Button } from '@react-navigation/elements'
import { useRouter } from 'expo-router'
import ScreenWrapper from "../components/ScreenWrapper"


const index = () => {
  
  const router = useRouter()
 
  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button title='Go to welcome' onPress={()=>router.push('welcome')}/>
    </ScreenWrapper>
  ) 
}

export default index