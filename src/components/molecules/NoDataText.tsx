import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { STRINGS } from '../../theme/strings'
import { colors } from '../../theme/colors'

const NoDataText = ({ text = STRINGS.NO_AVAILABLE_DATA }) => {
    return (<Text style={styles.nodata}>{text}</Text>)
}
export default NoDataText
const styles = StyleSheet.create({
    nodata: {
        color: colors.veryDarkDesaturatedBlue,
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 20,
        alignSelf: 'center',
        marginTop: 50
    }
})