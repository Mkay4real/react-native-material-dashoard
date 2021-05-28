import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Headline, ProgressBar} from 'react-native-paper';
import {TextInput} from '../../../exports';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';

import {useForm} from '../../../form';

const config = {required: true};

export default function BusinessDetails() {
  const nav = useNavigation();

  const {errors, submit, submitted, isSubmitting, handlers} = useForm({
    schema: {
      name: config,
      type: config,
      address: config,
      nature: config,
      sector: config,
      annualTurnover: config,
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  useEffect(() => {
    if (submitted) {
      nav.navigate('AccountDetails');
    }
  }, [nav, submitted]);

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        onPress: submit,
        loading: isSubmitting,
        label: 'Proceed to Corporate Profiling',
      }}>
      <View>
        <Spacer>
          <Headline>Here are your business details</Headline>
          <ProgressBar progress={0.7} />
        </Spacer>
      </View>
      <View>
        <Spacer gap={20}>
          <TextInput
            label="Business name"
            error={errors.has('name')}
            errorMessage={errors.get('name')}
            placeholder="Enter business name"
            onChangeText={handlers.name.onChange}
          />

          <TextInput
            label="Type"
            error={errors.has('type')}
            errorMessage={errors.get('type')}
            placeholder="Enter business type"
            onChangeText={handlers.type.onChange}
          />

          <TextInput
            label="Address"
            error={errors.has('address')}
            errorMessage={errors.get('address')}
            placeholder="Enter business address"
            onChangeText={handlers.address.onChange}
          />

          <TextInput
            label="Nature of business"
            error={errors.has('nature')}
            errorMessage={errors.get('nature')}
            placeholder="Enter business nature"
            onChangeText={handlers.nature.onChange}
          />

          <TextInput
            label="Sector"
            error={errors.has('sector')}
            errorMessage={errors.get('sector')}
            placeholder="Enter business sector"
            onChangeText={handlers.sector.onChange}
          />

          <TextInput
            label="Annual turnover"
            placeholder="Enter annual turnover"
            error={errors.has('annualTurnover')}
            errorMessage={errors.get('annualTurnover')}
            onChangeText={handlers.annualTurnover.onChange}
          />
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
