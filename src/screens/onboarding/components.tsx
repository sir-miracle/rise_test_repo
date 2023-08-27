import { Image, View } from 'react-native'
import { height } from '../../utils/utilityFunctions'
import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'

export const SliderRender = ({ item }) => {
    return (
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: height * 0.45 }}>
            <Image
                source={item}
                resizeMode={'center'}
            />
        </View>
    )
}

export const IndicatorComponent = ({ presentIndex = 0 }) => {
    return (
        <View style={styles.sliderIndicatorView}>
            <View style={presentIndex == 0 ? [styles.indicator1, { backgroundColor: colors.vividOrange }] : styles.indicator2} />
            <View style={presentIndex == 1 ? [styles.indicator1, { backgroundColor: colors.paleCyan2 }] : styles.indicator2} />
            <View style={presentIndex == 2 ? [styles.indicator1, { backgroundColor: colors.teal }] : styles.indicator2} />
        </View>
    )
}

const styles = StyleSheet.create({
    sliderIndicatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    indicator1: {
        height: 10,
        width: 10,
        borderRadius: 30,
        marginHorizontal: 10
    },
    indicator2: {
        width: 7,
        height: 7,
        backgroundColor: colors.mostlyDarkBlue2,
        borderRadius: 30,
        marginHorizontal: 10
    },
    descView: {
        marginVertical: 50,
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        marginBottom: 10
    },
    body: {
        color: colors.mostlyBlack,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
    },
    bottomView: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    bottomView2: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    goLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 48,
        backgroundColor: colors.mostlyDarkBlue,
        borderRadius: 5
    },
    goRight: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 110,
        height: 48,
        backgroundColor: colors.mostlyDarkBlue,
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    next: {
        color: colors.vividOrange,
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 20,
    }
})