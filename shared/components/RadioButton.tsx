import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
} from 'react';
import {View, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';

type RadioButton<T extends string> = {
  value: T;
  label: string;
  style?: StyleProp<ViewStyle>;
};

type RadioGroupProps<T extends string> = {
  value: T;
  onChange: (value: string) => void;
  children: ReactElement | ReactElement[];
};

type GroupContext<T extends string = any> = {
  selected: T;
  setSelected: (value: T) => void;
};

const Context = createContext<GroupContext>({} as GroupContext);

export function RadioGroup<T extends string>({
  value,
  children,
  onChange,
}: RadioGroupProps<T>) {
  const setSelected = useCallback((val: T) => {
    onChange(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider value={{ selected: value, setSelected }}>
      {children}
    </Context.Provider>
  );
}

export function RadioButton<T extends string>({
  value,
  label,
  style,
}: RadioButton<T>) {
  const { colors, roundness } = useTheme();
  const { selected, setSelected } = useContext(Context);

  const isSelected = value === selected;

  const update = useCallback(() => {
    setSelected(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View
      style={[
        styles.radio,
        {
          borderRadius: roundness,
          borderColor: isSelected ? colors.primary : '#686775',
          backgroundColor: isSelected ? colors.primary : 'white',
        },
        style,
      ]}>
      <TouchableRipple onPress={update}>
        <Text style={{color: isSelected ? 'white' : '#686775'}}>{label}</Text>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
