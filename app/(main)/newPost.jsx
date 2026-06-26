import * as ImagePicker from 'expo-image-picker'
import { useRouter as userRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icons from '../../assets/icons'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Header from '../../components/Header'
import RichTextEditor from '../../components/RichTextEditor'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import { useAuth } from '../../context/AuthContext'
import { hp, wp } from '../../helpers/common'

const NewPost = () => {

  const bodyRef = useRef("")
  const editorRef = useRef(null)
  const { user } = useAuth()
  const router = userRouter()
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null)
  const onPick = async (isImage) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Please allow access to your photo library to change your avatar.',
      )
      return
    }

    let mediConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    };

    if (!isImage) {
      mediConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      };
    }

    const result = await ImagePicker.launchImageLibraryAsync(mediConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const onSubmit = async (body, file) => {


  }

  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <View style={styles.container}>
        <Header title="Create Post" showBackButton={true} />
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          <View style={styles.header}>
            <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
            />
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{user && user.name}</Text>
              <Text style={styles.handle}>Public</Text>
            </View>
          </View>
          <View style={styles.textEditor}>
            <RichTextEditor editorRef={editorRef} onChange={body => bodyRef.current = body} />
          </View>

          <View style={styles.media}>
            <Text style={styles.mediaText}>Add to your post</Text>
            <View style={styles.mediaIcon}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icons name="image" size={30} color={theme.colors.textLight} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icons name="video" size={33} color={theme.colors.textLight} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Button
          buttonStyle={{ height: hp(6.2), marginBottom: hp(2), borderRadius: theme.radius.xs }}
          title="Post"
          loading={loading}
          hasShadow={false}
          onPress={() => { onSubmit(bodyRef.current, file) }}
        />
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
  media: {
    marginTop: hp(4),
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
  },
  mediaIcon: {
    flexDirection: 'row',
    alighnItems: 'center',
    gap: 15,
  },
  mediaText: {
    color: theme.colors.textLight,
    fontFamily: theme.fonts.semibold,
    fontWeight: '500',
    fontSize: hp(2),
  },
})