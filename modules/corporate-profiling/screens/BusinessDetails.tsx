import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Headline, ProgressBar} from 'react-native-paper';
import {TextInput} from '../../../exports';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';

import {useForm} from '../../../form';
import corporateProfilingStore from '../../../shared/stores/corporateProfiling';

const config = {required: true};
const prefil = (val: string)=>({ ...config, initialValue: val });

export default function BusinessDetails() {
  const nav = useNavigation();
  const set = corporateProfilingStore(({setDetails}) => setDetails);

  const {errors, values, submit, submitted, isSubmitting, handlers} = useForm({
    schema: {
      name: prefil('Bread and Sons Limited'),
      type: prefil("Limited Liability Company"),
      address: prefil("10, Kola Ogungbe street, Lekki"),
      nature: prefil("Bakery"),
      sector: prefil("Food"),
      annualTurnover: prefil("10000000"),
    },
    onSubmit({name,type,address,nature,sector,annualTurnover}) {
      set({businessDetails:{name,type,address,nature,sector,turnover:annualTurnover}})
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
            value={values.name}
            error={errors.has('name')}
            errorMessage={errors.get('name')}
            placeholder="Enter business name"
            onChangeText={handlers.name.onChange}
          />

          <TextInput
            label="Type"
            value={values.type}
            error={errors.has('type')}
            errorMessage={errors.get('type')}
            placeholder="Enter business type"
            onChangeText={handlers.type.onChange}
          />

          <TextInput
            label="Address"
            value={values.address}
            error={errors.has('address')}
            errorMessage={errors.get('address')}
            placeholder="Enter business address"
            onChangeText={handlers.address.onChange}
          />

          <TextInput
            label="Nature of business"
            value={values.nature}
            error={errors.has('nature')}
            errorMessage={errors.get('nature')}
            placeholder="Enter business nature"
            onChangeText={handlers.nature.onChange}
          />

          <TextInput
            label="Sector"
            value={values.sector}
            error={errors.has('sector')}
            errorMessage={errors.get('sector')}
            placeholder="Enter business sector"
            onChangeText={handlers.sector.onChange}
          />

          <TextInput
            label="Annual turnover"
            value={values.annualTurnover}
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
