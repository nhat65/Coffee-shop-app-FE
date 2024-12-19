import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Error from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const Signup = ({navigation, e}: any) => {
  const [email, setEmail] = React.useState('');
  const [emailVerify, setEmailVerify] = React.useState(false);
  const [mobile, setMobile] = React.useState('');
  const [mobileVerify, setMobileVerify] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordVerify, setPasswordVerify] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordVerify, setConfirmPasswordVerify] =
    React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);

  const handleSubmit = () => {
    const userData = {
      email: email,
      phone_number: mobile,
      password: password,
    };

    if (
      emailVerify &&
      mobileVerify &&
      passwordVerify &&
      confirmPasswordVerify
    ) {
      axios
        .post('http://172.20.10.2:8000/v1/authen/signup', userData)
        .then(res => {
          console.log(res.data);
          if (res.data.status == 'ok') {
            navigation.navigate('Login');
          } else {
            Alert.alert('User already exists!!');
          }
        })
        .catch(err => console.log(err));
    } else {
      Alert.alert('Please fill all the fields!!');
    }
  };

  const handleEmail = (emailVar: any) => {
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{3,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  };

  const handleMobile = (mobileVar: any) => {
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/^(0\d{9})$/.test(mobileVar) || /^\d{9}$/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  };

  const handlePassword = (passwordVar: any) => {
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        passwordVar,
      )
    ) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  };

  const handleConfirmPassword = (confirmPasswordVar: any) => {
    setConfirmPassword(confirmPasswordVar);
    setConfirmPasswordVerify(false);
    if (password === confirmPasswordVar) {
      setConfirmPassword(confirmPasswordVar);
      setConfirmPasswordVerify(true);
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.ScreenContainer}>
          <View style={styles.TitleTextContainer}>
            <Text style={styles.ScreenTitle}>Create Account</Text>
          </View>

          <View style={styles.BoxContainer}>
            <Text style={styles.TextTitle}>Email Address</Text>

            <View style={styles.TextInputContainer}>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={COLORS.primaryBlackHex}
                keyboardType="email-address"
                style={{width: '100%'}}
                onChangeText={e => handleEmail(e)}></TextInput>
              {email.length < 4 ? null : emailVerify ? (
                <></>
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </View>
          </View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 4,
                color: 'red',
              }}>
              Enter Proper Email Address
            </Text>
          )}

          <View style={styles.BoxContainer}>
            <Text style={styles.TextTitle}>Phone Number</Text>

            <View style={styles.TextInputPhoneContainer}>
              <Text
                style={{
                  color: COLORS.primaryBlackHex,
                  width: '4%',

                  transform: [{translateX: 4}],
                }}>
                +
              </Text>

              <TextInput
                placeholder="84"
                placeholderTextColor={COLORS.primaryBlackHex}
                keyboardType="numeric"
                maxLength={3}
                style={{
                  width: '11%',
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.primaryGreyHex,
                  height: '100%',
                }}></TextInput>

              <View
                style={{
                  width: '100%',
                  height: SPACING.space_24 * 2,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: 12,
                  paddingRight: 20,
                }}>
                <TextInput
                  placeholder="Enter your phone number"
                  placeholderTextColor={COLORS.primaryBlackHex}
                  keyboardType="numeric"
                  style={{width: '80%'}}
                  onChangeText={e => handleMobile(e)}></TextInput>
                {mobile.length < 1 ? null : mobileVerify ? (
                  <></>
                ) : (
                  <Error name="error" color="red" size={20} />
                )}
              </View>
            </View>
          </View>
          {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text
              style={{
                marginLeft: 4,
                color: 'red',
              }}>
              Phone number is not correct
            </Text>
          )}

          <View style={styles.BoxContainer}>
            <Text style={styles.TextTitle}>Password</Text>

            <View style={styles.TextInputContainer}>
              <TextInput
                placeholder="Enter you password"
                placeholderTextColor={COLORS.primaryBlackHex}
                onChangeText={passwordVar => handlePassword(passwordVar)}
                secureTextEntry={showPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', right: 12}}>
                {password.length < 1 ? null : !showPassword ? (
                  <Ionicons
                    name="eye-off"
                    size={FONTSIZE.size_20}
                    color={COLORS.primaryBlackHex}
                  />
                ) : (
                  <Ionicons
                    name="eye"
                    size={FONTSIZE.size_20}
                    color={COLORS.primaryBlackHex}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 4,
                color: 'red',
              }}>
              Must have uppercase, lowercase, number, symbol, and be at least 8
              characters.
            </Text>
          )}

          <View style={styles.BoxContainer}>
            <Text style={styles.TextTitle}>Confirm Password</Text>

            <View style={styles.TextInputContainer}>
              <TextInput
                placeholder="Enter you password"
                placeholderTextColor={COLORS.primaryBlackHex}
                onChangeText={e => handleConfirmPassword(e)}
                secureTextEntry={showConfirmPassword}
              />

              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{position: 'absolute', right: 12}}>
                {confirmPassword.length < 1 ? null : !showConfirmPassword ? (
                  <Ionicons
                    name="eye-off"
                    size={FONTSIZE.size_20}
                    color={COLORS.primaryBlackHex}
                  />
                ) : (
                  <Ionicons
                    name="eye"
                    size={FONTSIZE.size_20}
                    color={COLORS.primaryBlackHex}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {confirmPassword.length < 1 ? null : confirmPasswordVerify ? null : (
            <Text
              style={{
                marginLeft: 4,
                color: 'red',
              }}>
              Passwords do not match.
            </Text>
          )}

          <View style={{marginVertical: SPACING.space_20}}>
            <CustomButton
              title="Sign up"
              color={COLORS.primarySpringGreenHex}
              borderRadius={BORDERRADIUS.radius_4 * 3}
              buttonPressHandler={() => handleSubmit()}
            />
          </View>

          <View style={styles.TextDirectionContainer}>
            <Text style={styles.AskText}>Already have an account ?</Text>

            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.LoginText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  ScreenContainer: {
    flex: 1,
    marginHorizontal: SPACING.space_24,
    marginVertical: SPACING.space_18,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  TitleTextContainer: {
    marginBottom: SPACING.space_20,
    marginTop: SPACING.space_16,
  },
  ScreenTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_4,
  },
  ScreenSlogan: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
  },
  BoxContainer: {
    flexDirection: 'column',
    marginVertical: SPACING.space_8,
  },
  TextTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_8,
    marginLeft: SPACING.space_4,
  },
  TextInputPhoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: SPACING.space_24 * 2,
    borderColor: COLORS.primaryBlackHex,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    paddingLeft: 10,
  },
  TextInputContainer: {
    width: '100%',
    height: SPACING.space_24 * 2,
    borderColor: COLORS.primaryBlackHex,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 32,
  },
  TextDirectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_15,
  },
  AskText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
  },
  LoginText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginLeft: SPACING.space_8,
  },
});

export default Signup;
