import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import React from 'react'
import ScreenWrapper from "../components/ScreenWrapper"
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'
import Button from '../components/Button'
import { useRouter } from 'expo-router'

const Welcome = () => {

  const router = useRouter()

  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <StatusBar barStyle='light-content' backgroundColor={theme.colors.dark} />

      <View style={styles.container}>

        {/* ── Glitch Hero ── */}
        <View style={styles.hero}>

          {/* Scanlines */}
          <View style={styles.scanlines} pointerEvents="none" />

           

           

          {/* Glitch Title */}
          <View style={styles.glitchOuter}>
            <Text style={[styles.glitchText, styles.glitchRed]}>ORBIT</Text>
            <Text style={[styles.glitchText, styles.glitchCyan]}>ORBIT</Text>
            <Text style={styles.glitchText}>ORBIT</Text>
          </View>

          {/* Welcome image inside hero */}
          <Image
            style={styles.welcomeImage}
            source={require('../assets/images/welcome.png')}
            resizeMode='contain'
          />

          {/* Code line */}
          <Text style={styles.codeLine}>
            orbit.social // v0.01 // signal detected
          </Text>

        </View>

        {/* ── Text Section ── */}
        <View style={styles.textSection}>
          <Text style={styles.subtitle}>Find your orbit.</Text>
          <Text style={styles.description}>
            Always in motion. Always connected.
          </Text>
        </View>

        {/* ── Buttons ── */}
        <View style={styles.buttonSection}>

          <Button
            title="Get started"
            onPress={() => router.push('signUp')}
            buttonStyle={styles.primaryButton}
            textStyle={styles.primaryButtonText}
            hasShadow={true}
          />

          <Button
            title="I already have an account"
            onPress={() => router.push('login')}
            buttonStyle={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
            hasShadow={false}
          />

          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          <Text style={styles.bottomTag}>
            ORBIT.SOCIAL // FIND YOUR ORBIT
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
    backgroundColor: theme.colors.dark,
  },

  // ── Hero ──────────────────────────────────────
  hero: {
    backgroundColor: '#0F1419',
    height: hp(46),
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scanlines: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.06,
    backgroundColor: 'transparent',
  },

  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderColor: '#1D9BF0',
    opacity: 0.65,
  },

  cornerTL: {
    top: 14, left: 14,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopLeftRadius: 3,
  },

  cornerTR: {
    top: 14, right: 14,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopRightRadius: 3,
  },

  cornerBL: {
    bottom: 14, left: 14,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderBottomLeftRadius: 3,
  },

  cornerBR: {
    bottom: 14, right: 14,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomRightRadius: 3,
  },

  topTag: {
    fontSize: hp(1.1),
    letterSpacing: 5,
    color: '#1D9BF0',
    opacity: 0.8,
    fontFamily: 'System',
    fontWeight: '400',
    marginBottom: 6,
  },

  glitchOuter: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(7),
    width: '100%',
  },

  glitchText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: hp(6),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
    fontFamily: 'System',
  },

  glitchRed: {
    color: '#ff004c',
    opacity: 0.65,
    transform: [{ translateX: -3 }],
  },

  glitchCyan: {
    color: '#00e5ff',
    opacity: 0.65,
    transform: [{ translateX: 3 }],
  },

  welcomeImage: {
    width: wp(100),
    height: hp(28),
    alignSelf: 'center',
    marginTop: 8,
  },

  codeLine: {
    fontSize: hp(1.1),
    color: '#1D9BF0',
    opacity: 0.3,
    letterSpacing: 1,
    marginTop: 6,
    fontFamily: 'System',
  },

  // ── Text Section ──────────────────────────────
  textSection: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: wp(6),
    paddingTop: hp(2.5),
  },

  subtitle: {
    fontSize: hp(2.4),
    fontWeight: '700',
    color: theme.colors.primary,
    letterSpacing: 0.3,
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
  },

  // ── Buttons ───────────────────────────────────
  buttonSection: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: hp(3),
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
    fontWeight: '900',
    letterSpacing: 0.5,
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
    paddingHorizontal: wp(4),
  },

  termsLink: {
    color: theme.colors.primary,
    fontWeight: '500',
  },

  bottomTag: {
    fontSize: hp(1.1),
    letterSpacing: 3,
    color: '#2F3336',
    fontFamily: 'System',
    textAlign: 'center',
    marginTop: 4,
  },

})