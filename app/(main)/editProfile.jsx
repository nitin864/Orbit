import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  StatusBar,
  TextInput,
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
import { updateUserData } from '../../services/updateUserData'

const EditProfile = () => {
  const { user, refreshUserData } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    bio: '',
    address: '',
    phoneNumber: '',
    image: null,
  })

  const [nameFocused, setNameFocused] = useState(false)
  const [bioFocused, setBioFocused] = useState(false)
  const [addressFocused, setAddressFocused] = useState(false)
  const [phoneFocused, setPhoneFocused] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        bio: user.bio || '',
        address: user.address || '',
        phoneNumber: user.phoneNumber || '',
        image: user.image || null,
      })
    }
  }, [user])

  const handleUpdate = async () => {
    if (!form.name.trim()) {
      Alert.alert('Edit Profile', 'Name cannot be empty')
      return
    }

    setLoading(true)

    const { data, error } = await supabase
      .from('users')
      .update({
        name: form.name.trim(),
        bio: form.bio.trim(),
        address: form.address.trim(),
        phoneNumber: form.phoneNumber.trim(),
        image: form.image,
      })
      .eq('id', user.id)
      .select()
      .single()

    setLoading(false)

    if (error) {
      Alert.alert('Update Failed', error.message)
      return
    }

    await refreshUserData(user.id)

    Alert.alert('Success', 'Profile updated successfully')
    router.back()
  }

  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.dark} />

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <BackButton router={router} />

        {/* Glitch title */}
        <View style={styles.glitchOuter}>
          <Text style={[styles.glitchText, styles.glitchRed]}>ORBIT</Text>
          <Text style={[styles.glitchText, styles.glitchCyan]}>ORBIT</Text>
          <Text style={styles.glitchText}>ORBIT</Text>
        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.saveBtnText}>
            {loading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Cover Banner ── */}
        <View style={styles.coverBanner}>
          <Text style={styles.codeLine}>
            orbit.social // edit profile
          </Text>
        </View>

        {/* ── Avatar Section ── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Avatar
              uri={form.image}
              size={hp(12)}
              rounded={theme.radius.xl}
              style={{ borderWidth: 3, borderColor: theme.colors.primary }}
            />
            <Pressable style={styles.avatarEditBtn}>
              <Icon name="camera" size={14} color="#fff" strokeWidth={2} />
            </Pressable>
          </View>
          <Text style={styles.avatarHint}>Tap to change photo</Text>
        </View>

        {/* ── Form ── */}
        <View style={styles.form}>

          {/* Section label */}
          <Text style={styles.sectionLabel}>— PERSONAL INFO —</Text>

          {/* Name */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Full name</Text>
            <View style={[
              styles.inputWrapper,
              nameFocused && styles.inputWrapperFocused
            ]}>
              <View style={styles.inputIcon}>
                <Icon
                  name="user"
                  size={18}
                  color={nameFocused ? theme.colors.primary : theme.colors.textLight}
                  strokeWidth={1.8}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Your full name"
                placeholderTextColor={theme.colors.textLight}
                value={form.name}
                onChangeText={(val) => setForm({ ...form, name: val })}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
              />
            </View>
          </View>

          {/* Bio */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Bio</Text>
            <View style={[
              styles.inputWrapper,
              styles.bioWrapper,
              bioFocused && styles.inputWrapperFocused
            ]}>
              <TextInput
                style={[styles.input, styles.bioInput]}
                placeholder="Tell your orbit about yourself..."
                placeholderTextColor={theme.colors.textLight}
                value={form.bio}
                onChangeText={(val) => setForm({ ...form, bio: val })}
                onFocus={() => setBioFocused(true)}
                onBlur={() => setBioFocused(false)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            <Text style={styles.charCount}>{form.bio.length}/160</Text>
          </View>

          {/* Divider */}
          <View style={styles.sectionDivider} />
          <Text style={styles.sectionLabel}>— CONTACT INFO —</Text>

          {/* Phone */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Phone number</Text>
            <View style={[
              styles.inputWrapper,
              phoneFocused && styles.inputWrapperFocused
            ]}>
              <View style={styles.inputIcon}>
                <Icon
                  name="call"
                  size={18}
                  color={phoneFocused ? theme.colors.primary : theme.colors.textLight}
                  strokeWidth={1.8}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Your phone number"
                placeholderTextColor={theme.colors.textLight}
                value={form.phoneNumber}
                onChangeText={(val) => setForm({ ...form, phoneNumber: val })}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Address */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Location</Text>
            <View style={[
              styles.inputWrapper,
              addressFocused && styles.inputWrapperFocused
            ]}>
              <View style={styles.inputIcon}>
                <Icon
                  name="location"
                  size={18}
                  color={addressFocused ? theme.colors.primary : theme.colors.textLight}
                  strokeWidth={1.8}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Your location"
                placeholderTextColor={theme.colors.textLight}
                value={form.address}
                onChangeText={(val) => setForm({ ...form, address: val })}
                onFocus={() => setAddressFocused(true)}
                onBlur={() => setAddressFocused(false)}
              />
            </View>
          </View>

        </View>

        {/* ── Update Button ── */}
        <View style={styles.btnWrap}>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={handleUpdate}
            disabled={loading}
          >
            <Text style={styles.updateBtnText}>
              {loading ? 'Updating...' : 'Update profile'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom tag */}
        <Text style={styles.bottomTag}>
          ORBIT.SOCIAL // FIND YOUR ORBIT
        </Text>

      </ScrollView>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({

   
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
    backgroundColor: theme.colors.dark,
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

  saveBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: theme.radius.xs,
  },

  saveBtnText: {
    color: '#fff',
    fontSize: hp(1.7),
    fontWeight: '700',
    fontFamily: 'System',
    letterSpacing: 0.3,
  },

  // ── Scroll ───────────────────────────────────
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(6),
  },

  // ── Cover Banner ─────────────────────────────
  coverBanner: {
    height: hp(8),
    backgroundColor: '#0a0c10',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
  },

  codeLine: {
    fontSize: hp(1.1),
    color: '#1D9BF0',
    opacity: 0.4,
    letterSpacing: 1,
    fontFamily: 'System',
  },

  // ── Avatar ───────────────────────────────────
  avatarSection: {
    alignItems: 'center',
    paddingVertical: hp(3),
    borderBottomWidth: 1,
    borderBottomColor: '#1E2732',
    gap: 10,
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

  avatarHint: {
    fontSize: hp(1.5),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  // ── Form ─────────────────────────────────────
  form: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2.5),
    gap: 16,
  },

  sectionLabel: {
    fontSize: hp(1.1),
    letterSpacing: 4,
    color: '#1D9BF0',
    opacity: 0.8,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 4,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: '#1E2732',
    marginVertical: 8,
  },

  fieldWrap: {
    gap: 6,
  },

  fieldLabel: {
    fontSize: hp(1.55),
    color: theme.colors.textLight,
    fontFamily: 'System',
    fontWeight: '500',
    paddingLeft: 4,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.darkLight,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: '#2F3336',
    paddingHorizontal: 14,
    height: hp(7),
  },

  inputWrapperFocused: {
    borderColor: theme.colors.primary,
  },

  bioWrapper: {
    height: hp(14),
    alignItems: 'flex-start',
    paddingVertical: 12,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: hp(1.9),
    color: '#FFFFFF',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },

  bioInput: {
    height: '100%',
    textAlignVertical: 'top',
  },

  charCount: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    textAlign: 'right',
    fontFamily: 'System',
    paddingRight: 4,
  },

  // ── Buttons ──────────────────────────────────
  btnWrap: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
    gap: 12,
  },

  updateBtn: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(1.9),
    borderRadius: theme.radius.xs,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  updateBtnText: {
    color: '#FFFFFF',
    fontSize: hp(2),
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },

  cancelBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: hp(1.85),
    borderRadius: theme.radius.xs,
    borderWidth: 1,
    borderColor: '#2F3336',
    alignItems: 'center',
  },

  cancelBtnText: {
    color: theme.colors.textDark,
    fontSize: hp(2),
    fontWeight: '500',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },

  // ── Bottom Tag ───────────────────────────────
  bottomTag: {
    textAlign: 'center',
    fontSize: hp(1.1),
    letterSpacing: 3,
    color: '#2F3336',
    fontFamily: 'System',
    marginTop: hp(3),
  },

})