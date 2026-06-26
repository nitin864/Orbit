import { Image } from "expo-image"
import * as ImagePicker from 'expo-image-picker'
import { useRouter as userRouter } from 'expo-router'
import { VideoView, useVideoPlayer } from "expo-video"
import { useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { default as Icon, default as Icons } from '../../assets/icons'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Header from '../../components/Header'
import RichTextEditor from '../../components/RichTextEditor'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import { useAuth } from '../../context/AuthContext'
import { hp, wp } from '../../helpers/common'
import { uploadImageToSupabase } from '../../services/imageUpload'
 


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
        'Please allow access to your photo library to post media.',
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


    console.log("Picked file:", result.assets[0]);
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const isLocalFile = (file) => {
    if (!file) return null;
    if (typeof file === "object") return true;
    return false;
  }
  const getFileType = file => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.type;
    }

    //check image or video based on file extension
    if (file.includes('postImage')) {
      return 'image';
    }
    return 'video';

  }

  const getFileUri = file => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.uri;
    }

    return uploadImageToSupabase(file)?.uri;
  }
  const onSubmit = async (body, file) => {


  }

  const player = useVideoPlayer(file?.uri ?? "", (player) => {
    player.loop = true;
    player.play();
  });




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

          {
            file && (
              <View style={styles.file}>
                {file.type === "video" ? (
                  <VideoView
                    player={player}
                    style={styles.previewImage}
                    nativeControls
                    contentFit="cover"
                  />
                ) : (
                  <View style={styles.file}>
                    <Image
                      source={{ uri: file.uri }}
                      style={styles.previewImage}
                      contentFit="cover"
                      transition={250}
                    />
                  </View>
                )}

                <Pressable style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setFile(null)}>
                  <Icon name="delete" size={25} color={theme.colors.rose} />
                </Pressable>
              </View>
            )
          }

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
  file: {
    height: hp(30),
    width: '100%',
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    borderCurve: 'continuous',
  },
  file: {
    width: "100%",
    height: hp(30),

    backgroundColor: "#1F2937",

    borderRadius: 20,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
})