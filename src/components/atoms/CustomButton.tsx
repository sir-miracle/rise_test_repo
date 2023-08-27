import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../theme/colors'
import { LoadingIndicator } from '../molecules'

interface Props {
    onPress: () => void,
    label: string,
    style?: object,
    labelStyle?: object,
    disabled?: boolean,
    loading?: boolean,
    useComponent?: boolean,
    ComponentAsChildren?: any
}

const CustomButton: FC<Props> = ({
    onPress = () => { },
    label,
    style,
    labelStyle,
    disabled = false,
    loading = false,
    useComponent = false,
    ComponentAsChildren
}) => {

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.buttonStyle, disabled && { backgroundColor: colors.disabledButton }, style]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ?
                <LoadingIndicator />
                :
                <>
                    {useComponent && ComponentAsChildren ?
                        <ComponentAsChildren /> :
                        <Text style={[styles.labelstyle, labelStyle]}>
                            {label}
                        </Text>
                    }
                </>


            }
        </TouchableOpacity >
    )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonStyle: {
        width: '95%',
        height: 50,
        backgroundColor: colors.teal,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    labelstyle: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
    }
})