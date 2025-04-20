import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';
import { Colors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle.backgroundColor = Colors.primary;
        break;
      case 'secondary':
        buttonStyle.backgroundColor = Colors.secondary;
        break;
      case 'outline':
        buttonStyle.backgroundColor = 'transparent';
        buttonStyle.borderWidth = 1;
        buttonStyle.borderColor = Colors.primary;
        break;
      case 'danger':
        buttonStyle.backgroundColor = Colors.danger;
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.paddingVertical = 6;
        buttonStyle.paddingHorizontal = 12;
        break;
      case 'medium':
        buttonStyle.paddingVertical = 10;
        buttonStyle.paddingHorizontal = 16;
        break;
      case 'large':
        buttonStyle.paddingVertical = 14;
        buttonStyle.paddingHorizontal = 20;
        break;
    }
    
    // Full width
    if (fullWidth) {
      buttonStyle.width = '100%';
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle.opacity = 0.5;
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleObj: TextStyle = {};
    
    // Variant text styles
    switch (variant) {
      case 'outline':
        textStyleObj.color = Colors.primary;
        break;
      default:
        textStyleObj.color = Colors.white;
        break;
    }
    
    // Size text styles
    switch (size) {
      case 'small':
        textStyleObj.fontSize = 14;
        break;
      case 'medium':
        textStyleObj.fontSize = 16;
        break;
      case 'large':
        textStyleObj.fontSize = 18;
        break;
    }
    
    return textStyleObj;
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? Colors.primary : Colors.white} 
          size="small" 
        />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});