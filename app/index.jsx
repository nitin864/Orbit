import { View, Text } from 'react-native'
import React, { use } from 'react'
import { Button } from '@react-navigation/elements'
import { useRouter } from 'expo-router'

const index = () => {
  
  const router = useRouter()

  return (
    <View>
      <Text>index</Text>
      <Button title='Go to welcome' onPress={()=>router.push('welcome')}/>
    </View>
  ) 
}

export default index