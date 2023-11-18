import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SelectRightIconProps {
  backgroundColor?: string;
  textColor?: string;
  text: string;
  iconName: string;
  onPress: () => void;
}

const SelectRightIcon: React.FC<SelectRightIconProps> = ({
  backgroundColor = 'white',
  textColor = 'black',
  text,
  iconName,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.containerStyle, backgroundColor}}>
        <Text style={{...styles.text14Style, color: textColor}}>{text}</Text>
        <Icon name={iconName} size={24} color={textColor} />
      </View>
    </TouchableOpacity>
  );
};

export default SelectRightIcon;

interface Styles {
  containerStyle: ViewStyle;
  text14Style: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  text14Style: {
    flex: 1,
    color: 'black',
    fontSize: 14,
    marginVertical: 8,
  },
});
