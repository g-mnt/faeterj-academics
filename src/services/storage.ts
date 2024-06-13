import AsyncStorage from '@react-native-async-storage/async-storage';
const TOKEN_KEY = "@FaeterjAcademics-token"
export const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
    }
}
