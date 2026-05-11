import { StyleSheet, Text, View } from 'react-native'
import React, { use } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { Button } from '@react-navigation/elements'
import { supabase } from '../../lib/supabse'
import { useAuth } from '../../context/AuthContext'


const Home = () => {

    const {setAuth} = useAuth();
     

    const handleLogout = async () => {
         
        const {error} = await supabase.auth.signOut()
        if(error){ 
            Alert.alert('Sign Out', "Error logging out. Please try again.")
        }
    }

  return (
    <ScreenWrapper>
        <Text>Home</Text>
        <Button title = "logout" onPress={handleLogout} />
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})