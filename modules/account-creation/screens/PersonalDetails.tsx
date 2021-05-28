import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Headline, ProgressBar, Caption } from 'react-native-paper';
import { TextInput } from '../../../exports';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import { useForm } from '../../../form';

import { useRequest } from 'async-data-hooks';
import { getInitiator, updateInitiator, Initiator } from '../services/api';
import accountCreationStore from '../../../shared/stores/accountCreation';
import FieldWrapper from '../../../shared/components/FieldWrapper';
import { Picker } from '@react-native-picker/picker';
import ErrorLabel from '../../../shared/components/ErrorLabel';
import HStack from '../../../shared/components/HStack';
import Button from '../../../shared/components/Button';

const config = { required: true };
const maritalStatuses = ["SINGLE", "MARRIED", "WIDOWED"]

export default function PersonalDetails() {
  const nav = useNavigation();

  const [response, setResponse] = useState<Initiator | undefined>({} as Initiator);

  const bvn = accountCreationStore(({ bvn }) => bvn) as string;

  const { data: _data, load } = useRequest({
    name: 'get initiator details',
    requestFn: () => getInitiator({ bvn }),
  });

  useEffect(() => {
    getInitiator({ bvn }).then(val => {
      console.log("VAL", val);
      setResponse((val as any)?.details as Initiator)

    })

  }, []);

  useEffect(() => {
    setTimeout(() => {
      //  handlers.address.onChange()
      console.log("initiator info res effect", response);

      handlers.firstName.onChange(response?.firstName as string);
      handlers.lastName.onChange(response?.lastName as string);
      handlers.email.onChange(response?.email as string);
      handlers.phoneNumber.onChange(response?.phoneNumber as string);
      handlers.address.onChange(response?.residentialAddress as string);
      handlers.stateOfOrigin.onChange(response?.stateOfOrigin as string);
      handlers.nationality.onChange(response?.nationality as string);
      handlers.dateOfBirth.onChange(response?.dateOfBirth as string);

      handlers.maritalStatus.onChange(response?.maritalStatus as string);
      handlers.nextOfKin.onChange(response?.nextOfKin as string);
      handlers.nokRelationship.onChange(response?.nokRelationship as string);
      handlers.residentialAddress.onChange(response?.residentialAddress as string);
      handlers.spouseName.onChange(response?.spouseName as string);
      handlers.spouseOccupation.onChange(response?.spouseOccupation as string);
    }, 3000);

  }, [response]);



  const { values, data, errors, submit, submitted, isSubmitting,
    handlers,
  } = useForm({
    schema: {
      firstName: {
        ...config,
        initialValue: response?.firstName,
      },
      lastName: {
        ...config,
        initialValue: response?.lastName,
      },
      email: {
        ...config,
        initialValue: response?.email,
      },
      phoneNumber: {
        ...config,
        initialValue: response?.phoneNumber,
      },
      address: {
        ...config,
        initialValue: response?.residentialAddress,
      },
      dateOfBirth: {
        ...config,
        initialValue: response?.dateOfBirth,
      },
      stateOfOrigin: {
        ...config,
        initialValue: response?.stateOfOrigin,
      },
      nationality: {
        ...config,
        initialValue: response?.nationality,
      },
      maritalStatus: {
        ...config,
        initialValue: '',
      },
      nextOfKin: {
        ...config,
        initialValue: response?.nextOfKin,
      },
      nokRelationship: {
        ...config,
        initialValue: response?.nokRelationship,
      },
      residentialAddress: {
        ...config,
        initialValue: response?.residentialAddress,
      },
      spouseName: {
        initialValue: response?.spouseName,
      },
      spouseOccupation: {
        initialValue: response?.spouseOccupation,
      },
    },
    onSubmit({ maritalStatus, nextOfKin, nokRelationship, residentialAddress, spouseName, spouseOccupation }) {
      return updateInitiator({
        bvn,
        maritalStatus,
        nextOfKin,
        nokRelationship,
        residentialAddress,
        spouseName,
        spouseOccupation
      } as any)
    },
  });

  useFocusEffect(useCallback(
    () => {
      // load();
      // setResponse(data);
      // handlers.firstName.onChange(data?.firstName as string);
    }, []));

  useEffect(() => {
    if (submitted) {
      if (data) {
        console.log("Update was successful", data)
        nav.navigate('UploadDocs');
      }
    }
  }, [nav, submitted]);

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        label: 'Next',
        onPress: submit,
        // onPress:()=>  nav.navigate('UploadDocs'),
        loading: isSubmitting,
      }}>
      <View>
        <Spacer>
          <Headline>Personal details</Headline>
          <ProgressBar progress={0.3} />
        </Spacer>
      </View>
      <View>
        <Spacer gap={20}>
          <TextInput
            label="First name"
            value={values.firstName}
            disabled={true}
            placeholder="Enter first name"
            error={errors.has('firstName')}
            errorMessage={errors.get('firstName')}
            onChangeText={handlers.firstName.onChange}
          />

          <TextInput
            label="Last name"
            disabled={true}
            value={values.lastName}
            placeholder="Enter last name"
            error={errors.has('lastName')}
            errorMessage={errors.get('lastName')}
            onChangeText={handlers.lastName.onChange}
          />

          <TextInput
            label="Email"
            value={values.email}
            placeholder="Enter email"
            error={errors.has('email')}
            errorMessage={errors.get('email')}
            onChangeText={handlers.email.onChange}
          />

          <TextInput
            label="Phone number"
            value={values.phoneNumber}
            placeholder="Enter phone number"
            error={errors.has('phoneNumber')}
            errorMessage={errors.get('phoneNumber')}
            onChangeText={handlers.phoneNumber.onChange}
          />

          <TextInput
            label="Address"
            value={values.address}
            placeholder="Enter address"
            error={errors.has('address')}
            errorMessage={errors.get('address')}
            onChangeText={handlers.address.onChange}
          />

          <TextInput
            label="Date of Birth"
            placeholder="Enter DOB"
            value={values.dateOfBirth}
            error={errors.has('dateOfBirth')}
            errorMessage={errors.get('dateOfBirth')}
            onChangeText={handlers.dateOfBirth.onChange}
          />

          <TextInput
            label="State of origin"
            value={values.stateOfOrigin}
            placeholder="Enter state of origin"
            error={errors.has('stateOfOrigin')}
            errorMessage={errors.get('stateOfOrigin')}
            onChangeText={handlers.stateOfOrigin.onChange}
          />

          <TextInput
            label="Nationality"
            value={values.nationality}
            placeholder="Enter nationality"
            error={errors.has('nationality')}
            errorMessage={errors.get('nationality')}
            onChangeText={handlers.nationality.onChange}
          />
          <View>
            <Spacer>
              <Caption>Marital Status</Caption>
              <View>
                <Spacer>
                  <FieldWrapper>
                    <Picker
                      selectedValue={values.maritalStatus}
                      onValueChange={(val) => {
                        handlers.maritalStatus.onChange(val as string);
                      }}>
                      <Picker.Item
                        value={undefined}
                        label="Select Marital Status"
                      />

                      {maritalStatuses.map((name) => {
                        // {(_businessTypes || []).map(({label,value}) => {
                        return <Picker.Item label={name} value={name} />;
                        // return <Picker.Item label={label} value={value} />;
                      })}
                    </Picker>
                  </FieldWrapper>

                  {errors.has('maritalStatus') && (
                    <ErrorLabel
                      message={errors.get('maritalStatus') as string}
                    />
                  )}
                </Spacer>
              </View>
            </Spacer>
          </View>

          <TextInput
            label="Next of Kin"
            value={values.nextOfKin}
            placeholder="Enter NOK"
            error={errors.has('nextOfKin')}
            errorMessage={errors.get('nextOfKin')}
            onChangeText={handlers.nextOfKin.onChange}
          />

          <TextInput
            label="Next of Kin Relationship"
            value={values.nokRelationship}
            placeholder="Enter NOK relationship"
            error={errors.has('nokRelationship')}
            errorMessage={errors.get('nokRelationship')}
            onChangeText={handlers.nokRelationship.onChange}
          />

          <TextInput
            label="Residential Address"
            value={values.residentialAddress}
            placeholder="Enter Residential Address"
            error={errors.has('residentialAddress')}
            errorMessage={errors.get('residentialAddress')}
            onChangeText={handlers.residentialAddress.onChange}
          />
          <TextInput
            label="Spouse Name"
            value={values.spouseName}
            placeholder="Enter spouse name if married"
            error={errors.has('spouseName')}
            errorMessage={errors.get('spouseName')}
            onChangeText={handlers.spouseName.onChange}
          />
          <TextInput
            label="Spouse Occupation"
            value={values.spouseOccupation}
            placeholder="Enter spouse occupation if any"
            error={errors.has('spouseOccupation')}
            errorMessage={errors.get('spouseOccupation')}
            onChangeText={handlers.spouseOccupation.onChange}
          />

          <HStack alignItems="center">
            <Spacer gap={30}>
              <Button style={{ width: "100%" }} onPress={() => nav.navigate("UploadDocs")}>
                {"SKIP"}
              </Button>
            </Spacer>
          </HStack>
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
