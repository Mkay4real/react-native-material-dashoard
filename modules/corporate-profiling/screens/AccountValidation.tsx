import {useNavigation, useRoute, NavigationProp} from '@react-navigation/native';
import React, {useEffect, useCallback} from 'react';
import {TextInput} from '../../../exports';
import DefaultScreen from '../../../shared/components/DefaultScreen';

import {useForm} from '../../../form';
import { requestOtp, getAccountDetails, AccountDetails } from '../../../shared/services/api';
import corporateProfilingStore from '../../../shared/stores/corporateProfiling';
import { accountDetails } from '../../../shared/utils/dummy_data';

export default function AccountValidation({navigation, route} : any) {
  const nav = useNavigation();
  const {params} = useRoute();

  const set = corporateProfilingStore(({setDetails}) => setDetails);

  const {errors, data, error, values, submit, submitted, isSubmitting, onChange} = useForm({
    schema: {
      accountNumber: {
        required: true,
        initialValue: '',
      },
    }, //MobileNo
    onSubmit({accountNumber}) {
      return getAccountDetails(accountNumber as string)();
    },
  });

  const makeOtpRequest = useCallback(async () => {
    const otpResponse = await requestOtp({requestFlowReference: data.requestReferenceId});
    if(otpResponse){
      set({requestReferenceId: data.requestReferenceId});
      nav.navigate('Otp', {mobileNumber: (data as AccountDetails)?.MobileNo});
    }
    
  }, [nav, data]);


  useEffect(() => {
    const isSME = Boolean((params as any)?.isSME);
   
    console.log("isSME", (params as any)?.isSME , isSME);

    if (submitted) {
      set({accountNumber: values.accountNumber, 
        accountNumberDetails: accountDetails,
        isSME,
      });
      (data && data.responseCode=="00")?
      makeOtpRequest():
      nav.navigate('Otp');
    }
    console.log('response', data)
    console.log("error", error)
  }, [nav, submitted]);

  return (
    <DefaultScreen
      decorate={true}
      title="Account Validation"
      subtitle="Please provide your parallex account number"
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
      }}>
      <TextInput
        label="Account number"
        placeholder="Enter account number"
        error={errors.has('accountNumber')}
        errorMessage={errors.get('accountNumber')}
        onChangeText={onChange.bind(null, 'accountNumber')}
      />
    </DefaultScreen>
  );
}
