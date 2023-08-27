import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../theme/colors'
import ArrowDown from '../../assets/svgs/rise_down.svg'

interface Props {
    RightComponent?: any,
    placeholder: string,
    onPress?: () => void,
    style?: object,
    value: string,
    rootStyle?: object,
    useRightComponent?: boolean
}

const Dropdown: FC<Props> = ({ placeholder = '', onPress = () => { }, style = {}, value = '', rootStyle = {}, RightComponent, useRightComponent = false }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.9}>
            <Text style={styles.alignPlaceholderUp}>
                {placeholder}
            </Text>
            <View style={[styles.root2, rootStyle]}>
                <>
                    <Text style={[styles.value, style]}>{value}</Text>

                    {
                        useRightComponent && RightComponent ?
                            <RightComponent />
                            :
                            <View>
                                <ArrowDown />
                            </View>
                    }
                </>
            </View>
        </TouchableOpacity>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: colors.black,
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        paddingVertical: 12,
        height: 44
    },
    labelStyle: {
        color: colors.black,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    container: {
        width: '95%',
        marginRight: 'auto',
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignSelf: 'flex-start',
        color: colors.black,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        marginBottom: 10
    },
    value: {
        width: '80%',
        color: colors.veryDarkBlue,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    },
    alignPlaceholderUp: {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        marginBottom: -8,
        zIndex: 999,
        alignSelf: 'flex-start',
        marginLeft: 20,
        color: colors.teal,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    },
    root2: {
        width: '95%',
        height: 55,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.lightGrayishBlue,
        borderWidth: 1,
    },
})