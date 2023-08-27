import { TouchableOpacity, View } from "react-native"


export const RenderWalletDetails = ({ item }) => {
    return (
        <View>

        </View>
    )
}

export const RenderBanks = ({ item, onPress = (item: any) => { } }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)}>

        </TouchableOpacity>
    )
}