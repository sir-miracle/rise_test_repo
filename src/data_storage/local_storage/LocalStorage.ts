import EncryptedStorage from 'react-native-encrypted-storage';

export const setIsFirstLaunch = async (state: boolean = true) => {
    try {
        await EncryptedStorage.setItem(
            "first_launch",
            JSON.stringify(state)
        );
    } catch (error) {
    }
}

export const getIsFirstLaunch = async () => {
    try {
        const session = await EncryptedStorage.getItem("first_launch");

        if (session !== undefined && session !== null) {
            return JSON.parse(session);
        } else { return null }
    } catch (error) { return null }
}
