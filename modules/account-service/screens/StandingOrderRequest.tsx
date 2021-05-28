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
  TouchableRipple,
} from 'react-native-paper';
import CheckCircle from '../../../assets/success.svg';
import Button from '../../../shared/components/Button';
import HStack from '../../../shared/components/HStack';
import { RadioButton, RadioGroup } from '../../../shared/components/RadioButton';
import Spacer from '../../../shared/components/Spacer';
import StepCounter from '../../../shared/components/StepCounter';
import { useForm } from '../../../form';
import { TextInput, FieldWrapper, CustomPicker } from '../../../exports';
import { Picker } from '@react-native-picker/picker';
import AccountPicker, { Account } from '../../dashboard/components/AccountPicker';
import ErrorLabel from '../../../shared/components/ErrorLabel';
import { notify } from '../../../shared/utils/utils';
import SimpleToast from 'react-native-simple-toast';
import TransactionConfirmationSheet from '../../dashboard/components/TransactionConfirmationSheet';
import AuthorizeTransaction from '../../dashboard/components/AuthorizeTransaction';
import TransactionDoneSheet from '../../dashboard/components/TransactionDoneSheet';
import { useNavigation } from '@react-navigation/native';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import CustomDatePicker from '../../../shared/components/CustomDatePicker';

export default function StandingOrderRequest() {
  const nav = useNavigation();

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
    chequeNumber: number | string;
    amount: number | string;
    nameOfBeneficiary: string;
    duration: string;
    frequency: string;
    selectedAccount: Account;
    startDate: Date;
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

  const frequencies = [
    {
      label: "Daily",
      value: "daily"
    },
    {
      label: "Weekly",
      value: "weekly"
    },
    {
      label: "Bi weekly",
      value: "biweekly"
    },
    {
      label: "Monthly",
      value: "monthly"
    },
  ];

  const durations = [
    {
      label: "Month",
      value: "1"
    },
    {
      label: "Quarter",
      value: "3"
    },
    {
      label: "6 months",
      value: "6"
    },
    {
      label: "1 year",
      value: "12"
    },
  ];

  const [numberOfLeaves, setNumberOfLeaves] = React.useState(suggested[0]);

  const { errors, data, error, values, submit, submitted, isSubmitting, handlers } = useForm<
    Form
  >({
    schema: {
      amount: {
        ...config,
        initialValue: 0,
      },
      chequeNumber: {
        ...config,
        initialValue: 0,
      },
      nameOfBeneficiary: {
        ...config,
        initialValue: '',
      },
      selectedAccount: {
        ...config,

      },
      duration: config,
      frequency: config,
      startDate: config,
    },
    onSubmit({ }) {
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
        setTimeout(() => {
          nav.goBack();
        }, 1500);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <ScrollableDefaultScreen
        decorate={false}
        action={{
          label: 'Make Request',
          onPress: () => {
            console.log({ values, errors });

            submit();
            if (errors.size < 1) {
              console.log("error size is less than one");
              // onOpen();
            }
          },
          loading: isSubmitting,
        }}
        style={{
          flex: 1,
          // padding: 20,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}
      >
        <View style={styles.container}>
          <Spacer gap={20}>
            <View style={styles.leaves}>
              <Paragraph>Account number (to debit)</Paragraph>
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
            </View>

            <TextInput
              keyboardType="numeric"
              // secureTextEntry={true}
              label="Enter Cheque Number"
              placeholder="Enter Cheque Number"
              value={values.chequeNumber as string}
              error={errors.has('chequeNumber')}
              errorMessage={errors.get('chequeNumber')}
              onChangeText={handlers.chequeNumber.onChange}
            />
            <TextInput
              keyboardType="numeric"
              // secureTextEntry={true}
              label="Amount to Pay"
              placeholder="Amount to Pay"
              value={values.amount as string}
              error={errors.has('amount')}
              errorMessage={errors.get('amount')}
              onChangeText={handlers.amount.onChange}
            />

            <TextInput
              label="Name of Individual of Corporation"
              placeholder="Name of Individual of Corporation"
              value={values.nameOfBeneficiary as string}
              onChangeText={handlers.nameOfBeneficiary.onChange}
              error={errors.has('nameOfBeneficiary')}
              errorMessage={errors.get('nameOfBeneficiary')}
            />
            <CustomDatePicker
              label="Start Date"
              placeholder=" Choose Start Date"
              value={values.startDate}
              onDateChange={(dateString, date) => {
                // const acc = accounts.find(item => item.accountNumber == val);
                handlers.startDate.onChange(date);
              }}
            />

            <CustomPicker
              label="Frequency to Pay"
              placeholder="Select Frequency to Pay"
              selectedValue={values.frequency}
              onValueChange={(val) => {
                // const acc = accounts.find(item => item.accountNumber == val);
                handlers.frequency.onChange(val as string);
              }}
              data={frequencies}
              error={errors.has('frequency')}
              errorMessage={errors.get('frequency')}

            />
            
            <View style={styles.leaves}>
              <Paragraph>Duration</Paragraph>
              <FieldWrapper>
                <Picker
                  selectedValue={values.duration}
                  onValueChange={(val) => {
                    // const acc = accounts.find(item => item.accountNumber == val);
                    handlers.duration.onChange(val as string);
                  }}>
                  <Picker.Item
                    value={undefined}
                    label="Select Duration"
                  />
                  {durations.map(({ label, value }) => {
                    return <Picker.Item label={(`${label}`)} value={value} />;
                  })}
                </Picker>
              </FieldWrapper>
              {errors.has('duration') ? (
                <View style={styles.error}>
                  <ErrorLabel
                    message={errors.get('duration') as string}
                  />
                </View>
              ) : null}

            </View>
          </Spacer>
        </View>

      </ScrollableDefaultScreen>

      <TransactionConfirmationSheet
        onConfirm={() => {
          //attempt to suubmit records to server
          //after success, hide loader, confirmation sheet
          !requiresAuthorization && closeTransactionSheet("confirmation");
          openTransactionSheet(requiresAuthorization ? "authorization" : "success");

        }}
        title="Confirm Request"
        description="Request for Standing Order service?"
        caption="This action might not be reversible after approval"
        // onDismiss={() => closeSheet("confirmation")}
        onDismiss={() => closeTransactionSheet("confirmation")}
        visible={openConfirmation}
      // forwardedRef={confirmActionSheetRef}
      />

      <AuthorizeTransaction
        visible={openAuthorization}
        onDismiss={() => { closeTransactionSheet("authorization") }}
        // onAuthorized={() => {}}
        onAuthorize={() => openTransactionSheet("success")}
      />

      <TransactionDoneSheet visible={openDone}
        // onDone={() => closeSheet("success")}
        onDone={() => closeTransactionSheet("success")}
        title="Standing Order successfully initiated"
        description="This standing order request has been successfully initiated, it now
                  awaits the approval of by 2 more people before it's sent" >
        <Spacer>
          <Subheading style={{ color: Colors.grey600 }}>
            Approvals from
                </Subheading>
          <Title>Olabisi Badmus</Title>
          <Title>John Doe</Title>
        </Spacer>
      </TransactionDoneSheet>
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
    // padding: 20,
  },
  error: {
    padding: 10,
    // paddingHorizontal: 20,
  },
  secBtn: {
    backgroundColor: "rgba(9, 30, 66, 0.04);",
  },
  btn: {
    margin: 30,
  },
  layer: {
    // padding: 20,
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
