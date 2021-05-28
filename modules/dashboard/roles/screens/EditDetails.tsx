import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Caption} from 'react-native-paper';
import {Button, HStack, TextInput, VStack} from '../../../../exports';

import {useForm} from '../../../../form';
import CheckBox from '../../../../shared/components/CheckBox';
import Spacer from '../../../../shared/components/Spacer';
import {
  Attributes,
  Roles,
  roles as _roles,
  attributes as _attributes,
} from '../../../../shared/utils/dummy_data';

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Set<Roles>;
  attributes: Set<Attributes>;
};

const config = {required: true};

export default function EditDetails() {
  const {params} = useRoute();
  const id = (params as any)?.id;

  const {submit, values, errors, handlers} = useForm<Form>({
    schema: {
      firstName: config,
      lastName: config,
      email: config,
      username: config,
      roles: {},
      attributes: {},
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  const roles = values.roles ?? new Set();
  const attributes = values.attributes ?? new Set();

  return (
    <VStack justifyContent="space-between">
      <ScrollView contentContainerStyle={{padding: 10}}>
        <TextInput
          label="First name"
          value={values.firstName}
          error={errors.has('firstName')}
          errorMessage={errors.get('firstName')}
          onChangeText={handlers.firstName.onChange}
        />

        <TextInput
          label="Last name"
          value={values.lastName}
          error={errors.has('lastName')}
          errorMessage={errors.get('lastName')}
          onChangeText={handlers.lastName.onChange}
        />

        <TextInput
          label="Email"
          value={values.email}
          error={errors.has('email')}
          errorMessage={errors.get('email')}
          onChangeText={handlers.email.onChange}
        />

        <TextInput
          label="Username"
          value={values.username}
          error={errors.has('username')}
          errorMessage={errors.get('username')}
          onChangeText={handlers.username.onChange}
        />

        <View>
          <Spacer gap={7}>
            <Caption>Roles</Caption>
            <View>
              <Spacer horizontal>
                <HStack>
                  {_roles.map(({label, value}) => {
                    return (
                      <CheckBox
                        label={label}
                        checked={roles.has(value)}
                        onPress={() => {
                          const _r = new Set(roles);

                          if (roles.has(value)) {
                            _r.delete(value);
                          } else {
                            _r.add(value);
                          }

                          handlers.roles.onChange(_r);
                        }}
                      />
                    );
                  })}
                </HStack>
              </Spacer>
            </View>
          </Spacer>
        </View>

        <View>
          <Spacer gap={7}>
            <Caption>User Attributes</Caption>
            <View>
              <Spacer>
                <HStack>
                  {_attributes.map(({label, value}) => {
                    return (
                      <CheckBox
                        label={label}
                        checked={attributes.has(value)}
                        onPress={() => {
                          const _a = new Set(attributes);

                          if (attributes.has(value)) {
                            _a.delete(value);
                          } else {
                            _a.add(value);
                          }

                          handlers.attributes.onChange(_a);
                        }}
                      />
                    );
                  })}
                </HStack>
              </Spacer>
            </View>
          </Spacer>
        </View>
      </ScrollView>
      <Button style={{margin: 10}} onPress={submit}>
        Save changes
      </Button>
    </VStack>
  );
}
