import React from 'react';
import {
  Alert,
  Image,
  Pressable,
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
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import {
  saveToken,
  getToken
} from "../services";

const Login = ({navigation}: any) => {
  const [mobile, setMobile] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const handleSubmit = () => {
    console.log(mobile, password);
    const userData = {
      phone_number: mobile,
      password: password,
    };
    axios.post('http://172.20.10.2:8000/v1/authen/login', userData)
  .then(async res => {
    console.log(res.data);
    saveToken(res.data.id)
    if (res.data.status == 'ok') {
      navigation.navigate('Tab');
    }
  })
  .catch(error => {
    console.error('Lỗi khi gửi yêu cầu:', error);
  });
    
  };

  return (
    <SafeAreaView style={styles.SafeAreaContainer}>
      <View style={styles.ScreenContainer}>
        <View style={styles.TitleTextContainer}>
          <Text style={styles.ScreenTitle}>Hi welcome back ! 👋</Text>
        </View>

        <View style={styles.BoxContainer}>
          <Text style={styles.TextTitle}>Phone Number</Text>

          <View style={styles.TextInputPhoneContainer}>
            <Text
              style={{
                color: COLORS.primaryBlackHex,
                width: '3%',
                transform: [{translateX: 8}],
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

            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.primaryBlackHex}
              keyboardType="numeric"
              style={{width: '80%'}}
              onChangeText={e => setMobile(e)}></TextInput>
          </View>
        </View>

        <View style={styles.BoxContainer}>
          <Text style={styles.TextTitle}>Password</Text>

          <View style={styles.TextInputContainer}>
            <TextInput
              placeholder="Enter you password"
              placeholderTextColor={COLORS.primaryBlackHex}
              secureTextEntry={showPassword}
              onChangeText={password => setPassword(password)}
              style={{width: '100%'}}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{position: 'absolute', right: 12}}>
              {password.length < 1 ? null : !showPassword ? (
                <Ionicons
                  name="eye-off"
                  size={FONTSIZE.size_24}
                  color={COLORS.primaryBlackHex}
                />
              ) : (
                <Ionicons
                  name="eye"
                  size={FONTSIZE.size_24}
                  color={COLORS.primaryBlackHex}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginVertical: SPACING.space_20}}>
          <CustomButton
            title="Log in"
            color={COLORS.primarySpringGreenHex}
            borderRadius={BORDERRADIUS.radius_4 * 3}
            buttonPressHandler={() => handleSubmit()}
          />
        </View>

        <View style={styles.TextDirectionContainer}>
          <Text style={styles.AskText}>Don't have an account ?</Text>

          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.LoginText}>Register</Text>
          </Pressable>
        </View>
      </View>
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
    justifyContent: 'center',
    paddingLeft: 22,
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

export default Login;
