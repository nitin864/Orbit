import React, { useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const GlitchLogo = () => {

  const translateX = useSharedValue(0)
  const opacity = useSharedValue(1)
  const translateY = useSharedValue(0)

  useEffect(() => {

    // Floating animation
    translateY.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 2500 }),
        withTiming(0, { duration: 2500 })
      ),
      -1,
      true
    )

    // Random glitch pulse
    setInterval(() => {
      translateX.value = withSequence(
        withTiming(-4, { duration: 40 }),
        withTiming(4, { duration: 40 }),
        withTiming(-2, { duration: 40 }),
        withTiming(0, { duration: 40 }),
      )

      opacity.value = withSequence(
        withTiming(0.7, { duration: 80 }),
        withTiming(1, { duration: 80 }),
      )

    }, 3000)

  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }))

  return (
    <AnimatedImage
      source={require('../assets/images/logo.png')}
      style={[styles.logo, animatedStyle]}
      resizeMode="contain"
    />
  )
}

export default GlitchLogo

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
  },
})