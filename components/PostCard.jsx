import moment from 'moment/moment';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import Avatar from './Avatar';

const PostCard = ({
     item,
    currentUser,
    router,
    hasShadow = true,
}) => {

    const shadowStyles = {
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1
    } 

    const createdAt = moment(item?.created_at).format('MMM D');
   
  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style = {styles.header}>
        <View style={styles.userInfo}>
            <Avatar
              size={hp(4.5)}
              uri={item?.user?.image}
              rounded={theme.radius.md}

            />

            <View style={{gap: 2}}>
                <Text style={styles.username}>{item?.user?.name}</Text>
                <Text style={styles.postTime}>{createdAt}</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({

    container: {
        gap: 10,
        marginBottom:15,
        borderRadius: theme.radius.xxl*1.1,
        borderCurve: 'continuous',
        padding: 10,
        paddingVertical:12,
        backgroundColor: '#0F1419',
        borderWidth: 0.5,
        borderColor: theme.colors.gray,
        shadowColor: '#000'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userInfo: {
       flexDirection: 'row',
       alignItems: 'center',
       gap: 8
    },
    username: {
        color: "white"
    },
    postTime:{
      color: "gray"
    }
})