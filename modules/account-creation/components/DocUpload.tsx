import React, {useCallback, useState} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewProps} from 'react-native';
import {Avatar, Colors, Paragraph, Text} from 'react-native-paper';
import Upload from '../../../assets/upload-cloud.svg';
import HStack from '../../../shared/components/HStack';
import Spacer from '../../../shared/components/Spacer';

import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {documentUpload} from '../services/api';
import {now, randomString} from '../../../shared/utils/utils';
import Toast from 'react-native-simple-toast';

type DocUpload = {
  label: string;
  docType: string;
  required?: boolean;
  entityType?: string;
  correlationId?: string;
  style?: StyleProp<ViewProps>;
  onUpload(uri: string): void;
};

export default function DocUpload({
  label,
  style,
  docType,
  required,
  entityType,
  correlationId,
  onUpload,
}: DocUpload) {
  const [state, setState] = useState({
    progress: 0,
    error: null,
  });

  const pickDoc = useCallback(async () => {
    const document = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });

    const MAX_SIZE = 1 * 1000 * 1000; //1mb
    if(document?.size>MAX_SIZE){
      console.log("Document size too heavy", document.size);
      Toast.show("Document size too heavy: "+ document.size);
      return;
      
    }

    //attempt to upload the doc
    const data = new FormData();
    const file= {
      uri: document.uri,
      name: document.name,
      type: document.type 
    }
    console.log("file", file);

    data.append('file', file);
    data.append('documentType', docType);
    data.append('requestReferenceId', randomString(30));
    data.append('entityCategory', "PROCESS_INITIATOR");
    data.append('entityId', 0);
    data.append('correlationId', correlationId);

    const res = await documentUpload(data);
    if(res){
      onUpload(res);
      Toast.show(docType+ " upload: "+ res?.responseMessage,Toast.SHORT);
    }

  }, []);

  return (
    <TouchableOpacity onPress={pickDoc} style={[styles.container, style]}>
      <HStack alignItems="center">
        <Spacer horizontal gap={20}>
          <Avatar.Icon color="white" icon={(props) => <Upload {...props} />} />
          <Paragraph style={styles.label}>{label}</Paragraph>
        </Spacer>
      </HStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderColor: '#CCCCD8',
  },
  label: {
    flex: 1,
  },
});
