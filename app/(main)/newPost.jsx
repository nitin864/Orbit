import { useRouter as userRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Avatar from '../../components/Avatar'
import Header from '../../components/Header'
import RichTextEditor from '../../components/RichTextEditor'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import { useAuth } from '../../context/AuthContext'
import { hp, wp } from '../../helpers/common'

const NewPost = () => { 
  
  const bodyRef = useRef("")
  const  editorRef = useRef(null)
  const {user} = useAuth()
  const router = userRouter()
  const [loading, setLoading] = useState(false);
  const [file , setFlile] = useState(null)
  

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
              <Text style = {styles.username}>{user && user.name}</Text>
              <Text style = {styles.handle}>Public</Text>
            </View>
          </View>
          <View style = {styles.textEditor}>
            <RichTextEditor editorRef={editorRef} onChange={body => bodyRef.current = body}/>
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
  color: theme.colors.primaryDark,
  fontFamily: theme.fonts.bold,
  fontWeight: '600',
  fontSize: hp(2.1),
},

handle: {
  color: theme.colors.gray,
  fontFamily: theme.fonts.semibold,
  fontWeight: '500',
  fontSize: hp(1.9),
},
})