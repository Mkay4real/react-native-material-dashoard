import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Headline, ProgressBar } from 'react-native-paper';
import { TextInput } from '../../../exports';
import { useForm } from '../../../form';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import accountCreationStore from '../../../shared/stores/accountCreation';
import { now, randomString } from '../../../shared/utils/utils';
import { saveCompany } from '../services/api';
import { updateCustomerHash } from '../../../shared/helpers/onboarding/axios';

const config = { required: true };
const prefil = (val: string)=>({ ...config, initialValue: val });

export default function BusinessDetails() {
  const nav = useNavigation();

  const { set, bvn, phoneNumber, email, currency, businessType, businessName } = accountCreationStore(
    ({ bvn, setDetails, currency, businessType, phoneNumber, email, businessName }) => {
      return {
        bvn,
        currency,
        businessType,
        businessName,
        phoneNumber,
        email,
        set: setDetails,
      };
    },
  );

  const {
    data,
    error,
    errors,
    submit,
    values,
    submitted,
    isSubmitting,
    handlers,
  } = useForm<{
    // name: string;
    // type: string;
    address: string;
    nature: string;
    sector: string;
    annualTurnover: string;
    taxId: string;
    averageAnnualIncome: string;
    country: string;
    registeredOfficeAddress: string;
    state: string;
    dateOfIncorporation: string;
    incorporationNumber: string;
    countryOfIncorporation: string;
  }>({
    schema: {
      // name: {
      //   ...config,
      //   initialValue: busninessName,
      // },
      // type: {
      //   ...config,
      //   initialValue: businessType,
      // },
      address: prefil("Shomolu Avenue"),
      nature: prefil("Farming"),
      sector: prefil("Agriculture"),
      taxId: prefil("192837465"),
      annualTurnover: prefil("500000"),
      averageAnnualIncome: prefil("500000"),
      country: prefil("Nigeria"),
      registeredOfficeAddress: prefil("1, Aderonmu street, Shodiya"),
      state: prefil("Ogun"),
      dateOfIncorporation: prefil("2020-09-09"),
      incorporationNumber: prefil("12727284"),
      countryOfIncorporation: prefil("Nigeria"),
    },
    onSubmit({ country, state, sector, nature, taxId, address, registeredOfficeAddress,
      dateOfIncorporation,  averageAnnualIncome, incorporationNumber, countryOfIncorporation }) {
      return saveCompany({
        sector,
        country,
        state,
        averageAnnualIncome,
        registeredOfficeAddress,
        natureOfBusiness: nature,
        businessAddress: address,
        requestReferenceId: randomString(30),
        currency: currency as string,
        processInitiatorBvn: bvn as string,
        businessName: businessName as string,
        businessTypeCode: businessType as string,
        dateOfIncorporation,
        incorporationNumber,
        countryOfIncorporation,
        phone: phoneNumber,
        email: email,
        taxId: taxId
      } as any);
    },
  });

  useEffect(() => {
    if (submitted) {
      if (data) {
        set({ correlationId: data.correlationId });
        updateCustomerHash((data as any)?.correlationId);
        nav.navigate('PersonalDetails');
      } else {
        Alert.alert("Error",(error as any)?.response?.data?.responseMessage)
        console.log('response error', (error as any)?.response?.data);
      }
    }
  }, [nav, submitted]);

  console.log(isSubmitting, data, error, errors);

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
      }}>
      <View>
        <Spacer>
          <Headline>Your business details</Headline>
          <ProgressBar progress={0.3} />
        </Spacer>
      </View>
      <View>
        <Spacer gap={20}>
          <TextInput
            disabled
            value={businessName}
            label="Business name"
          // error={errors.has('name')}
          // placeholder="Enter business name"
          // errorMessage={errors.get('name')}
          // onChangeText={handlers.name.onChange}
          />

          <TextInput
            disabled
            label="Type"
            value={businessType}
          // error={errors.has('type')}
          // errorMessage={errors.get('type')}
          // placeholder="Enter business type"
          // onChangeText={handlers.type.onChange}
          />

          <TextInput
            label="Address"
            error={errors.has('address')}
            value={values.address}
            errorMessage={errors.get('address')}
            placeholder="Enter business address"
            onChangeText={handlers.address.onChange}
          />

          <TextInput
            label="Registered office address"
            value={values.registeredOfficeAddress}
            placeholder="Enter registered office address"
            error={errors.has('registeredOfficeAddress')}
            errorMessage={errors.get('registeredOfficeAddress')}
            onChangeText={handlers.registeredOfficeAddress.onChange}
          />

          <TextInput
            label="State"
            placeholder="Enter state"
            value={values.state}
            error={errors.has('state')}
            errorMessage={errors.get('state')}
            onChangeText={handlers.state.onChange}
          />

          <TextInput
            label="Country"
            placeholder="Enter country"
            value={values.country}
            error={errors.has('country')}
            errorMessage={errors.get('country')}
            onChangeText={handlers.country.onChange}
          />

          <TextInput
            label="Nature of business"
            error={errors.has('nature')}
            value={values.nature}
            errorMessage={errors.get('nature')}
            placeholder="Enter business nature"
            onChangeText={handlers.nature.onChange}
          />
          <TextInput
            label="Date of Incorporation"
            error={errors.has('dateOfIncorporation')}
            value={values.dateOfIncorporation}
            errorMessage={errors.get('dateOfIncorporation')}
            placeholder="Enter business date of incorporation"
            onChangeText={handlers.dateOfIncorporation.onChange}
          />
          <TextInput
            label="Incorporation Number"
            error={errors.has('incorporationNumber')}
            value={values.incorporationNumber}
            errorMessage={errors.get('incorporationNumber')}
            placeholder="Enter business incorporation number"
            onChangeText={handlers.incorporationNumber.onChange}
          />
          <TextInput
            label="Country of Incorporation"
            error={errors.has('countryOfIncorporation')}
            value={values.countryOfIncorporation}
            errorMessage={errors.get('countryOfIncorporation')}
            placeholder="Enter country of incorporation"
            onChangeText={handlers.countryOfIncorporation.onChange}
          />

          <TextInput
            label="Sector"
            error={errors.has('sector')}
            value={values.sector}
            errorMessage={errors.get('sector')}
            placeholder="Enter business sector"
            onChangeText={handlers.sector.onChange}
          />

          <TextInput
            label="Tax ID"
            value={values.taxId}
            error={errors.has('taxId')}
            errorMessage={errors.get('taxId')}
            placeholder="Enter business Tax ID"
            onChangeText={handlers.taxId.onChange}
          />

          <TextInput
            label="Annual turnover"
            value={values.annualTurnover}
            error={errors.has('annualTurnover')}
            errorMessage={errors.get('annualTurnover')}
            placeholder="Enter business annual turnover"
            onChangeText={handlers.annualTurnover.onChange}
          />

          <TextInput
            label="Average Annual Income"
            value={values.averageAnnualIncome}
            error={errors.has('averageAnnualIncome')}
            errorMessage={errors.get('averageAnnualIncome')}
            placeholder="Enter Average annual Income"
            onChangeText={handlers.averageAnnualIncome.onChange}
          />
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
