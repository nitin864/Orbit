import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from "../components/ScreenWrapper"
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'

const Welcome = () => {
  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={theme.colors.dark}
      />
      <View style={styles.container}>

        {/* Welcome Image */}
        <Image
          style={styles.welcomeImage}
          source={require('../assets/images/welcome.png')}
          resizeMode='contain'
        />

        {/* Title and Punchline */}
        <View style={styles.textSection}>
          <Text style={styles.title}>Orbit</Text>
          <Text style={styles.subtitle}>Find your orbit.</Text>
          <Text style={styles.description}>
            Always in motion. Always connected.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>Get started</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.dark,
    paddingHorizontal: wp(6),
    paddingTop: hp(4),
    paddingBottom: hp(5),
  },

  welcomeImage: {
    width: wp(100),
    height: hp(38),
    alignSelf: 'center',
  },

  textSection: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: wp(4),
  },

  title: {
    fontSize: hp(5.5),
    fontWeight: '800',            
    color: '#FFFFFF',
    letterSpacing: -1.5,
    fontFamily: 'System',
  },

  subtitle: {
    fontSize: hp(2.2),
    fontWeight: '700',            
    color: theme.colors.primary, 
    letterSpacing: 0.2,
    fontFamily: 'System',
  },

  description: {
    fontSize: hp(1.75),
    fontWeight: '400',
    color: theme.colors.textLight,  
    textAlign: 'center',
    lineHeight: hp(2.8),
    letterSpacing: 0.1,
    fontFamily: 'System',
    marginTop: 4,
  },

  buttonSection: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },

  primaryButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,  
    paddingVertical: hp(1.9),
    borderRadius: theme.radius.xs,          
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: hp(2),
    fontWeight: '700',
    letterSpacing: 0.3,
    fontFamily: 'System',
  },

  secondaryButton: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: hp(1.85),
    borderRadius: theme.radius.xs,          
    borderWidth: 1,
    borderColor: '#2F3336',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: theme.colors.textDark,            
    fontSize: hp(2),
    fontWeight: '500',
    letterSpacing: 0.2,
    fontFamily: 'System',
  },

  terms: {
    fontSize: hp(1.45),
    fontWeight: '400',
    color: theme.colors.textLight,          
    textAlign: 'center',
    lineHeight: hp(2.3),
    marginTop: 4,
    paddingHorizontal: wp(4),
  },

  termsLink: {
    color: theme.colors.primary,            
    fontWeight: '500',
  },
})