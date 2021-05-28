import React, {createRef, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Colors, Headline, useTheme} from 'react-native-paper';
import {Button, Spacer} from '../../../exports';
import SimpleToast from 'react-native-simple-toast';

const CELL_COUNT = 4;

type AuthorizeTransaction = {
  forwardedRef?: any;
  title?: string;
  caption?: string;
  visible: boolean;
  onDismiss(): void;
  description?: string;
  onAuthorize?: () => void;
  positiveButton?: {
    label: string;
    onPress(): void;
  };
};

function AuthorizeTransaction({
  visible, 
  forwardedRef,
  onDismiss,
  onAuthorize = () => {}
}: AuthorizeTransaction) {
  const actionSheetRef = createRef<any>();

  const {
    colors: {primary},
  } = useTheme();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(visible);
  }, [actionSheetRef, visible]);

  const onConfirmPIN = (val: string) => {
    //attempt to validate the PIN
    console.log("Entered PIN: "+val)
    if (String(val).length == 4 && val == "1234") {
      //validated
      return true;
    } else {
      SimpleToast.show("Invalid PIN entered");
      return false;
    }
  };

  return (
    <ActionSheet gestureEnabled ref={actionSheetRef}>
      <View style={styles.layer}>
        <Spacer gap={25}>
          <Headline>Authorize transaction</Headline>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            cellCount={CELL_COUNT}
            onChangeText={setValue}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            rootStyle={styles.codeFieldRoot}
            renderCell={({index, isFocused}) => (
              <View
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                style={[styles.cell, isFocused && {backgroundColor: primary}]}
              />
            )}
          />
          <View>
            <Spacer gap={20}>
              <Button onPress={()=> onConfirmPIN(value)? onAuthorize() : null }>Confirm PIN</Button>
              <Button type="secondary" onPress={onDismiss}>Cancel</Button>
            </Spacer>
          </View>
        </Spacer>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  layer: {
    padding: 20,
  },
  codeFieldRoot: {
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    borderColor: Colors.grey400,
    justifyContent: 'space-around',
  },
  cell: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginHorizontal: 10,
    backgroundColor: Colors.grey200,
  },
});

export default AuthorizeTransaction;
