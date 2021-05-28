import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';
import { TextInput } from '../../../exports';
import { useForm } from '../../../form';
import ErrorLabel from '../../../shared/components/ErrorLabel';
import FieldWrapper from '../../../shared/components/FieldWrapper';
import { RadioButton, RadioGroup } from '../../../shared/components/RadioButton';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import useAsync from '../../../shared/hooks/useAsync';
import accountCreationStore from '../../../shared/stores/accountCreation';
import { getCompanyTypes, validateRCNumber, getInitiatorProgress } from '../services/api';
import { updateCustomerHash } from '../../../shared/helpers/onboarding/axios';

const _companyTypes = ["LTD", "PLC", "PARTNERSHIP", "SOLE_PROPRIETORSHIP"];

const RCNumberTypes = ['RC', 'BN', 'Others'];

const CURRENCY = [
  {
    label: 'Naira',
    value: 'NGN',
  },
  {
    label: 'Dollars',
    value: 'USD',
  },
  {
    label: 'Euros',
    value: 'EUR',
  },
  {
    label: 'Pounds',
    value: 'GBP',
  },
];

const config = {
  required: true,
  initialValue: '',
};

export default function BusinessType() {
  const nav = useNavigation();

  const { set, bvn } = accountCreationStore(
    ({ bvn, correlationId, setDetails, currency, businessType, businessName }) => {
      return {
        bvn,
        correlationId,
        businessName,
        set: setDetails,
      };
    },
  );

  const {
    data,
    errors,
    values,
    submit,
    submitted,
    isSubmitting,
    handlers: { currency, rcType, businessType, rcNumber, companyName, },
  } = useForm({
    schema: {
      currency: config,
      rcType: config,
      businessType: config,
      rcNumber: config,
      companyName: config,
    },
    onSubmit({ rcType, rcNumber, companyName }) {
      return validateRCNumber(rcType as string, rcNumber as string, companyName as string);
    },
  });

  const businessTypes = useAsync(async () => {
    const types = await getCompanyTypes();
    const _types = types.map((type) => ({ value: type, label: type }));

    return [
      // {
      //   value: undefined,
      //   label: 'Choose business type',
      // },
      ..._types,
    ];
  }, []);

  const checkInitiatorProgress = useCallback(async (values: any) => {
    console.log("values", values)
    try {
      const progressResponse = await getInitiatorProgress({ initiatorBvn: bvn as string, rcNumber: values.rcNumber as string });
      if (progressResponse) {
        const { currentStep, correlationId, initiatorReference, previousStep } = progressResponse;
        set({ correlationId, });
        updateCustomerHash(correlationId);
        const stepsToScreen = {
          "PROCESS_INITIATION": "BusinessDetails",
          "COMPANY_DETAILS_COMPLETION_STATISTIC": "PersonalDetails",
          "COMPANY_DETAILS_UPLOAD": "UploadDocs",
          "COMPANY_DETAILS_UPDATE": "PersonalDetails",
          "SIGNATORY_DETAILS_UPLOAD": "Docs",
          "SIGNATORY_DETAILS_UPDATE": "Docs",
          "DIRECTOR_DETAILS_UPLOAD": "Docs",
          "COMPANY_DOCUMENT_UPLOAD": "Docs",
          "SIGNATORY_DOCUMENT_UPLOAD": "Docs",
          "DIRECTOR_DOCUMENT_UPLOAD": "Docs",
          "DIRECTOR_DETAILS_UPDATE": "Docs",
          "INITIATOR_DETAILS_UPDATE": "Docs",
          "INITIATOR_DOCUMENT_UPLOAD": "Docs",
          "ACCOUNT_CREATION": "Docs",
        }
        // nav.navigate((stepsToScreen as any)[currentStep] || 'RCNumber');
        nav.navigate('PersonalDetails');
      } else {
        nav.navigate('RCNumber');
      }
    } catch (exception) {
      console.log(exception);
      nav.navigate('RCNumber');
    }

  }, [nav, data]);

  useEffect(() => {
    if (submitted) {
      set({
        currency: values.currency,
        businessType: values.businessType,
      });
      console.log("values before", values)
      // data && checkInitiatorProgress();
      checkInitiatorProgress(values);
    }
  }, [nav, submitted]);

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
        // onPress: () => nav.navigate('RCNumber'),
      }}>
      <View>
        <Spacer gap={20}>
          <View>
            <Spacer>
              <Caption>Business type</Caption>
              <View>
                <Spacer>
                  <FieldWrapper>
                    <Picker
                      selectedValue={values.businessType}
                      onValueChange={(val) => {
                        businessType.onChange(val as string);
                      }}>
                      <Picker.Item
                        value={undefined}
                        label="Choose business type"
                      />

                      {/* {_companyTypes.map((name) => { */}
                      {(businessTypes || []).map(({ label, value }) => {
                        // return <Picker.Item label={name} value={name} />;
                        return <Picker.Item label={label} value={value} />;
                      })}
                    </Picker>
                  </FieldWrapper>

                  {errors.has('businessType') && (
                    <ErrorLabel
                      message={errors.get('businessType') as string}
                    />
                  )}
                </Spacer>
              </View>
            </Spacer>
          </View>

          <View>
            <Spacer>
              <Caption>Choose currency</Caption>
              <View>
                <Spacer>
                  <RadioGroup
                    value={values.currency as string}
                    onChange={currency.onChange}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                      {CURRENCY.map((item) => {
                        return (
                          <RadioButton
                            {...item}
                            key={item.value}
                            style={styles.radio}
                          />
                        );
                      })}
                    </ScrollView>
                  </RadioGroup>
                  {errors.has('currency') && (
                    <ErrorLabel message={errors.get('currency') as string} />
                  )}
                </Spacer>
              </View>
            </Spacer>
          </View>
          <TextInput
                  label="Company name"
                  value={values.companyName}
                  error={errors.has('companyName')}
                  placeholder="Enter your company or business name"
                  errorMessage={errors.get('companyName')}
                  onChangeText={companyName.onChange}
                />

          <View>
            <Spacer>
              <Caption>RC Number</Caption>
              <View>
                <View>
                  <Spacer>
                    <RadioGroup
                      value={values.rcType as string}
                      onChange={rcType.onChange}>
                      <ScrollView contentContainerStyle={styles.scroll}>
                        {RCNumberTypes.map((item) => (
                          <RadioButton
                            key={item}
                            label={item}
                            value={item}
                            style={styles.radio}
                          />
                        ))}
                      </ScrollView>
                    </RadioGroup>
                    {errors.has('rcType') && (
                      <ErrorLabel message={errors.get('rcType') as string} />
                    )}
                  </Spacer>
                </View>

                <TextInput
                  placeholder="Enter RC Number"
                  error={errors.has('rcNumber')}
                  value={values.rcNumber}
                  onChangeText={rcNumber.onChange}
                  errorMessage={errors.get('rcNumber')}
                />
               
              </View>
            </Spacer>
          </View>
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    marginTop: 10,
    justifyContent: 'space-between',
  },
  scroll: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  radio: {
    margin: 5,
  },
});
