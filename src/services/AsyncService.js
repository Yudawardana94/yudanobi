import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@token')
        return token
    } catch (error) {
        return null
    }
}

export const setToken = async (token) => {
    await AsyncStorage.setItem('@token', token.toString())
}

export const destroyAsyncData = async () => {
    await AsyncStorage.clear()
}