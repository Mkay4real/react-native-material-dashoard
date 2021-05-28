import React, {createRef, ReactNode, useEffect} from 'react';
import {View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {Headline, Subheading, Colors} from 'react-native-paper';
import {VStack, Spacer, Button} from '../../../exports';

type TransactionConfirmationSheet = {
  forwardedRef?: any;
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

export default function TransactionConfirmationSheet({
  title,
  caption,
  visible = false,
  children,
  onDismiss,
  description,
  positiveButton,
  forwardedRef,
  onConfirm = () => {},
}: TransactionConfirmationSheet) {
  const actionSheetRef = createRef<any>();

  const positive: TransactionConfirmationSheet['positiveButton'] = {
    label: positiveButton?.label ?? 'Confirm',
    onPress: positiveButton?.onPress ?? onConfirm,
  };

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(visible);
  }, [actionSheetRef, visible]);

  return (
    <ActionSheet gestureEnabled ref={forwardedRef ?? actionSheetRef} onClose={onDismiss}>
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



// type ConfirmationSheet = {
//   forwardedRef: any;
//   onDone(): void;
//   onCancel(): void;
//   title?: string;
//   message?: string;
// }
// const ConfirmationSheet = ({forwardedRef, onDone, onCancel, title, message, ...props} : ConfirmationSheet)=>{
//   return (
//     <ActionSheet gestureEnabled ref={forwardedRef}>
//     <View style={styles.layer}>
//       <Spacer gap={25}>
//         <View>
//           <Headline>{title ?? "Confirm request"}</Headline>
//           <Subheading style={styles.bold}>
//             {message ?? "Request for check book service?"}
//           </Subheading>
//         </View>
//         <View>
//           <Spacer gap={20}>
//             <Subheading>
//               This payment will warrant a charge of NGN 60
//             </Subheading>
//             <Button mode="contained"
//               // onPress={() => openSheet("authorization")}
//               onPress={onDone}
//             >Make Request</Button>
//             <Button
//               mode="outlined"
//               type="secondary"
//               style={styles.secBtn}
//               // onPress={() => closeSheet("confirmation")}
//               onPress={onCancel}
//               // color={"#42526E"}
//               color={Colors.grey200}
//             >
//               Cancel
//             </Button>
//           </Spacer>
//         </View>
//       </Spacer>
//     </View>
//   </ActionSheet>

// )};