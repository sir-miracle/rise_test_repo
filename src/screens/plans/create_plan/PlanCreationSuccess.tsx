import { StyleSheet, View, Text } from 'react-native'
import React, { useContext, FC } from 'react'
import { SecondaryHeader, StyledRoot } from '../../../components/molecules'
import { CustomButton } from '../../../components/atoms'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import OkkIcon from '../../../assets/svgs/ok_icon.svg'
import { AppContext } from '../../../data_storage/context_api/AppContext'
import { Props } from '../../../utils/utilityFunctions'

const PlanCreationSuccess: FC<Props> = ({ navigation, route }) => {
    const { userWholeDetails } = useContext(AppContext)
    const { item } = route?.params

    return (
        <StyledRoot
            Header={() => <SecondaryHeader
                onBackPress={() => { }}
                showBackArrow={false}
            />}
        >
            <View style={styles.top}>
                <OkkIcon />
                <Text style={styles.text1}>{STRINGS.YOU_JUST_CREATED_YOUR_PLAN}</Text>
                <Text style={styles.text2}>{STRINGS.WELDONE}{userWholeDetails?.first_name}</Text>
            </View>
            <View style={styles.center}>
                <CustomButton
                    label={STRINGS.VIEW_PLAN}
                    onPress={() => { navigation.navigate('PlanDetails', { item }) }}
                    style={{ width: '96%' }}
                />
            </View>
        </StyledRoot>
    )
}

export default PlanCreationSuccess

const styles = StyleSheet.create({
    center: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
        top: 60
    },
    top: {
        width: '94%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginBottom: 60,
    },
    questionNum: {
        alignSelf: 'flex-start',
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
        marginBottom: 20
    },
    question: {
        alignSelf: 'flex-start',
        color: colors.mostlyBlack,
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 18,
        marginBottom: 20,
        marginLeft: 8
    },
    naira: {
        color: colors.teal,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        paddingTop: 1,
        marginRight: 10
    },
    text1: {
        color: colors.mostlyBlack,
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 26,
        marginBottom: 10,
        marginTop: 40,
        width: '60%',
        textAlign: 'center'
    },
    text2: {
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        width: '50%',
        textAlign: 'center'
    }
})