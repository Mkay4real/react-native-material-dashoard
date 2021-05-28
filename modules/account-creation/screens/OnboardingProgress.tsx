import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  Divider,
  Headline,
  ProgressBar,
  Subheading,
  useTheme,
} from 'react-native-paper';
import Check from '../../../assets/success.svg';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import Progess from '../components/Progess';

const icon = {
  width: 36,
  height: 36,
  color: '#00875A',
};

export default function OnboardingProgress() {
  const {colors} = useTheme();
  const nav = useNavigation();

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        label: 'Next',
        onPress: () => nav.navigate('DirectorsProgress'),
      }}>
      <View>
        <Spacer>
          <Headline>Onboarding progress</Headline>
          <ProgressBar progress={0.7} />
        </Spacer>
      </View>
      <View>
        <Spacer gap={30}>
          <View>
            <Spacer>
              <Subheading style={{color: colors.primary}}>Completed</Subheading>
              <View>
                <Spacer gap={16}>
                  <Progess
                    subtitle="completed"
                    title="Personal information"
                    trailing={<Check {...icon} />}
                  />
                  <Progess
                    subtitle="completed"
                    title="Personal information"
                    trailing={<Check {...icon} />}
                  />
                  <Progess
                    subtitle="completed"
                    title="Personal information"
                    trailing={<Check {...icon} />}
                  />
                </Spacer>
              </View>
            </Spacer>
          </View>
          <Divider />
          <View>
            <Spacer>
              <Subheading>Pending</Subheading>
              <View>
                <Spacer gap={16}>
                  <Progess title="Personal information" subtitle="completed" />
                  <Progess title="Personal information" subtitle="completed" />
                  <Progess title="Personal information" subtitle="completed" />
                </Spacer>
              </View>
            </Spacer>
          </View>
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
