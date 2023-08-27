import { StyleSheet, Text, View } from 'react-native'
import React, { useState, FC } from 'react'
import { SecondaryHeader, StyledRoot } from '../../../components/molecules'
import { CustomButton, CustomInput } from '../../../components/atoms'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import { ProgressComponent } from './components'
import { validateNumbers, Props } from '../../../utils/utilityFunctions'

const Target: FC<Props> = ({ navigation, route }) => {
    const { purpose } = route?.params
    const [amount, setAmount] = useState<string>('')

    return (
        <StyledRoot
            Header={() => <SecondaryHeader
                onBackPress={() => { navigation.goBack() }}
                centerTitle={STRINGS.TARGET_AMOUNT}
            />}
        >
            <View style={styles.top}>
                <Text style={styles.questionNum}>
                    {STRINGS.QUESTION2}
                </Text>
                <ProgressComponent progress={0.67} />
            </View>

            <View style={styles.center}>
                <Text style={styles.question}>{STRINGS.HOW_MUCH_DO_YOU_NEED}</Text>
                <CustomInput
                    value={amount}
                    onChangeText={(val: string) => { if (validateNumbers(val)) setAmount(val) }}
                    placeholder={STRINGS.TARGET_AMOUNT}
                    keyboardType={'numeric'}
                    LeftComponent={() => <Text style={styles.naira}>₦</Text>}
                    showLeftComponent
                />
                <CustomButton
                    label={STRINGS.CONTINUE}
                    onPress={() => { navigation.navigate('TargetDate', { amount, purpose }) }}
                    style={{ marginTop: 30, width: '96%' }}
                    disabled={amount.length < 1}
                />
            </View>
        </StyledRoot>
    )
}

export default Target

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
        marginTop: 40,
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
    }
})