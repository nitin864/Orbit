import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import BackButton from './BackButton'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'

const Header = ({title, showBackButton = false, mb=10}) => {
  const router = useRouter()

  return (
     <View style={[styles.container , { marginBottom: mb }]}>
          {
            showBackButton && (
                <View style={styles.showBackButton}>
                    <BackButton router={router} />
                </View>
            )
          }
          <Text style={styles.title}>{title || ""}</Text>
     </View>
  )
}

export default Header

const styles = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 5,
        gap: 10,
    },
    title: {
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.primary,
    },
    showBackButton: {
        position: 'absolute',
        left: 0,
    },
})