import React from "react";
import Screen from "../components/Screen";
import { VStack, Spacer } from "../../../exports";
import { View, Image, StyleSheet } from "react-native";
import { Headline, Subheading, Colors, TextInput, TouchableRipple } from "react-native-paper";
import Button from "../../../shared/components/Button";
import NavigationService from "../../../shared/utils/NavigationService";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignIn(params: any) {

    const primary ="#FA4A84";
    return (
        <Screen style={{
            backgroundColor: "#1b003b",
        }}>
            <VStack flex={2} margin={10} justifyContent="space-evenly">
                <View>
                    <Headline style={styles.welcome}>Welcome back {'\n'}Shiwani</Headline>
                    <Subheading style={styles.subTitle}>{"Don't have an account with us? "}  <Subheading style={[styles.subTitle, { color: primary }]}>Sign up</Subheading></Subheading>
                </View>
                <View style={{ flex: 1 }}>
                    <Spacer gap={20}>
                        <TextInput
                            label="Email address"
                            underlineColor={primary}
                            mode="flat"
                            placeholder="Enter Email address"
                            placeholderTextColor={Colors.red100}
                            style={{backgroundColor:"transparent"}}
                            theme= {{ colors: {text: Colors.white, placeholder: Colors.white, primary: primary}}}
                            // placeholderTextColor="Enter Email address"
                            returnKeyType="next"
                        //   value={values.username}
                        //   error={errors.has('username')}

                        // onSubmitEditing={focusPassword}
                        //   errorMessage={errors.get('username')}
                        //   onChangeText={handlers.username.onChange}
                        />
                        <TextInput
                            label="Password"
                            underlineColor={primary}
                            placeholder="Enter Password"
                            returnKeyType="next"
                            secureTextEntry={true}
                            right={"show"}
                            style={{backgroundColor:"transparent",}}
                            theme= {{ colors: {text: Colors.white, placeholder: Colors.white, primary: primary}}}
                            
                        //   value={values.username}
                        //   error={errors.has('username')}

                        // onSubmitEditing={focusPassword}
                        //   errorMessage={errors.get('username')}
                        //   onChangeText={handlers.username.onChange}
                        />
                        <Button
                            style={{ backgroundColor: primary, }} labelStyle={{fontFamily: 'BRFirma-SemiBold', fontSize: (16)}}
                            onPress={() => { NavigationService.navigate("Dashboard") }}
                        >
                            Sign in
                        </Button>
                        <Subheading style={[styles.forgot, { color: primary, }]}>
                            Forgot your password ?
                        </Subheading>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={{ marginStart: 0, alignSelf:'center' }}
                            >
                            <Image width={24} height={24} source={require("../assets/biometrics.png")} />
                        </TouchableOpacity>
                    </Spacer>
                </View>
            </VStack>
        </Screen>
    )
}


const styles = StyleSheet.create({
    welcome: {
      color: 'white',
      fontSize: (32),
    //   fontWeight: 'bold',
      fontFamily: 'BRFirma-SemiBold',
      marginTop: (50),
    },
    subTitle: {
      color: '#fff',
      fontSize: (14),
      fontFamily: 'BRFirma-Regular',
    },
    forgot: {
      color: '#fff',
      fontSize: (14),
      fontFamily: 'BRFirma-SemiBold',
      textAlign:'center',
       paddingTop: (20), 
       paddingBottom: (67),
    },
    screen: {
      padding: 0,
      backgroundColor: 'white',
      justifyContent: 'space-between',
    },
    icon: {
      borderRadius: 100,
    },
    btn: {
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#F5F6F7',
      borderColor: Colors.grey300,
    },
    btnContainer: {
      paddingVertical: 15,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    card: {
      padding: 10,
      borderRadius: 8,
    },
    cardSubTitle: {
      fontSize: 17,
      marginBottom: 10,
      color: Colors.grey200,
    },
    balance: {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    moneyBar: {
        flexDirection:'column',
    },
    moneyBarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
  });
  
// width: 375px;
// height: 2px;
// background-image: linear-gradient(270deg, #00d2ff 0%, #7e51ff 51%, #fa4a84 100%);