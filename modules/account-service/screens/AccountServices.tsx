import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, RadioButton, useTheme } from 'react-native-paper';
import { Button } from '../../../exports';

const data = [
  {
    label: 'Issue Check book request',
    value: 'service-request/checkbook',
    route: 'CheckbookRequest',
  },
  {
    label: 'Stop Check request',
    value: 'service-request/stop-checkbook',
    route: 'StopChequeRequest',
  },
  {
    label: 'Issue Demand draft request',
    value: 'service-request/issue-demand-draft',
    route: 'DemandDraftRequest',
  },
  {
    label: 'Standing Order',
    value: 'service-request/standing-order',
    route: 'StandingOrderRequest',
  },
  {
    label: 'Account Statement Request',
    value: 'service-request/account-statement',
    route: 'AccountStatementRequest',
  },
  // {
  //   label: 'Internet Banking PIN change request',
  //   value: 'service-request/change-internet-pin',
  //   route: 'CheckbookRequest',
  // },
  // {
  //   label: 'Mobile Banking PIN change request',
  //   value: 'service-request/change-mobile-pin',
  //   route: 'CheckbookRequest',
  // },

];
export default function AccountServices() {
  const {
    colors: { primary },
  } = useTheme();

  const nav = useNavigation();

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleNext = ()=>{
    if(selectedValue!==""){
      let selected = data.find((item,i)=> item.value==selectedValue);
      nav.navigate(selected?.route || 'CheckbookRequest')
    }else{
      nav.navigate('CheckbookRequest')
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.radios}>
        <RadioButton.Group value={selectedValue} onValueChange={(val) => {  setSelectedValue(val)}}>
          {data.map(({label, value, route}, i) => (
            <>
              <RadioButton.Item
                value={value}
                color={primary}
                label={label}
                labelStyle={styles.service}
              />
              <Divider />
            </>

          ))}
          <Divider />
         
        </RadioButton.Group>
      </View>
      <Button
        style={styles.btn}
        onPress={() => handleNext()}>
        Make Request
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  radios: {
    marginTop: 30,
  },
  service: {
    padding: 20,
  },
  btn: {
    margin: 30,
  },
});
