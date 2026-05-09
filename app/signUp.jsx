import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'

const SignUp = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [nameFocused, setNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Sign Up', 'Please fill in all fields')
      return
    }
    if (password.length < 6) {
      Alert.alert('Sign Up', 'Password must be at least 6 characters')
      return
    }
    setLoading(true)
     
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.dark} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ── Glitch Hero ── */}
          <View style={styles.hero}>

            

            {/* Back Button */}
            <View style={styles.backWrap}>
              <BackButton router={router} />
            </View>

            {/* Top tag */}
            <Text style={styles.topTag}>— JOIN THE ORBIT —</Text>

            {/* Glitch Title */}
            <View style={styles.glitchOuter}>
              <Text style={[styles.glitchText, styles.glitchRed]}>ORBIT</Text>
              <Text style={[styles.glitchText, styles.glitchCyan]}>ORBIT</Text>
              <Text style={styles.glitchText}>ORBIT</Text>
            </View>

             

          </View>

          {/* ── Form Section ── */}
          <View style={styles.formSection}>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.welcomeText}>Let's go,</Text>
              <Text style={styles.welcomeText}>Create account</Text>
              <Text style={styles.subText}>
                Join orbit and find your world
              </Text>
            </View>

            {/* Inputs */}
            <View style={styles.form}>

              {/* Full Name */}
              <View style={[
                styles.inputWrapper,
                nameFocused && styles.inputWrapperFocused
              ]}>
                <View style={styles.inputIcon}>
                  <Icon
                    name="user"
                    size={20}
                    color={nameFocused ? theme.colors.primary : theme.colors.textLight}
                    strokeWidth={1.8}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  placeholderTextColor={theme.colors.textLight}
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                />
              </View>

              {/* Email */}
              <View style={[
                styles.inputWrapper,
                emailFocused && styles.inputWrapperFocused
              ]}>
                <View style={styles.inputIcon}>
                  <Icon
                    name="mail"
                    size={20}
                    color={emailFocused ? theme.colors.primary : theme.colors.textLight}
                    strokeWidth={1.8}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor={theme.colors.textLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>

              {/* Password */}
              <View style={[
                styles.inputWrapper,
                passwordFocused && styles.inputWrapperFocused
              ]}>
                <View style={styles.inputIcon}>
                  <Icon
                    name="lock"
                    size={20}
                    color={passwordFocused ? theme.colors.primary : theme.colors.textLight}
                    strokeWidth={1.8}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={theme.colors.textLight}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  <Icon
                    name={showPassword ? 'edit' : 'lock'}
                    size={18}
                    color={showPassword ? theme.colors.primary : theme.colors.textLight}
                    strokeWidth={1.8}
                  />
                </TouchableOpacity>
              </View>

              {/* Password hint */}
              <Text style={styles.passwordHint}>
                Must be at least 6 characters
              </Text>

            </View>

            {/* Terms notice */}
            <Text style={styles.terms}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>

            {/* Sign Up Button */}
            <Button
              title="Create account"
              onPress={handleSignUp}
              loading={loading}
              hasShadow={true}
              buttonStyle={styles.signUpBtn}
              textStyle={styles.signUpBtnText}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => router.push('login')}
            >
              <Text style={styles.loginText}>Already have an account?</Text>
              <Text style={styles.loginLink}> Sign in</Text>
            </TouchableOpacity>

            {/* Bottom tag */}
            <Text style={styles.bottomTag}>
              ORBIT.SOCIAL // FIND YOUR ORBIT
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  )
}

export default SignUp

const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
  },

  
  hero: {
    backgroundColor: '#0F1419',
    height: hp(22),
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(2),
  },

  corner: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: '#1D9BF0',
    opacity: 0.6,
  },

  cornerTL: {
    top: 12, left: 12,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopLeftRadius: 3,
  },

  cornerTR: {
    top: 12, right: 12,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopRightRadius: 3,
  },

  backWrap: {
    position: 'absolute',
    top: hp(1.5),
    left: wp(4),
  },

  topTag: {
    fontSize: hp(1.1),
    letterSpacing: 5,
    color: '#1D9BF0',
    opacity: 0.8,
    marginBottom: 6,
    fontFamily: 'System',
    fontWeight: '400',
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
    fontSize: hp(6),
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
    opacity: 0.35,
    letterSpacing: 1,
    marginTop: 8,
    fontFamily: 'System',
  },
 
  formSection: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2.5),
    paddingBottom: hp(4),
    gap: 18,
    backgroundColor: theme.colors.dark,
  },

  header: {
    gap: 4,
  },

  welcomeText: {
    fontSize: hp(3.8),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.8,
    fontFamily: 'System',
    lineHeight: hp(4.5),
  },

  subText: {
    fontSize: hp(1.7),
    fontWeight: '400',
    color: theme.colors.textLight,
    marginTop: 4,
    letterSpacing: 0.2,
    fontFamily: 'System',
  },

  form: {
    gap: 14,
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
    borderWidth: 1,
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

  eyeBtn: {
    padding: 4,
    marginLeft: 8,
  },

  passwordHint: {
    fontSize: hp(1.45),
    color: theme.colors.textLight,
    fontFamily: 'System',
    marginTop: -6,
    paddingLeft: 4,
  },

  terms: {
    fontSize: hp(1.45),
    fontWeight: '400',
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: hp(2.3),
    paddingHorizontal: wp(2),
    fontFamily: 'System',
  },

  termsLink: {
    color: theme.colors.primary,
    fontWeight: '500',
  },

  signUpBtn: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(1.9),
    borderRadius: theme.radius.xs,
  },

  signUpBtnText: {
    color: '#FFFFFF',
    fontSize: hp(2),
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2F3336',
  },

  dividerText: {
    fontSize: hp(1.6),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  loginBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F3336',
    borderRadius: theme.radius.xs,
    paddingVertical: hp(1.85),
  },

  loginText: {
    fontSize: hp(1.7),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  loginLink: {
    fontSize: hp(1.7),
    color: theme.colors.primary,
    fontWeight: '900',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },

  bottomTag: {
    textAlign: 'center',
    fontSize: hp(1.1),
    letterSpacing: 3,
    color: '#2F3336',
    fontFamily: 'System',
  },

})