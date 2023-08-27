import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../theme/colors'

export const DetailsItem = ({ title = '', value = '' }) => {
    return (
        <View style={styles.detailsRoot}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.val}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsRoot: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: colors.mostlyDarkBlue
    },
    title: {
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    val: {
        color: colors.mostlyBlack,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
})