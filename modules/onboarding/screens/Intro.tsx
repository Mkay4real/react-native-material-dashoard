import ViewPager from '@react-native-community/viewpager';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Colors, Headline, Text} from 'react-native-paper';
import Screen from '../../../shared/components/Screen';
import Spacer from '../../../shared/components/Spacer';
import IntroHeader from '../components/IntroHeader';
import Dots from '../../../shared/components/Dots';

export default function Intro() {
  const nav = useNavigation();
  const [currentStep, setStep] = useState(0);

  return (
    <Screen style={style.screen}>
      <IntroHeader
        accessoryRight={
          <Button mode="text" onPress={() => nav.navigate('MainIntro')}>
            SKIP
          </Button>
        }
      />
      <View style={style.wrapper}>
        <Spacer>
          <ViewPager
            initialPage={0}
            style={style.pager}
            onPageSelected={({nativeEvent}) => {
              setStep(nativeEvent.position);
            }}>
            <View style={style.page}>
              <Headline>Manage your corporate finances</Headline>
              <Text style={style.content}>
                Our Corporate Internet Banking service, Guarantees a secured and
                comprehensive financial suite that is vital to the success of
                your business.
              </Text>
            </View>
            <View style={style.page}>
              <Headline>Manage your corporate finances</Headline>
              <Text style={style.content}>
                This solution aims to greatly reduce manual processes while
                improving your business efficiency and productivity.
              </Text>
            </View>
          </ViewPager>
          <View style={style.dots}>
            <Dots count={2} step={currentStep} />
          </View>
        </Spacer>
      </View>
    </Screen>
  );
}

const style = StyleSheet.create({
  screen: {
    padding: 0,
  },
  wrapper: {
    flex: 1,
  },
  pager: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    marginBottom: 20,
    borderColor: 'red',
  },
  dots: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  page: {
    padding: 20,
  },
  content: {
    lineHeight: 20,
    color: Colors.grey600,
  },
  hero: {
    height: '70%',
  },
});
