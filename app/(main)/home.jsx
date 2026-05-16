import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { use } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Button } from '@react-navigation/elements'
import { supabase } from '../../lib/supabse'
import { useAuth } from '../../context/AuthContext'
import {wp, hp} from '../../helpers/common'
import {theme} from '../../constants/theme'
import Icon from '../../assets/icons'
import { useRoute } from '@react-navigation/native'
import Avatar from '../../components/Avatar'


const Home = () => {

    const {setAuth} = useAuth();
     
    const router = useRoute();
    
    const handleLogout = async () => {
         
        const {error} = await supabase.auth.signOut()
        if(error){ 
            Alert.alert('Sign Out', "Error logging out. Please try again.")
        }
    }

  return (
    <ScreenWrapper>
        <View style={styles.container}>
            <View style={styles.header}>
               <Text style={styles.title}>ORBIT</Text>
               <View style={styles .icon}>
                  <Pressable onPress={()=> router.push('notifications')}> 
                    <Icon name="heart" size={hp(3.2)} color={theme.colors.text} strokeWidth={2} />
                  </Pressable>
                  <Pressable onPress={()=> router.push('newPost')}> 
                    <Icon name="plus" size={ hp(3.2)} color={theme.colors.text} strokeWidth={2} />
                  </Pressable>
                  <Pressable onPress={()=> router.push('profile')}> 
                    <Avatar
                      uri={user?.image}
                      size={hp(4.3)}
                        rounded={theme.radius.sm}
                        style={borderWidth}
                    />
                  </Pressable>
               </View>
            </View>
        </View>
         
        <Text onPress={handleLogout}>Logout</Text>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: hp(1)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: wp(4)
    } ,
    title: {
        color: theme.colors.primary,
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})