import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import moment from 'moment/moment';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import { getSupabaseFileUrl } from '../services/imageService';
import Avatar from './Avatar';

const textStyle = {
  color: theme.colors.textDark,
  fontSize: hp(1.75),
};

const tagsStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: '#FFFFFF',
  },
  h4: {
    color: '#FFFFFF',
  },
};

const PostCard = ({
  item,
  currentUser,
  router,
  hasShadow = true,
}) => {

  const shadowStyles = {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 1,
  };

  const postDetails = () => {
    // implementing it later
  };

  const createdAt = moment(item?.created_at).format('MMM D');

  const fileUrl = item?.file ? getSupabaseFileUrl(item.file) : null;
  const isVideo = item?.file?.includes('postVideos');
  const isImage = item?.file && !isVideo;

  // useVideoPlayer must be called unconditionally (rules of hooks). Passing
  // null is fine — the player just stays idle until a real video URI is set.
  const player = useVideoPlayer(isVideo ? fileUrl?.uri : null, (p) => {
    p.loop = false;
  });

  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={item?.user?.image}
            rounded={theme.radius.md}
          />

          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{item?.user?.name}</Text>
            <Text style={styles.postTime}>{createdAt}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={postDetails}>
          <Feather name="more-horizontal" size={hp(3)} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.postBody}>
          {item?.body && (
            <RenderHTML
              contentWidth={wp(100)}
              source={{ html: item?.body }}
              tagsStyles={tagsStyles}
            />
          )}
        </View>

        {/* post media */}
        {fileUrl && isImage && (
          <Image
            source={fileUrl}
            transition={100}
            style={styles.postMedia}
            contentFit="cover"
          />
        )}

        {fileUrl && isVideo && (
          <VideoView
            style={styles.postMedia}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            contentFit="cover"
          />
        )}
      </View>

      {/* action bar */}
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={postDetails}>
            <Feather name="message-circle" size={hp(2.4)} color={theme.colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.count}>{item?.comments?.[0]?.count || 0}</Text>
        </View>

        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Feather name="repeat" size={hp(2.4)} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Ionicons
              name={item?.liked ? 'heart' : 'heart-outline'}
              size={hp(2.6)}
              color={item?.liked ? theme.colors.rose : theme.colors.textLight}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{item?.likes?.length || 0}</Text>
        </View>

        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Feather name="send" size={hp(2.2)} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: 18,
    borderCurve: 'continuous',
    padding: 10,
    paddingVertical: 12,
    backgroundColor: theme.colors.darkLight,
    borderWidth: 0.5,
    borderColor: '#2F3336',
    shadowColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  username: {
    color: '#FFFFFF',
    fontSize: hp(1.9),
    fontWeight: theme.fonts.semibold,
  },
  postTime: {
    color: theme.colors.textLight,
    fontWeight: theme.fonts.medium,
    fontSize: hp(1.5),
  },
  content: {
    gap: 10,
  },
  postBody: {
    marginLeft: 5,
  },
  postMedia: {
    height: hp(40),
    width: '100%',
    borderRadius: 14,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.dark,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#2F3336',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  count: {
    color: theme.colors.textLight,
    fontSize: hp(1.6),
  },
});