import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { theme } from '../../constants/theme'

const NewPost = () => {
  return (
    <ScreenWrapper bg ={theme.colors.dark}>
      <Header title = "Create Post" showBackButton={true} />
    </ScreenWrapper>
  )
}

export default NewPost

const styles = StyleSheet.create({})