import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Colors, Headline, ProgressBar, Subheading} from 'react-native-paper';
import {TextInput} from '../../../exports';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';

import {useForm} from '../../../form';
import corporateProfilingStore from '../../../shared/stores/corporateProfiling';

export default function PersonalDetails() {
  const nav = useNavigation();

  const set = corporateProfilingStore(({setDetails}) => setDetails);

  const {errors, values, submit, submitted, isSubmitting, onChange} = useForm({
    schema: {
      corporateId: {
        required: true,
        validate(val) {
          if (!val) { 
            return 'You must select a corporate account code to proceed';
          }
          else if (String(val).length<3) { 
            return 'Invalid account code length (Cannot be less than 3 digits)';
          }
        },
      },
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  useEffect(() => {
    if (submitted) {
      set({corporateAccountDetails: {id:values.corporateId as string}});
      nav.navigate('AdminDetails');
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
          <Headline>Corporate account details</Headline>
          <ProgressBar progress={0.3} />
        </Spacer>
      </View>
      <View>
        <Spacer gap={30}>
          <Subheading style={{color: Colors.grey600}}>
            Let us create your unique corporate ID
          </Subheading>
          <TextInput
            label="Corporate ID"
            placeholder="Enter corporate ID"
            maxLength={10}
            error={errors.has('corporateId')}
            errorMessage={errors.get('corporateId')}
            onChangeText={onChange.bind(null, 'corporateId')}
          />
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
