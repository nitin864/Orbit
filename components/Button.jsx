import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import Loading from './Loading'

const Button = ({
  buttonStyle,
  textStyle,
  title = '',
  onPress = () => {},
  loading = true,
  hasShadow = true,
}) => {

  const shadowStyle = {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  }

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, { opacity: 0.7 }]}>
       <Loading/>
      </View>
    )
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        hasShadow && shadowStyle,
        buttonStyle,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,   
    borderRadius: theme.radius.xs,          
    paddingVertical: hp(1.9),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  text: {
    color: '#FFFFFF',
    fontSize: hp(2),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
})