import React, {createRef, ReactNode, useEffect} from 'react';
import {View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {Headline, Subheading, Colors} from 'react-native-paper';
import {VStack, Spacer, Button} from '../../../exports';

type TransactionSheet = {
  title: string;
  caption?: string;
  visible: boolean;
  onDismiss(): void;
  description: string;
  children?: ReactNode;
  onConfirm?: () => void;
  positiveButton?: {
    label: string;
    onPress(): void;
  };
};

export default function TransactionSheet({
  title,
  caption,
  visible,
  children,
  onDismiss,
  description,
  positiveButton,
  onConfirm = () => {},
}: TransactionSheet) {
  const actionSheetRef = createRef<any>();

  const positive: TransactionSheet['positiveButton'] = {
    label: positiveButton?.label ?? 'Confirm',
    onPress: positiveButton?.onPress ?? onConfirm,
  };

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(visible);
  }, [actionSheetRef, visible]);

  return (
    <ActionSheet gestureEnabled ref={actionSheetRef} onClose={onDismiss}>
      <VStack padding={20} justifyContent="space-between">
        <Spacer gap={20}>
          <View>
            <Headline>{title}</Headline>
            <Subheading>{description}</Subheading>
          </View>
          <View>{children}</View>
          <View>
            <Spacer gap={20}>
              {caption && (
                <Subheading style={{color: Colors.grey600}}>
                  {caption}
                </Subheading>
              )}
              <Button onPress={positive.onPress}>{positive.label}</Button>
              <Button type="secondary" onPress={onDismiss}>
                Cancel
              </Button>
            </Spacer>
          </View>
        </Spacer>
      </VStack>
    </ActionSheet>
  );
}
