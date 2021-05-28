import React from 'react';
import {TextInput, StyleSheet, StyleProp, ViewStyle} from 'react-native';

function SearchInput({style}: {style?: StyleProp<ViewStyle>}) {
  return <TextInput placeholder="Search" style={[styles.search, style]} />;
}

const styles = StyleSheet.create({
  search: {
    fontSize: 14,
    lineHeight: 20,
    color: '#58697D',
    borderRadius: 11,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(204, 204, 216, 0.5)',
  },
});

export default SearchInput;
