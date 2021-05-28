import React, {createRef, ReactNode, useEffect} from 'react';
import {View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {Headline, Subheading} from 'react-native-paper';
import CheckCircle from '../../../assets/check-circle.svg';
import {Button, Spacer, VStack} from '../../../exports';

type TransactionDoneSheet = {
  title: string;
  visible: boolean;
  description: string;
  children?: ReactNode;
  onDone(): void;
};

function TransactionDoneSheet({
  title,
  visible,
  children,
  description,
  onDone,
}: TransactionDoneSheet) {
  const actionSheetRef = createRef<any>();

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(visible);
  }, [actionSheetRef, visible]);

  return (
    <ActionSheet gestureEnabled ref={actionSheetRef}>
      <VStack padding={20}>
        <Spacer gap={25}>
          <CheckCircle color="rgba(0, 135, 90, 1)" width={80} height={80} />
          <View>
            <Spacer gap={20}>
              <Headline>{title}</Headline>
              <Subheading>{description}</Subheading>
            </Spacer>
          </View>
          <View>{children}</View>
          <Button onPress={(onDone)}>Done</Button>
        </Spacer>
      </VStack>
    </ActionSheet>
  );
}

export default TransactionDoneSheet;
