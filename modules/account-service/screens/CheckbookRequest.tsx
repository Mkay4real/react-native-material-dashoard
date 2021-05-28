import React, { createRef, useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {
  Colors,
  Divider,
  Headline,
  Paragraph,
  Subheading,
  Title,
  useTheme,
} from 'react-native-paper';
import CheckCircle from '../../../assets/success.svg';
import Button from '../../../shared/components/Button';
import HStack from '../../../shared/components/HStack';
import { RadioButton, RadioGroup } from '../../../shared/components/RadioButton';
import Spacer from '../../../shared/components/Spacer';
import StepCounter from '../../../shared/components/StepCounter';
import { useForm } from '../../../form';
import { TextInput, FieldWrapper } from '../../../exports';
import { Picker } from '@react-native-picker/picker';
import AccountPicker, { Account } from '../../dashboard/components/AccountPicker';
import ErrorLabel from '../../../shared/components/ErrorLabel';
import { notify } from '../../../shared/utils/utils';
import SimpleToast from 'react-native-simple-toast';
import TransactionConfirmationSheet from '../../dashboard/components/TransactionConfirmationSheet';
import AuthorizeTransaction from '../../dashboard/components/AuthorizeTransaction';
import TransactionDoneSheet from '../../dashboard/components/TransactionDoneSheet';

export default function CheckbookRequest() {
  //   const nav = useNavigation();
  const confirmActionSheetRef = createRef<any>();
  const authorizeActionSheetRef = createRef<any>();
  const successActionSheetRef = createRef<any>();

  // const actionSheetRef = createRef<any>();

  // bottom sheets states
  const [openDone, setOpenDone] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openAuthorization, setOpenAuthorization] = useState(false);

  const requiresAuthorization = false;

  const {
    colors: { primary },
  } = useTheme();

  const config = { required: true };

  type Form = {
    numberOfLeaves: number | string;
    numberOfBooklets: number;
    selectedAccount: Account;
    deliveryLocation: string;
  };


  const suggested = ['42', '75', '10', 'custom'];
  const locations = [
    {
      label: "Lagos Island",
      value: "021"
    },
    {
      label: "Vicloria Island",
      value: "022"
    },
    {
      label: "Abeokuta",
      value: "023"
    },
  ];

  const [numberOfLeaves, setNumberOfLeaves] = React.useState(suggested[0]);

  const { errors, data, error, values, submit, submitted, isSubmitting, handlers } = useForm<
    Form
  >({
    schema: {
      numberOfLeaves: {
        ...config,
        initialValue: numberOfLeaves,
      },
      numberOfBooklets: {
        ...config,
        initialValue: 0,
      },
      selectedAccount: {
        ...config,

      },
      deliveryLocation: config,
    },
    onSubmit({ numberOfBooklets, numberOfLeaves }) {
      console.log("onSubmit")
      // openSheet();
      // notify({ message: "done" });
      return Promise.resolve();
    },
  });

  React.useEffect(() => {
    if (submitted) {
      console.log({ data })
      openTransactionSheet("confirmation");
      if (data) {
        console.log("Update was successful", data)
        // nav.navigate('UploadDocs');
      }
    }
  }, [submitted]);


  type SheetType = "confirmation" | "authorization" | "success";

  const openSheet = (type: SheetType) => {
    switch (type) {
      case "confirmation":
        confirmActionSheetRef.current?.setModalVisible(true);
        break;
      case "authorization":
        confirmActionSheetRef.current?.setModalVisible(false);
        authorizeActionSheetRef.current?.setModalVisible(true);
        break;
      case "success":
        authorizeActionSheetRef.current?.setModalVisible(false);
        successActionSheetRef.current?.setModalVisible(true);
        break;

      default:
        break;
    }
    // actionSheetRef.current?.setModalVisible(true);
  };
  const closeSheet = (type: SheetType) => {
    switch (type) {
      case "confirmation":
        confirmActionSheetRef.current?.setModalVisible(false);
        break;
      case "authorization":
        authorizeActionSheetRef.current?.setModalVisible(false);
        break;
      case "success":
        successActionSheetRef.current?.setModalVisible(false);
        break;

      default:
        break;
    }
  };

  const openTransactionSheet = (type: SheetType) => {
    switch (type) {
      case "confirmation":
        setOpenConfirmation(true);
        break;
      case "authorization":
        setOpenConfirmation(false);
        setOpenAuthorization(true);
        break;
      case "success":
        setOpenAuthorization(false);
        setOpenDone(true);
        break;

      default:
        break;
    }
  };
  const closeTransactionSheet = (type: SheetType) => {
    switch (type) {
      case "confirmation":
        setOpenConfirmation(false);
        break;
      case "authorization":
        setOpenAuthorization(false);
        break;
      case "success":
        setOpenDone(false);
        break;

      default:
        break;
    }
  };

  const onOpen = useCallback(() => {
    successActionSheetRef.current?.setModalVisible(true);
  }, [successActionSheetRef]);

  const onClose = useCallback(() => {
    successActionSheetRef.current?.setModalVisible(false);
  }, [successActionSheetRef]);

  const cancelButton = (
    <Button mode="contained" onPress={() => closeSheet("authorization")} color={Colors.grey200}>
      cancel
    </Button>
  );

  const onConfirmPIN = (val: string) => {
    //attempt to validate the PIN
    if (String(val).length == 4) {
      //validated
      return true;
    } else {
      SimpleToast.show("Inavlid PIN entered");
      return false;
    }
  };

  return (
    <>
      <View style={[styles.flex, styles.screen]}>
        <View style={styles.container}>

          <View style={styles.leaves}>
            <Paragraph>Account number (to debit)</Paragraph>
            {/* <HStack> */}
            <AccountPicker
              onAccountSelected={handlers.selectedAccount.onChange}
              selectedAccount={values.selectedAccount}
              onClick={() => { console.log("Account picker clicked") }}
            />

            {errors.has('selectedAccount') ? (
              <View style={styles.error}>
                <ErrorLabel
                  message={errors.get('selectedAccount') as string}
                />
              </View>
            ) : null}
            {/* <Divider /> */}

            {/* </HStack> */}
          </View>

          <HStack padding={20} alignItems="center">
            <Spacer horizontal>
              <Subheading style={styles.flex}>
                Please specify number of booklets
              </Subheading>
              <StepCounter style={styles.flex}
                value={values.numberOfBooklets}
                onIncrement={handlers.numberOfBooklets.onChange}
                onDecrement={handlers.numberOfBooklets.onChange}
              />
            </Spacer>
          </HStack>
          {errors.has('numberOfBooklets') ? (
            <View style={styles.error}>
              <ErrorLabel
                message={errors.get('numberOfBooklets') as string}
              />
            </View>
          ) : null}
          <Divider />
          <View style={styles.leaves}>
            <Paragraph>Select number of leaves</Paragraph>
            <HStack>
              <RadioGroup value={numberOfLeaves} onChange={(val) => {
                handlers.numberOfLeaves.onChange(val === "custom" ? "0" : val);
                setNumberOfLeaves(val)
              }
              }>
                <FlatList
                  numColumns={4}
                  data={suggested}
                  renderItem={({ item }) => (
                    <RadioButton
                      label={item}
                      value={item}
                      style={styles.radio}
                    />
                  )}
                />
              </RadioGroup>
            </HStack>
            {
              numberOfLeaves === "custom" ?
                // true ?
                <TextInput
                  label="Number of Leaves"
                  placeholder="Number of Leaves"
                  value={values.numberOfLeaves as string}
                  error={errors.has('numberOfLeaves')}
                  errorMessage={errors.get('numberOfLeaves')}
                  onChangeText={(val) => {
                    val = val.trim();
                    handlers.numberOfLeaves.onChange(val);
                    setNumberOfLeaves(suggested.includes(val) ? val : "custom");
                  }
                  }
                /> : null
            }

          </View>
          <View style={styles.leaves}>
            <Paragraph>Delivery or Pickup location</Paragraph>
            <FieldWrapper>
              <Picker
                selectedValue={values.deliveryLocation}
                onValueChange={(val) => {
                  // const acc = accounts.find(item => item.accountNumber == val);
                  handlers.deliveryLocation.onChange(val as string);
                }}>
                <Picker.Item
                  value={undefined}
                  label="Select Pickup/Delivery location"
                />
                {locations.map(({ label, value }) => {
                  return <Picker.Item label={(`${label} (${value})`)} value={value} />;
                })}
              </Picker>
            </FieldWrapper>
            {errors.has('deliveryLocation') ? (
              <View style={styles.error}>
                <ErrorLabel
                  message={errors.get('deliveryLocation') as string}
                />
              </View>
            ) : null}

          </View>
        </View>
        <Button mode="contained" onPress={() => {
          console.log({ values, errors });

          submit();
          if (errors.size < 1) {
            console.log("error size is less than one");
            // onOpen();
          }
        }} style={styles.btn}>
          Make Request
        </Button>
        {/* <Button mode="contained" onPress={onOpen} style={styles.btn}>
          Make Request
        </Button> */}
      </View>

      <TransactionConfirmationSheet
        onConfirm={() => {
          //attempt to suubmit records to server
          //after success, hide loader, confirmation sheet
          !requiresAuthorization && closeTransactionSheet("confirmation");
          openTransactionSheet(requiresAuthorization ? "authorization" : "success");

        }}
        title="Confirm request"
        description="Request for check book service?"
        caption="This payment will warrant a charge of NGN 60"
        // onDismiss={() => closeSheet("confirmation")}
        onDismiss={() => closeTransactionSheet("confirmation")}
        visible={openConfirmation}
        // forwardedRef={confirmActionSheetRef}
      />

      <AuthorizeTransaction
        visible={openAuthorization}
        onDismiss={() => { closeTransactionSheet("authorization") }}
        // onAuthorized={() => {}}
        onAuthorize={() =>openTransactionSheet("success")}
      />

      <TransactionDoneSheet visible={openDone}
        // onDone={() => closeSheet("success")}
        onDone={() => closeTransactionSheet("success")}
        title="Account service successfully initiated"
        description="This checkbook request has been successfully initiated, it now
                  awaits the approval of by 2 more people before it's sent" >
        <Spacer>
          <Subheading style={{ color: Colors.grey600 }}>
            Approvals from
                </Subheading>
          <Title>Olabisi Badmus</Title>
          <Title>John Doe</Title>
        </Spacer>
      </TransactionDoneSheet>

      {/* <ActionSheet gestureEnabled ref={authorizeActionSheetRef}>
        <View style={styles.layer}>
          <Spacer gap={25}>
            <Headline>Authorize transaction</Headline>
            <TextInput
              keyboardType="numeric"
              secureTextEntry={true}
              style={[styles.pin, { color: primary }]}
            />
            <View>
              <Spacer gap={20}>
                <Button mode="contained" onPress={() => onConfirmPIN("2345") ? openSheet("success") : closeSheet("confirmation")}>Confirm PIN</Button>
                <Button mode="contained" type="secondary" onPress={() => closeSheet("authorization")}>Cancel</Button>
                 {/* cancelButton} * /}
              </Spacer>
            </View>
          </Spacer>
        </View>
      </ActionSheet> */}

      <ActionSheet gestureEnabled ref={successActionSheetRef}>

        <View style={styles.layer}>
          <Spacer gap={25}>
            <CheckCircle color="rgba(0, 135, 90, 1)" width={80} height={80} />
            <View>
              <Spacer gap={20}>
                <Headline>Account service successfully initiated</Headline>
                <Subheading>
                  This checkbook request has been successfully initiated, it now
                  awaits the approval of by 2 more people before it's sent
                </Subheading>
              </Spacer>
            </View>
            <View>
              <Spacer>
                <Subheading style={{ color: Colors.grey600 }}>
                  Approvals from
                </Subheading>
                <Title>John Doe</Title>
                <Title>John Doe</Title>
              </Spacer>
            </View>
            <Button mode="contained" onPress={() => closeSheet("success")}>Done</Button>
          </Spacer>
        </View>
      </ActionSheet>

    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  container: {
    marginTop: 30,
  },
  radio: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  leaves: {
    padding: 20,
  },
  error: {
    padding: 10,
    paddingHorizontal: 20,
  },
  secBtn: {
    backgroundColor: "rgba(9, 30, 66, 0.04);",
  },
  btn: {
    margin: 30,
  },
  layer: {
    padding: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  pin: {
    fontSize: 35,
    borderWidth: 1,
    letterSpacing: 40,
    borderRadius: 100,
    textAlign: 'center',
    // color: Colors.grey600,
    borderColor: Colors.grey400,
    backgroundColor: Colors.grey200,
  },
});
