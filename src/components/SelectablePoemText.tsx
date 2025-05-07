import React from 'react';
import { Text, View, ScrollView, useColorScheme } from 'react-native';
import { Poem } from '../types/navigation';

interface SelectablePoemTextProps {
  poem: Poem;
  fontSize: number;
  containerStyle?: any;
  textStyle?: any;
  darkTextStyle?: any;
}

const SelectablePoemText: React.FC<SelectablePoemTextProps> = ({
  poem,
  fontSize,
  containerStyle,
  textStyle,
  darkTextStyle,
}) => {
  const colorScheme = useColorScheme();

  // Add an extra newline between each line of the poem
  const formattedPoem = poem.poem.split('\n').join('\n\n');

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      <View>
        <Text
          selectable={true}
          style={[
            colorScheme === 'light' ? textStyle : darkTextStyle,
            { fontSize },
          ]}
        >
          {formattedPoem}
        </Text>
      </View>
    </ScrollView>
  );
};

export default SelectablePoemText; 