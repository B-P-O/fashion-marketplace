import { View, Text } from 'react-native';
import { FormField } from './FormField';
import { CustomButton } from './CustomButton';

interface ItemFormProps {
  name: string;
  setName: (name: string) => void;
  onSubmit: () => void;
}

export const ItemForm = ({ name, setName, onSubmit }: ItemFormProps) => (
  <View className="p-4">
    <FormField title="Name" value={name} placeholder="Enter name" onChangeText={setName} />
    <CustomButton title="Submit" onPress={onSubmit} />
  </View>
);