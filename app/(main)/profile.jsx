import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'
import { theme } from '../../constants/theme'
import { hp, wp } from '../../helpers/common'
import Icon from '../../assets/icons'
import Avatar from '../../components/Avatar'
import { supabase } from '../../lib/supabse'
import BackButton from '../../components/BackButton'

const UserHeader = ({ user, router, onLogout }) => {

  const [stats] = useState({ posts: 0, followers: 0, following: 0 })

  return (
    <View style={styles.headerWrap}>

      {/* Top row */}
      <View style={styles.headerTop}>
        <BackButton router={router} />
        <View style={styles.headerTopRight}>
          <Pressable
            style={styles.topIconBtn}
            onPress={() => router.push('/editProfile')}
          >
            <Icon name="edit" size={hp(2.4)} color="#fff" strokeWidth={2} />
          </Pressable>
          <Pressable style={styles.topIconBtn} onPress={onLogout}>
            <Icon name="logout" size={hp(2.4)} color="#f4212e" strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      {/* Cover / glitch banner */}
      <View style={styles.coverBanner}>
        <View style={styles.glitchOuter}>
          <Text style={[styles.glitchText, styles.glitchRed]}>ORBIT</Text>
          <Text style={[styles.glitchText, styles.glitchCyan]}>ORBIT</Text>
          <Text style={styles.glitchText}>ORBIT</Text>
        </View>
        <Text style={styles.codeLine}>orbit.social // your world</Text>
      </View>

      {/* Avatar + edit button */}
      <View style={styles.avatarRow}>
        <View style={styles.avatarWrap}>
          <Avatar
            uri={user?.image}
            size={hp(12)}
            rounded={theme.radius.xl}
            style={{ borderWidth: 3, borderColor: theme.colors.primary }}
          />
          <Pressable
            style={styles.avatarEditBtn}
            onPress={() => router.push('/editProfile')}
          >
            <Icon name="camera" size={14} color="#fff" strokeWidth={2} />
          </Pressable>
        </View>
        <Pressable
          style={styles.editProfileBtn}
          onPress={() => router.push('/editProfile')}
        >
          <Text style={styles.editProfileText}>Edit profile</Text>
        </Pressable>
      </View>

      {/* Name + handle */}
      <View style={styles.nameWrap}>
        <Text style={styles.displayName}>
          {user?.name || 'Your Name'}
        </Text>
        <Text style={styles.handle}>
          @{user?.name?.toLowerCase().replace(/\s/g, '') || 'username'}
        </Text>
        {user?.bio ? (
          <Text style={styles.bio}>{user.bio}</Text>
        ) : (
          <Text style={styles.bioPlaceholder}>No bio yet. Add one to tell your orbit about you.</Text>
        )}
      </View>

      {/* Meta info */}
      <View style={styles.metaRow}>
        {user?.address ? (
          <View style={styles.metaItem}>
            <Icon name="location" size={14} color={theme.colors.textLight} strokeWidth={2} />
            <Text style={styles.metaText}>{user.address}</Text>
          </View>
        ) : null}
        {user?.phoneNumber ? (
          <View style={styles.metaItem}>
            <Icon name="call" size={14} color={theme.colors.textLight} strokeWidth={2} />
            <Text style={styles.metaText}>{user.phoneNumber}</Text>
          </View>
        ) : null}
        <View style={styles.metaItem}>
          <Icon name="location" size={14} color={theme.colors.textLight} strokeWidth={2} />
          <Text style={styles.metaText}>
            Joined {user?.created_at
              ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : 'Orbit'}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{stats.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{stats.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{stats.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Tab bar */}
      <View style={styles.profileTabs}>
        <View style={styles.profileTabActive}>
          <Text style={styles.profileTabTextActive}>Posts</Text>
          <View style={styles.tabIndicator} />
        </View>
        <View style={styles.profileTab}>
          <Text style={styles.profileTabText}>Replies</Text>
        </View>
        <View style={styles.profileTab}>
          <Text style={styles.profileTabText}>Likes</Text>
        </View>
      </View>

    </View>
  )
}

const Profile = () => {
  const { user, setAuth } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserPosts()
  }, [])

  const fetchUserPosts = async () => {
    if (!user?.id) return
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (id, name, image),
        postLikes (id, userId),
        comments (id)
      `)
      .eq('userId', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.log('Error fetching user posts:', error.message)
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase.auth.signOut()
            if (error) {
              Alert.alert('Sign Out', 'Error logging out. Please try again.')
            }
          },
        },
      ]
    )
  }

  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.dark} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <UserHeader user={user} router={router} onLogout={handleLogout} />

        {/* Posts feed */}
        {loading ? (
          <View style={styles.loaderWrap}>
            <Text style={styles.loadingText}>Loading posts...</Text>
          </View>
        ) : posts.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Icon name="image" size={48} color={theme.colors.textLight} strokeWidth={1.2} />
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptyText}>
              Share something with your orbit.
            </Text>
            <Pressable
              style={styles.newPostBtn}
              onPress={() => router.push('/newPost')}
            >
              <Text style={styles.newPostBtnText}>Create your first post</Text>
            </Pressable>
          </View>
        ) : (
          posts.map((item) => {
            const initials = item?.users?.name
              ? item.users.name.slice(0, 2).toUpperCase()
              : '?'
            return (
              <View key={item.id} style={styles.postCard}>
                <View style={styles.avatarCol}>
                  <View style={styles.postAvatar}>
                    <Text style={styles.postAvatarText}>{initials}</Text>
                  </View>
                  <View style={styles.threadLine} />
                </View>
                <View style={styles.postContent}>
                  <View style={styles.postHeader}>
                    <Text style={styles.postName}>{item?.users?.name || 'Unknown'}</Text>
                    <Text style={styles.postHandle}>
                      {' '}@{item?.users?.name?.toLowerCase().replace(' ', '') || 'user'}
                    </Text>
                    <Text style={styles.postDot}> · </Text>
                    <Text style={styles.postTime} numberOfLines={1}>
                      {item?.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : ''}
                    </Text>
                    <TouchableOpacity style={styles.moreBtn}>
                      <Icon
                        name="threeDotsHorizontal"
                        size={16}
                        color={theme.colors.textLight}
                        strokeWidth={2}
                      />
                    </TouchableOpacity>
                  </View>
                  {item?.body ? (
                    <Text style={styles.postText}>{item.body}</Text>
                  ) : null}
                  <View style={styles.postActions}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Icon name="comment" size={18} color={theme.colors.textLight} strokeWidth={1.8} />
                      <Text style={styles.actionCount}>{item?.comments?.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Icon name="share" size={18} color={theme.colors.textLight} strokeWidth={1.8} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Icon name="heart" size={18} color={theme.colors.textLight} strokeWidth={1.8} />
                      <Text style={styles.actionCount}>{item?.postLikes?.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Icon name="send" size={18} color={theme.colors.textLight} strokeWidth={1.8} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })
        )}

      </ScrollView>

    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({

  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(8),
  },

  // ── Header ───────────────────────────────────
  headerWrap: {
    backgroundColor: theme.colors.dark,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },

  headerTopRight: {
    flexDirection: 'row',
    gap: 10,
  },

  topIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.darkLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2F3336',
  },

  // ── Cover Banner ─────────────────────────────
  coverBanner: {
    height: hp(16),
    backgroundColor: '#0a0c10',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
  },

  glitchOuter: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(7),
    width: '100%',
  },

  glitchText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: hp(5.5),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
    fontFamily: 'System',
  },

  glitchRed: {
    color: '#ff004c',
    opacity: 0.65,
    transform: [{ translateX: -3 }],
  },

  glitchCyan: {
    color: '#00e5ff',
    opacity: 0.65,
    transform: [{ translateX: 3 }],
  },

  codeLine: {
    fontSize: hp(1.1),
    color: '#1D9BF0',
    opacity: 0.4,
    letterSpacing: 1,
    marginTop: 6,
    fontFamily: 'System',
  },

  // ── Avatar Row ───────────────────────────────
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginTop: -hp(6),
    marginBottom: hp(1.5),
  },

  avatarWrap: {
    position: 'relative',
  },

  avatarEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.dark,
  },

  editProfileBtn: {
    borderWidth: 1,
    borderColor: '#2F3336',
    borderRadius: theme.radius.xs,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    marginBottom: 4,
  },

  editProfileText: {
    color: '#FFFFFF',
    fontSize: hp(1.7),
    fontWeight: '700',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },

  // ── Name Section ─────────────────────────────
  nameWrap: {
    paddingHorizontal: wp(4),
    gap: 4,
    marginBottom: hp(1.5),
  },

  displayName: {
    fontSize: hp(2.6),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    fontFamily: 'System',
  },

  handle: {
    fontSize: hp(1.7),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  bio: {
    fontSize: hp(1.8),
    color: '#E7E9EA',
    lineHeight: hp(2.8),
    fontFamily: 'System',
    marginTop: 6,
  },

  bioPlaceholder: {
    fontSize: hp(1.7),
    color: theme.colors.textLight,
    lineHeight: hp(2.6),
    fontFamily: 'System',
    marginTop: 6,
    fontStyle: 'italic',
  },

  // ── Meta ─────────────────────────────────────
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: wp(4),
    gap: 12,
    marginBottom: hp(1.5),
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metaText: {
    fontSize: hp(1.6),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  // ── Stats ────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: '#1E2732',
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
    marginBottom: 0,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },

  statCount: {
    fontSize: hp(2.2),
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: 'System',
    letterSpacing: -0.5,
  },

  statLabel: {
    fontSize: hp(1.5),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  statDivider: {
    width: 1,
    backgroundColor: '#1E2732',
    marginVertical: 4,
  },

  // ── Profile Tabs ─────────────────────────────
  profileTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
  },

  profileTabActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.5),
    position: 'relative',
  },

  profileTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },

  profileTabTextActive: {
    fontSize: hp(1.7),
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
  },

  profileTabText: {
    fontSize: hp(1.7),
    fontWeight: '500',
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '40%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },

  // ── Loader / Empty ───────────────────────────
  loaderWrap: {
    paddingTop: hp(6),
    alignItems: 'center',
  },

  loadingText: {
    color: theme.colors.textLight,
    fontSize: hp(1.7),
    fontFamily: 'System',
  },

  emptyWrap: {
    alignItems: 'center',
    paddingTop: hp(8),
    gap: 12,
    paddingHorizontal: wp(10),
  },

  emptyTitle: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
  },

  emptyText: {
    fontSize: hp(1.7),
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: hp(2.6),
    fontFamily: 'System',
  },

  newPostBtn: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.6),
    borderRadius: theme.radius.xs,
  },

  newPostBtnText: {
    color: '#fff',
    fontSize: hp(1.8),
    fontWeight: '700',
    fontFamily: 'System',
    letterSpacing: 0.3,
  },

  // ── Post Cards ───────────────────────────────
  postCard: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingTop: hp(1.8),
    paddingBottom: hp(0.5),
    backgroundColor: theme.colors.dark,
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
  },

  avatarCol: {
    alignItems: 'center',
    marginRight: 12,
  },

  postAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  postAvatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'System',
  },

  threadLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#1E2732',
    marginTop: 8,
    borderRadius: 1,
    minHeight: 20,
  },

  postContent: {
    flex: 1,
    paddingBottom: hp(1.5),
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  postName: {
    fontSize: hp(1.7),
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
  },

  postHandle: {
    fontSize: hp(1.55),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  postDot: {
    fontSize: hp(1.55),
    color: theme.colors.textLight,
  },

  postTime: {
    fontSize: hp(1.55),
    color: theme.colors.textLight,
    fontFamily: 'System',
    flex: 1,
  },

  moreBtn: {
    padding: 4,
  },

  postText: {
    fontSize: hp(1.85),
    color: '#E7E9EA',
    lineHeight: hp(2.8),
    fontFamily: 'System',
    letterSpacing: 0.1,
    marginBottom: hp(1.2),
  },

  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: wp(8),
    marginTop: 4,
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  actionCount: {
    fontSize: hp(1.55),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

})