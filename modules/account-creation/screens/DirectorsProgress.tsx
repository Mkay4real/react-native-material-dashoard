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
import Button from '../../../shared/components/Button';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import Progess from '../components/Progess';
import useAsync from '../../../shared/hooks/useAsync';
import { getCompanyProfilingProgress } from '../services/api';

export default function DirectorsProgress() {
  const {colors} = useTheme();
  const nav = useNavigation();

  const profilingProgress = useAsync(async () => {
    const progress = await getCompanyProfilingProgress();

    return progress;
  }, []);

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        label: 'Proceed to Dashboard',
        onPress: () => nav.navigate('AccountNumber'),
      }}>
      <View>
        <Spacer>
          <Headline>Directors progress</Headline>
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
                  <Progess subtitle="completed" title="Personal information" />
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
                  {
                    profilingProgress && 
                    profilingProgress.incompleteDirDetails.map(({firstName,lastName,email, ...dirDetails})=>{
                      return <Progess title={`${firstName} ${lastName}`}  subtitle={email} />
                    })
                  }
                  {
                    profilingProgress && 
                    profilingProgress.incompleteSigDetails.map(({firstName,lastName,email, ...sigDetails})=>{
                      return <Progess title={`${firstName} ${lastName} (signatory)`}  subtitle={email} />
                    })
                  }
                  
                </Spacer>
              </View>
            </Spacer>
          </View>
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
