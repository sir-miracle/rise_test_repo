import { StyleSheet, Text, View } from 'react-native'
import React, { useState, FC } from 'react'
import { SecondaryHeader, StyledRoot } from '../../../components/molecules'
import { CustomButton, CustomInput } from '../../../components/atoms'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import { ProgressComponent } from './components'
import { Props } from '../../../utils/utilityFunctions'

const PlanName: FC<Props> = ({ navigation }) => {
    const [purpose, setPurpose] = useState<string>('')

    return (
        <StyledRoot
            Header={() => <SecondaryHeader
                onBackPress={() => { navigation.goBack() }}
                centerTitle={STRINGS.GOAL_NAME}
            />}
        >
            <View style={styles.top}>
                <Text style={styles.questionNum}>
                    {STRINGS.QUESTION1}
                </Text>
                <ProgressComponent progress={0.3} />
            </View>

            <View style={styles.center}>
                <Text style={styles.question}>{STRINGS.WHAT_ARE_YOU_SAVING_FOR}</Text>
                <CustomInput
                    value={purpose}
                    onChangeText={(val: string) => setPurpose(val)}
                    placeholder={STRINGS.GOAL_NAME}
                />
                <CustomButton
                    label={STRINGS.CONTINUE}
                    onPress={() => { navigation.navigate('Target', { purpose }) }}
                    style={{ marginTop: 30, width: '96%' }}
                    disabled={purpose?.length < 4}
                />
            </View>
        </StyledRoot>
    )
}

export default PlanName

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
    }
})