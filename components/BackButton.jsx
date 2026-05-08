import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'

const BackButton = ({ size = 26, router }) => {
  return (
    <Pressable
      onPress={() => router.back()}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <Icon
        name="arrowLeft"
        size={size}
        strokeWidth={2.5}
        color={theme.colors.primary}
      />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: theme.radius.sm,           
    backgroundColor: theme.colors.darkLight,  
     
    borderColor: '#2F3336',                   
  },
  pressed: {
    opacity: 0,
                
  },
})