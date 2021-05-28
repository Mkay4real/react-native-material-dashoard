import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Avatar, Button, Headline, ProgressBar} from 'react-native-paper';
import User from '../../../assets/user.svg';
import {VStack} from '../../../exports';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import DocUpload from '../components/DocUpload';

import {useRequest} from 'async-data-hooks';

import {getDocTypes, documentUpload} from '../services/api';
import { now, randomString } from '../../../shared/utils/utils';
import accountCreationStore from '../../../shared/stores/accountCreation';

export default function Docs() {
  const nav = useNavigation();
  const [image, setImage] = useState<string>();

  const {params = {}} = useRoute();

  // const {correlationId} = params as any;
  const { set, bvn, correlationId } = accountCreationStore(
    ({ bvn, correlationId, setDetails, currency, businessType, businessName }) => {
      return {
        bvn,
        correlationId,
        businessName,
        set: setDetails,
      };
    },
  );

  const {data, matcher, load} = useRequest({
    requestFn: getDocTypes,
  });

  console.log('docTypes', data);

  const startCamera = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        // path: 'images',
      },
      quality: 0.2
    };
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setImage(source);

        //attempt to upload the selfie
        const data = new FormData();
        const file= {
          uri: response.uri,
          name: response.fileName,
          type: response.type 
        }
        console.log("file", file);

        data.append('file', file);
        data.append('documentType', "PHOTO");
        data.append('requestReferenceId', randomString(30));
        data.append('entityCategory', "PROCESS_INITIATOR");
        data.append('entityId', 0);
        data.append('correlationId', correlationId);

        documentUpload(data);
      }
    });
  };

  useEffect(load, []);

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        label: 'Next',
        onPress: () => nav.navigate('Shareholders'),
      }}>
      <View>
        <Spacer>
          <Headline>Upload docs</Headline>
          <ProgressBar progress={0.3} />
        </Spacer>
      </View>
      <View>
        <Spacer gap={25}>
          <VStack alignItems="center">
            <Spacer gap={20}>
              {image ? (
                <Avatar.Image size={100} source={{uri: image}} />
              ) : (
                <Avatar.Icon size={100} icon={(props) => <User {...props} />} />
              )}
              <Button mode="outlined" onPress={startCamera}>
                take selfie
              </Button>
            </Spacer>
          </VStack>
          {/* <DocUpload label="Upload doc 1" />
          <DocUpload label="Upload doc 2" />
          <DocUpload label="Upload doc 3" /> */}

          <View>
            {matcher.requesting && (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="small" />
              </View>
            )}

            <Spacer gap={25}>
              {data &&
                data.map(({name, code, mandatory}) => {
                  return (
                    <DocUpload
                      label={name}
                      docType={code}
                      required={mandatory}
                      correlationId={correlationId}
                      onUpload={() => { console.log("Document uploaded")}}
                    />
                  );
                })}
            </Spacer>
          </View>
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
