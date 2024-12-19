import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface BoxTextProps {
  text: string;
  placeholder: string;
  keyboardType?: any;
}

const BoxText: React.FC<BoxTextProps> = ({text, placeholder, keyboardType}) => {
  return (
    <View style={styles.BoxContainer}>
      <Text style={styles.TextTitle}>{text}</Text>

      <View style={styles.TextInputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.primaryBlackHex}
          keyboardType={keyboardType}
          style={{width: '100%'}}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default BoxText;
