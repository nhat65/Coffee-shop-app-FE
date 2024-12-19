import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomButton from '../components/CustomButton';

const Welcome = ({navigation}: any) => {
  return (
    <View style={styles.ScreenContainer}>
      <View style={styles.ImageWelcomeContainer}>
        <Image
          source={require('../assets/app_images/img_welcome.png')}
          style={{height: '100%', width: '100%'}}
        />
        <Image
          source={require('../assets/app_images/text_welcome.png')}
          style={{marginTop: SPACING.space_8}}
        />
      </View>

      <View style={styles.TextContainer}>
        <CustomButton
          title="Get Started"
          color={COLORS.primarySpringGreenHex}
          borderRadius={BORDERRADIUS.radius_4 * 3}
          buttonPressHandler={() => navigation.navigate('ChooseAccount')}
        />

        {/* <View style={styles.TextDirectionContainer}>
          <Text style={styles.AskText}>Already have an account ?</Text>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.LoginText}>Login</Text>
          </Pressable>
        </View>

        <Pressable>
          <Text
            style={{
              marginTop: SPACING.space_2 * 3,
              fontFamily: FONTFAMILY.poppins_regular,
              fontSize: FONTSIZE.size_16,
              color: COLORS.primaryBlackHex,
            }}>
            Continue as guest
          </Text>
        </Pressable> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  ImageWelcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    transform: [{translateY: -190}],
  },
  TextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.space_20,
    transform: [{translateY: -100}],
  },
  TextDirectionContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_12,
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

export default Welcome;
