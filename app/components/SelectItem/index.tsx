import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SelectItemProps {
  backgroundColor?: string;
  textColor?: string;
  leftIconName: string;
  keyText: string;
  valueText: string;
  onPress: () => void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  backgroundColor = 'white',
  textColor = 'black',
  leftIconName,
  keyText,
  valueText,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.containerStyle, backgroundColor}}>
        <Icon name={leftIconName} size={24} color={textColor} />
        <Text style={{...styles.text14Style, color: textColor}}>{keyText}</Text>
        <Text style={{color: textColor, fontSize: 14, marginHorizontal: 4}}>
          {valueText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectItem;

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
    marginHorizontal: 12,
    marginVertical: 8,
  },
});
