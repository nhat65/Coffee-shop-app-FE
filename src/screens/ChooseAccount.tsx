import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
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
import CustomButton from '../components/CustomButton';

const ChooseAccount = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.SafeAreaContainer}>
      <View style={styles.ScreenContainer}>
        <View
          style={{
            alignItems: 'center',
            marginTop: SPACING.space_18,
            marginBottom: SPACING.space_32 * 4,
          }}>
          <Image
            source={require('../assets/app_images/text_welcome.png')}
            style={{
              height: 50,
            }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontFamily: FONTFAMILY.poppins_medium,
            fontSize: FONTSIZE.size_28,
            color: COLORS.primaryBlackHex,
            marginBottom: SPACING.space_32 * 2,
            marginLeft: SPACING.space_8,
          }}>
          Discover the Perfect Brew for You ☕️☕️.
        </Text>

        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: SPACING.space_20 * 2,
              marginVertical: SPACING.space_12,
              height: SPACING.space_28 * 2,
              borderWidth: 1,
              borderColor: COLORS.secondaryGreyHex,
              borderRadius: BORDERRADIUS.radius_25,
            }}>
            <Image
              source={require('../assets/app_images/google.png')}
              style={{height: 32, width: 32}}
            />
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_semibold,
                marginLeft: SPACING.space_15,
                fontSize: FONTSIZE.size_16,
                color: COLORS.primaryBlackHex,
                textDecorationLine: 'underline',
              }}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: SPACING.space_20 * 2,
              marginVertical: SPACING.space_12,
              height: SPACING.space_28 * 2,
              borderWidth: 1,
              borderColor: COLORS.secondaryGreyHex,
              borderRadius: BORDERRADIUS.radius_25,
            }}>
            <Image
              source={require('../assets/app_images/facebook.png')}
              style={{height: 32, width: 32}}
            />
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_semibold,
                marginLeft: SPACING.space_15,
                fontSize: FONTSIZE.size_16,
                color: COLORS.primaryBlackHex,
                textDecorationLine: 'underline',
              }}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SPACING.space_12,
            marginBottom: SPACING.space_12 * 2,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.secondaryGreyHex,
              marginHorizontal: SPACING.space_10,
            }}
          />
          <Text
            style={{
              fontFamily: FONTFAMILY.poppins_medium,
              fontSize: FONTSIZE.size_14,
              color: COLORS.primaryBlackHex,
            }}>
            Or
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.secondaryGreyHex,
              marginHorizontal: SPACING.space_10,
            }}
          />
        </View>

        <CustomButton
          title="Create account"
          color={COLORS.primarySpringGreenHex}
          borderRadius={BORDERRADIUS.radius_25}
          buttonPressHandler={() => navigation.navigate('Signup')}
        />

        <View
          style={{
            marginVertical: SPACING.space_28,
          }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.poppins_regular,
              fontSize: FONTSIZE.size_13,
              color: COLORS.primaryBlackHex,
            }}>
            By signing up, you agree to our{' '}
            <Text style={{fontFamily: FONTFAMILY.poppins_semibold}}>Terms</Text>
            ,{' '}
            <Text style={{fontFamily: FONTFAMILY.poppins_semibold}}>
              Privacy Policy
            </Text>
            , and{' '}
            <Text style={{fontFamily: FONTFAMILY.poppins_semibold}}>
              Cookie Use
            </Text>
          </Text>
        </View>

        <View style={styles.TextDirectionContainer}>
          <Text style={styles.AskText}>Have an account already ?</Text>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.LoginText}>Log in</Text>
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
    marginHorizontal: SPACING.space_18 * 2,
    marginVertical: SPACING.space_18,
    backgroundColor: COLORS.primaryWhiteHex,
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

export default ChooseAccount;
