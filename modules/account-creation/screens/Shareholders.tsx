import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';
import {
  Colors,
  Divider,
  Headline,
  Subheading,
  Text,
  useTheme,
} from 'react-native-paper';
import {TextInput} from '../../../exports';
import HStack from '../../../shared/components/HStack';
import Spacer from '../../../shared/components/Spacer';
import StepCounter from '../../../shared/components/StepCounter';
import DefaultScreen from '../../../shared/components/DefaultScreen';

import {stageEntity} from '../services/api';

import {useForm} from '../../../form';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Button from '../../../shared/components/Button';
import { notify } from '../../../shared/utils/utils';

const config = {required: true};

type Form = {
  numberOfDirectors: number;
  nameOfDirector: string;
  phoneNumber: string;
  email: string;
  isSignatory: boolean;
};

export default function Shareholders() {
  const nav = useNavigation();
  const {colors} = useTheme();

  const {errors, data, error, values, submit, submitted, isSubmitting, handlers} = useForm<
    Form
  >({
    schema: {
      numberOfDirectors: {
        ...config,
        initialValue: 0,
      },
      nameOfDirector: config,
      phoneNumber: config,
      email: config,
      isSignatory: 'boolean',
    },
    onSubmit({email, phoneNumber, nameOfDirector, isSignatory}) {
      return stageEntity({
        email,
        lastName: nameOfDirector.split(' ')?.[1] || '',
        firstName: nameOfDirector.split(' ')?.[0] || '',
        phoneNumber,
        entityCategory: isSignatory? 'SIGNATORY' : 'DIRECTOR',
        callbackUrl: `http://parallex.com`,
      });
    },
  });

  useEffect(() => {
    if (submitted) {
      if (data) {
        if(data.responseCode == "00"){
          notify({message: data?.responseMessage})
        nav.navigate('OnboardingProgress');
        }
      } else {
        notify({title: "Error", message: (error as any)?.response?.data?.responseMessage})
        console.log('response error', (error as any)?.response?.data);
      }
    }
  }, [nav, submitted]);

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
          <Headline>Add shareholder</Headline>
          <Subheading style={{color: Colors.grey600}}>
            Please provide stakeholder details
          </Subheading>
        </Spacer>
      </View>
      <HStack padding={10} alignItems="center" justifyContent="space-between">
        <Spacer horizontal gap={20}>
          <Subheading style={{flex: 1}}>
            Please specify number of directors
          </Subheading>
          <StepCounter
            style={{flex: 1}}
            value={values.numberOfDirectors}
            onIncrement={handlers.numberOfDirectors.onChange}
            onDecrement={handlers.numberOfDirectors.onChange}
          />
        </Spacer>
      </HStack>
      <Divider />
      <View>
        <Spacer gap={20}>
          <TextInput
            label="Director's name"
            placeholder="Enter director's name"
            error={errors.has('nameOfDirector')}
            errorMessage={errors.get('nameOfDirector')}
            onChangeText={handlers.nameOfDirector.onChange}
          />

          <TextInput
            label="Phone number"
            placeholder="Enter phone number"
            error={errors.has('phoneNumber')}
            errorMessage={errors.get('phoneNumber')}
            onChangeText={handlers.phoneNumber.onChange}
          />

          <TextInput
            label="Email"
            placeholder="Enter email"
            error={errors.has('email')}
            errorMessage={errors.get('email')}
            onChangeText={handlers.email.onChange}
          />

          <HStack alignItems="center">
            <Spacer horizontal>
              <CheckBox
                value={values.isSignatory}
                tintColors={{true: colors.primary}}
                onValueChange={handlers.isSignatory.onChange}
              />
              <Text>Tick if a signatory</Text>
            </Spacer>
          </HStack>

          <HStack alignItems="center">
            <Spacer gap={30}>
              <Button style={{width:"100%"}} onPress={() => nav.navigate("OnboardingProgress")}>
                {"SKIP"}
              </Button>
            </Spacer>
          </HStack>
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
