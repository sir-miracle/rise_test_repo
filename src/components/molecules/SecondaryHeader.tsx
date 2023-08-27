import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC, } from 'react'
import { colors } from '../../theme/colors'
import BackArrow from '../../assets/svgs/left_arrow_rise.svg'
import Cancel from '../../assets/svgs/cancel_rise.svg'

interface Props {
    centerTitle?: string,
    onBackPress: () => void,
    style?: object,
    showBackArrow?: boolean,
    centerTitlestyle?: object,
    RightComponent?: any,
    useCancelIcon?: boolean,
    useRightComponent?: boolean
}
const SecondaryHeader: FC<Props> = ({ useCancelIcon = false, centerTitle, onBackPress = () => { }, style, centerTitlestyle, showBackArrow = true, RightComponent = () => { }, useRightComponent = false }) => {
    return (
        <View style={[styles.root, style]}>
            {showBackArrow ?
                <TouchableOpacity style={styles.backVew} onPress={onBackPress} activeOpacity={0.7}>
                    {useCancelIcon ? <Cancel /> : <BackArrow />}
                </TouchableOpacity>
                :
                <View />
            }
            <Text style={[styles.title, !useRightComponent && { marginRight: 40 }, centerTitlestyle]}>{centerTitle}</Text>
            <View>
                {RightComponent ?
                    <RightComponent />
                    :
                    <View />
                }
            </View>
        </View>
    )
}

export default SecondaryHeader

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 5
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 20,
    },
    backVew: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderRadius: 30,
        backgroundColor: colors.mostlyDarkBlue,

    }
})