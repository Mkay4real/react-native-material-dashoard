import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Button, VStack} from '../../../../exports';

export default function Details() {
  const {params} = useRoute();
  const id = (params as any)?.id;

  return (
    <VStack>
      <Button>Save changes</Button>
    </VStack>
  );
}
