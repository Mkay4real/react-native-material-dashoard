import React, {useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors, useTheme} from 'react-native-paper';

type Dots = {
  step: number;
  count: number;
};

const DotSeperator = () => <View style={style.dotSeperator} />;

const Dots = React.memo<Dots>(({count, step}) => {
  const {
    colors: {primary},
  } = useTheme();

  const {current} = useRef(new Array(count).fill(0));

  return (
    <FlatList
      data={current}
      horizontal={true}
      scrollEnabled={false}
      ItemSeparatorComponent={DotSeperator}
      keyExtractor={(_, index) => String(index)}
      renderItem={({index: i}) => {
        return (
          <View
            style={[
              style.dot,
              {backgroundColor: step === i ? primary : Colors.grey300},
            ]}
          />
        );
      }}
    />
  );
});

const style = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  dotSeperator: {
    width: 10,
  },
});

export default Dots;
