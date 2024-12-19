import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

interface CustomButtonProps {
  title: string;
  color: string;
  borderRadius?: number;
  buttonPressHandler: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  color,
  borderRadius,
  buttonPressHandler,
}) => {
  return (
    <TouchableOpacity
      onPress={buttonPressHandler}
      style={{...styles.Button, backgroundColor: color, borderRadius: borderRadius}}>
      <Text style={styles.TextButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  TextButton: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_12 * 2,
    color: COLORS.primaryWhiteHex,
  },
});

export default CustomButton;
