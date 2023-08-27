import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useContext } from 'react'
import { SecondaryHeader, StyledRoot } from '../../../components/molecules'
import { CustomButton } from '../../../components/atoms'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import { formatDecimalAmount, Props, displayToast } from '../../../utils/utilityFunctions'
import InfoIcon from '../../../assets/svgs/rise_info.svg'
import { AppContext } from '../../../data_storage/context_api/AppContext'
import { createPlan } from '../../../network_services/networks'
import { useMutation } from '@tanstack/react-query'


const ReviewPlans: FC<Props> = ({ navigation, route }) => {
    const { userLoginData } = useContext(AppContext)
    const { purpose, amount, date } = route?.params

    const { mutate, isLoading } = useMutation(createPlan, {
        onSuccess: (data: any) => {
            if (data?.status == 200) {
                const item = data?.data?.id
                navigation.navigate('PlanCreationSuccess', { item })
            } else { displayToast("error", "ERROR", STRINGS.ERROR_OCCURRED) }
        },
        onError: (err: any) => {
            if (err?.response?.data?.message != undefined) {
                displayToast("error", "ERROR", err?.response?.data?.message)
                return
            } else { displayToast("error", "ERROR", err?.message) }
        },
    });

    const onCreatePlan = () => {
        mutate({ planName: purpose, targetAmount: amount, maturityDate: new Date(date).toLocaleDateString(), token: userLoginData?.token })
    }

    return (
        <StyledRoot
            Header={() => <SecondaryHeader
                onBackPress={() => { navigation.goBack() }}
                centerTitle={STRINGS.REVIEW}
            />}
        >
            <View style={styles.top}>
                <Text style={styles.name}>{purpose}</Text>
                <Text style={styles.amount}>{STRINGS.NAIRA_SYMBOL}{formatDecimalAmount(amount)}</Text>
                <Text style={styles.date}>by {new Date(date).toDateString()}</Text>
                <View style={{ flexDirection: 'row', width: '95%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View style={styles.valuesRapper}>
                        <View style={[styles.indicator]} />
                        <Text style={styles.returns}>Investments • {STRINGS.NAIRA_SYMBOL}50,400</Text>
                    </View>
                    <View style={[styles.valuesRapper, { justifyContent: 'flex-end' }]}>
                        <View style={[styles.indicator, { backgroundColor: colors.teal }]} />
                        <Text style={[styles.returns, { textAlign: 'right' }]}>Returns • {STRINGS.NAIRA_SYMBOL}20,803</Text>
                    </View>
                </View>
            </View>
            <View style={styles.graphView}>

            </View>
            <View style={styles.monthly}>
                <Text style={styles.estimate}>Estimated monthly investment</Text>
                <Text style={styles.estimateValue}>{STRINGS.NAIRA_SYMBOL}120</Text>
            </View>
            <View style={styles.infoRapper}>
                <InfoIcon />
                <Text style={styles.desc}>Returns not guaranteed. Investing involves risk. Read our Disclosures.</Text>
            </View>
            <View style={styles.center}>
                <Text style={styles.settings}>These are your starting settings, they can always be updated.</Text>
                <CustomButton
                    label={'Agree & Continue'}
                    onPress={() => { onCreatePlan() }}
                    style={{ marginTop: 30, width: '96%' }}
                    loading={isLoading}
                />
                <CustomButton
                    label={'Start over'}
                    onPress={() => { navigation.navigate('PlanName') }}
                    style={{ marginTop: 20, width: '96%', backgroundColor: colors.mostlyDarkBlue }}
                    labelStyle={{ color: colors.teal }}
                    disabled={isLoading}
                />
            </View>
        </StyledRoot>
    )
}

export default ReviewPlans

const styles = StyleSheet.create({
    center: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 60
    },
    top: {
        width: '94%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    graphView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'orange',
        height: 30,
        marginVertical: 20
    },
    name: {
        color: colors.desaturatedDarkBlue,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
    },
    amount: {
        color: colors.black,
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
    },
    date: {
        color: colors.veryDarkGray,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: colors.darkGrayishBlue,
        marginRight: 10
    },
    valuesRapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',

    },
    returns: {
        color: colors.veryDarkGray,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
    },
    monthly: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.mostlyDarkBlue2,
        paddingHorizontal: 5
    },
    estimate: {
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    estimateValue: {
        color: colors.veryDarkGray,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    settings: {
        color: colors.desaturatedDarkBlue,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        textAlign: 'center',
        width: '90%'
    },
    infoRapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '97%',
        marginTop: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: 'rgba(113, 135, 156, 0.05)',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    desc: {
        color: colors.desaturatedDarkBlue,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        textAlign: 'left',
        width: '90%',
        marginLeft: 20
    }
})