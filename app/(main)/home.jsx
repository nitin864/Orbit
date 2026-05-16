import { Pressable, StyleSheet, Text, View, Alert, TouchableOpacity, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { supabase } from '../../lib/supabse';
import { useAuth } from '../../context/AuthContext';
import { wp, hp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import { useRouter } from 'expo-router';
import Avatar from '../../components/Avatar';

const Home = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('forYou');

  console.log("User data:", user);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Sign Out', "Error logging out. Please try again.");
    }
  };

  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.dark} />

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>

        {/* Glitch Title */}
        <View style={styles.glitchOuter}>
          <Text style={[styles.glitchText, styles.glitchRed]}>ORBIT</Text>
          <Text style={[styles.glitchText, styles.glitchCyan]}>ORBIT</Text>
          <Text style={styles.glitchText}>ORBIT</Text>
        </View>

        {/* Right Icons — your original logic */}
        <View style={styles.topIcons}>

          <Pressable
            style={styles.topIconBtn}
            onPress={() => router.push('/notifications')}
          >
            <Icon name="heart" size={hp(2.4)} color="#fff" strokeWidth={2} />
          </Pressable>

          <Pressable
            style={styles.topIconBtn}
            onPress={() => router.push('/newPost')}
          >
            <Icon name="edit" size={hp(2.4)} color="#fff" strokeWidth={2} />
          </Pressable>

          <Pressable onPress={() => router.push('/profile')}>
            <Avatar
              uri={user?.image}
              size={hp(4.3)}
              rounded={theme.radius.sm}
              style={{ borderWidth: 2, borderColor: theme.colors.primary }}
            />
          </Pressable>

        </View>
      </View>

      {/* ── Tabs ── */}
      <View style={styles.tabs}>
        {[
          { key: 'forYou', label: 'For You' },
          { key: 'following', label: 'Following' },
          { key: 'orbit', label: 'My Orbit' },
        ].map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          )
        })}
      </View>

      {/* ── Your original logout — kept as is ── */}
      <Text
        onPress={handleLogout}
        style={{ margin: 20, color: 'red', fontSize: hp(2.2) }}
      >
        Logout
      </Text>

      {/* ── FAB ── */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/newPost')}
      >
        <Icon name="edit" size={24} color="#fff" strokeWidth={2} />
      </TouchableOpacity>

      {/* ── Bottom Nav ── */}
      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color={theme.colors.primary} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="search" size={24} color={theme.colors.textLight} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="heart" size={24} color={theme.colors.textLight} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="mail" size={24} color={theme.colors.textLight} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Avatar
            uri={user?.image}
            size={hp(3.6)}
            rounded={theme.radius.sm}
            style={{ borderWidth: 2, borderColor: theme.colors.primary }}
          />
        </TouchableOpacity>

      </View>

    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({

  // ── Top Bar ──────────────────────────────────
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
    backgroundColor: theme.colors.dark,
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
  },

  glitchOuter: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    width: wp(40),
  },

  glitchText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: hp(3.2),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
    fontFamily: 'System',
  },

  glitchRed: {
    color: '#ff004c',
    opacity: 0.65,
    transform: [{ translateX: -2 }],
  },

  glitchCyan: {
    color: '#00e5ff',
    opacity: 0.65,
    transform: [{ translateX: 2 }],
  },

  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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

  // ── Tabs ─────────────────────────────────────
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
    backgroundColor: theme.colors.dark,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.5),
    position: 'relative',
  },

  tabText: {
    fontSize: hp(1.7),
    fontWeight: '500',
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '40%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },

  // ── FAB ──────────────────────────────────────
  fab: {
    position: 'absolute',
    bottom: hp(10),
    right: wp(5),
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  // ── Bottom Nav ───────────────────────────────
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dark,
    borderTopWidth: 1,
    borderTopColor: '#1E2732',
    paddingBottom: hp(3),
    paddingTop: hp(1.2),
    paddingHorizontal: wp(2),
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },

})