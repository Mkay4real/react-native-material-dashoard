// import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bio from 'react-native-biometrics'

// save

// if str is true data is a string else data is json
export const saveCredentials = async (key: string, str: boolean, payload: any) => {
    const config = {
        accessible: 'ACCESSIBLE.ALWAYS'
    }
    await AsyncStorage.setItem(key, str ? payload : JSON.stringify(payload))
    const saved = await AsyncStorage.getItem(key)
    console.log("saved to local_db", saved);
}


export const saveAppCredentials = (key = "", value = "") => AsyncStorage.setItem(key, value, (err=>{console.log("Storage error",err)}));

export const getCredentials = (key = "") => AsyncStorage.getItem(key);

export const deleteCredentials = (key: string) => {
    const config = {
        accessible: 'ACCESSIBLE.ALWAYS'
    }
    AsyncStorage.removeItem(key);
}
