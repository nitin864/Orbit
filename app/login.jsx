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
import { supabase } from '../lib/supabse'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Login', 'Please enter your email and password');
    return;
  }

  setLoading(true);

  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  const { error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password: trimmedPassword,
  });
  
  console.log('error' , error)
  if (error) {
    Alert.alert('Login Error', error.message);
    setLoading(false);
    return;
  }

  setLoading(false);
};

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

          {/* Glitch Hero */}
          <View style={styles.hero}>





            {/* Back Button */}
            <View style={styles.backWrap}>
              <BackButton router={router} />
            </View>



            {/* Glitch Title */}
            <View style={styles.glitchOuter}>
              <Text style={[styles.glitchText, styles.glitchRed]}>ORBIT</Text>
              <Text style={[styles.glitchText, styles.glitchCyan]}>ORBIT</Text>
              <Text style={styles.glitchText}>ORBIT</Text>
            </View>

            <Text style={styles.codeLine}>
              sys.init // orbit.social // stay in orbit...
            </Text>



          </View>

          {/* Form Section */}
          <View style={styles.formSection}>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.welcomeText}>Hey,</Text>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.subText}>Sign in to continue your orbit</Text>
            </View>

            {/* Inputs */}
            <View style={styles.form}>

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

              {/* Forgot */}
              <TouchableOpacity
                onPress={() => router.push('forgotPassword')}
                style={styles.forgotWrap}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

            </View>

            {/* Sign In Button */}
            <Button
              title="Sign in"
              onPress={handleLogin}
              loading={loading}
              hasShadow={true}
              buttonStyle={styles.loginBtn}
              textStyle={styles.loginBtnText}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sign Up */}
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => router.push('signUp')}
            >
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <Text style={styles.signUpLink}> Sign up</Text>
            </TouchableOpacity>

            {/* Bottom code tag */}
            <Text style={styles.bottomTag}>
              ORBIT.SOCIAL // FIND YOUR ORBIT
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
  },

   
  hero: {
    backgroundColor: '#0F1419',
    height: hp(20),
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(2),
  },

  scanlines: {
    position: 'absolute',
    inset: 0,
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.06,
    backgroundColor: 'transparent',
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

  comingSoon: {
    fontSize: hp(1.1),
    letterSpacing: 5,
    color: '#1D9BF0',
    opacity: 0.8,
    marginBottom: 8,
    fontFamily: 'System',
    fontWeight: '400',
  },

  glitchOuter: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(7),
  },

  glitchOuter: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(7),
    width: '100%',           
  },

  glitchText: {
    fontSize: hp(6),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
    position: 'absolute',
    fontFamily: 'System',
    textAlign: 'center',     
    width: '100%',           
  },

  glitchRed: {
    color: '#ff004c',
    left: 0,                 
    opacity: 0.65,
    transform: [{ translateX: -3 }],   
  },

  glitchCyan: {
    color: '#00e5ff',
    left: 0,                
    opacity: 0.65,
    transform: [{ translateX: 3 }],    
  },

  codeLine: {
    fontSize: hp(1.1),
    color: '#1D9BF0',
    opacity: 0.35,
    letterSpacing: 1,
    marginTop: 10,
    fontFamily: 'System',
  },

  
  formSection: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(4),
    gap: 20,
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

  forgotWrap: {
    alignSelf: 'flex-end',
  },

  forgotText: {
    fontSize: hp(1.6),
    color: theme.colors.primary,
    fontWeight: '600',
    letterSpacing: 0.2,
    fontFamily: 'System',
  },

  loginBtn: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(1.9),
    borderRadius: theme.radius.xs,
  },

  loginBtnText: {
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

  signUpBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F3336',
    borderRadius: theme.radius.xs,
    paddingVertical: hp(1.85),
  },

  signUpText: {
    fontSize: hp(1.7),
    color: theme.colors.textLight,
    fontFamily: 'System',
  },

  signUpLink: {
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