import { View, Text, StyleSheet } from "react-native"
import { colors } from "../../../theme/colors"
import Check from '../../../assets/svgs/check.svg'

export const CheckBoxComponent = ({ isChecked = false, details = '' }) => {
    return (
        <View style={styles.root}>
            <View style={[styles.check, isChecked && { backgroundColor: colors.teal }]}>
                {isChecked && <Check />}
            </View>
            <Text style={styles.details}>{details}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    check: {
        width: 16,
        height: 16,
        borderRadius: 50,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderColor: colors.teal,
        marginRight: 10,
    },
    details: {
        color: colors.black,
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
    },
    root: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 15
    }
})