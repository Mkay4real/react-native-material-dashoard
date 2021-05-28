import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  Caption,
  Colors,
  Divider,
  Headline,
  IconButton,
  Subheading,
  Text,
  useTheme,
} from 'react-native-paper';
import {Spacer, HStack, TextInput} from '../../exports';

import {useForm} from '../../form';
import ScrollableDefaultScreen from '../../shared/components/ScrollableDefaultScreen';
import StepCounter from '../../shared/components/StepCounter';
import {Attributes, attributes, roles} from '../../shared/utils/dummy_data';
import FieldWrapper from '../../shared/components/FieldWrapper';

import AlertCircle from '../../assets/alert-circle.svg';

type Form = {
  numberOfStaffs: number;
  staffName: string;
  username: string;
  email: string;
  role: string;
  attributes: Set<Attributes>;
};

const config = {required: true};

export default function Shareholders() {
  const nav = useNavigation();
  const {colors} = useTheme();

  const {errors, values, submit, submitted, isSubmitting, handlers} = useForm<
    Form
  >({
    schema: {
      numberOfStaffs: {
        ...config,
        initialValue: 0,
      },
      staffName: config,
      username: config,
      email: config,
      role: config,
      attributes: {
        ...config,
        initialValue: new Set(),
      },
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  //   useEffect(() => {
  //     if (submitted) {
  //       nav.navigate('OnboardingProgress');
  //     }
  //   }, [nav, submitted]);

  return (
    <ScrollableDefaultScreen
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
      }}>
      <View>
        <Spacer>
          <Headline>Add staffs</Headline>
          <Subheading style={{color: Colors.grey600}}>
            Please provide staff details
          </Subheading>
        </Spacer>
      </View>
      <HStack padding={10} alignItems="center" justifyContent="space-between">
        <Spacer horizontal gap={20}>
          <Subheading style={{flex: 1}}>
            Please specify number of users
          </Subheading>
          <StepCounter
            style={{flex: 1}}
            value={values.numberOfStaffs}
            onIncrement={handlers.numberOfStaffs.onChange}
            onDecrement={handlers.numberOfStaffs.onChange}
          />
        </Spacer>
      </HStack>
      <Divider />
      <View>
        <Spacer gap={20}>
          <TextInput
            label="Fullname"
            error={errors.has('staffName')}
            placeholder="Enter staff's full name"
            errorMessage={errors.get('staffName')}
            onChangeText={handlers.staffName.onChange}
          />

          <TextInput
            label="Preferred username"
            error={errors.has('username')}
            placeholder="Enter staff's username"
            errorMessage={errors.get('username')}
            onChangeText={handlers.username.onChange}
          />

          <TextInput
            label="Email"
            placeholder="Enter email"
            error={errors.has('email')}
            errorMessage={errors.get('email')}
            onChangeText={handlers.email.onChange}
          />

          <View>
            <Spacer>
              <HStack alignItems="center" justifyContent="space-between">
                <Caption>Choose user role</Caption>
                <IconButton
                  size={20}
                  icon={({color, size}) => (
                    <AlertCircle color={color} width={size} height={size} />
                  )}
                />
              </HStack>

              <FieldWrapper>
                <Picker
                  selectedValue={values.role}
                  onValueChange={(val) => {
                    handlers.role.onChange(val as string);
                  }}>
                  {attributes.map((attr) => {
                    return <Picker.Item {...attr} />;
                  })}
                </Picker>
              </FieldWrapper>
            </Spacer>
          </View>

          <View>
            <Spacer gap={7}>
              <Caption>Choose user attributes</Caption>
              <View>
                {attributes.map(({label, value}) => {
                  const onValueChange = () => {
                    let a = new Set(values.attributes);

                    if (a.has(value)) {
                      a.delete(value);
                    } else {
                      a.add(value);
                    }

                    handlers.attributes.onChange(a);
                  };

                  return (
                    <HStack alignItems="center">
                      <Spacer horizontal>
                        <CheckBox
                          onValueChange={onValueChange}
                          tintColors={{true: colors.primary}}
                          value={values.attributes?.has(value)}
                        />
                        <Text>{label}</Text>
                      </Spacer>
                    </HStack>
                  );
                })}
              </View>
            </Spacer>
          </View>
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
