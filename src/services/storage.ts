import AsyncStorage from '@react-native-async-storage/async-storage';
const TOKEN_KEY = "@FaeterjAcademics-token"
export const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
    }
}

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
    }
}

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (e) {
    }
}