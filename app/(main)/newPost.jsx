import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { theme } from '../../constants/theme'
import Avatar from '../../components/Avatar'
import { useAuth } from '../../context/AuthContext'
import { hp, wp } from '../../helpers/common'

const NewPost = () => {

  const {user} = useAuth()
  return (
    <ScreenWrapper bg ={theme.colors.dark}>
      <View style = {styles.container}>
        <Header title = "Create Post" showBackButton={true} /> 
        <ScrollView contentContainerStyle = {{gap: 20}}>
          <View style = {styles.header}>
            <Avatar 
               uri={user?.image}
               size={hp(6.5)}
               rounded={theme.radius.xl }
            />
            <View style = {{gap: 2}}>
              <Text style = {styles.username}>{user?.name}</Text>
              <Text style = {styles.handle}>@{user?.username}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    marginBottom: wp(4),
    gap: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    height: hp(6.5),    
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba (0,0,0,0.1)',
  
  },
  username: {
  color: theme.colors.white,
  fontFamily: theme.fonts.extraBold,
  fontWeight: '600',
},

handle: {
  color: theme.colors.gray,
  fontFamily: theme.fonts.bold,
},
})