import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import BackButton from './BackButton'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'

const Header = ({ title, showBackButton = false, mb = 10 }) => {
  const router = useRouter()

  return (
    <View style={[styles.container, { marginBottom: mb }]}>

      {showBackButton && (
        <View style={styles.backBtn}>
          <BackButton router={router} />
        </View>
      )}

      {/* Glitch title */}
      <View style={styles.glitchOuter}>
        <Text style={[styles.glitchText, styles.glitchRed]}>
          {title || ''}
        </Text>
        <Text style={[styles.glitchText, styles.glitchCyan]}>
          {title || ''}
        </Text>
        <Text style={styles.glitchText}>
          {title || ''}
        </Text>
      </View>

       

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
    paddingHorizontal: wp(4),
    paddingBottom: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
  },

  backBtn: {
    position: 'absolute',
    left: wp(4),
    zIndex: 10,
  },

  glitchOuter: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
  },

  glitchText: {
    position: 'absolute',
    fontSize: hp(3),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  glitchRed: {
    color: '#ff004c',
    opacity: 0.65,
    transform: [{ translateX: -2 }],
  },

  glitchCyan: {
    color: '#00e5ff',
    opacity: 0.65,
    transform: [{ translateX: 2 }],
  },

  underlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },

  underlineThin: {
    height: 1,
    width: wp(8),
    backgroundColor: theme.colors.primary,
    opacity: 0.4,
  },

  underlineThick: {
    height: 2,
    width: wp(12),
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
})