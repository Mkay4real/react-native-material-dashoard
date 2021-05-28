import React, {ReactNode} from 'react';
import {FlatListProps, StyleSheet, View, FlatList} from 'react-native';
import {Spacer} from '../../../exports';
import SearchInput from './SearchInput';

type TabShell<ItemT = any> = FlatListProps<ItemT> & {
  action?: ReactNode;
  fallback: ReactNode;
  children?: ReactNode;
};

export default function TabShell({
  data,
  action,
  fallback,
  children,
  ...props
}: TabShell) {
  return (
    <View style={styles.shell}>
      {(!data || data?.length <= 0) && fallback}
      {data && (
        <>
          <Spacer gap={10}>
            <View>
              <SearchInput style={{margin: 20}} />
            </View>
            <View>{children}</View>
            <FlatList data={data} style={styles.list} {...props} />
            {action && <View style={styles.action}>{action}</View>}
          </Spacer>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  list: {
    marginTop: 10,
  },
  action: {
    borderWidth: 1,
    backgroundColor: '#fafaff',
    borderColor: 'rgba(204, 204, 216, 0.5)',
  },
});
