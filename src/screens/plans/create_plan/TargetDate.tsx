import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, FC } from 'react'
import { SecondaryHeader, StyledRoot } from '../../../components/molecules'
import { CustomButton, Dropdown } from '../../../components/atoms'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import { ProgressComponent } from './components'
import { validateNumbers, Props } from '../../../utils/utilityFunctions'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CalenderIcon from '../../../assets/svgs/rise_calender.svg'

const TargetDate: FC<Props> = ({ navigation, route }) => {
    const { purpose, amount } = route?.params
    const [date, setDate] = useState<string>('')
    const [dateString, setDateString] = useState<string>('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

    const handleConfirm = useCallback((date: any) => {
        setDateString(date)
        const _date = (new Date(date).toLocaleDateString())
        setDate(_date)
        setDatePickerVisibility(false)
    }, [])

    return (
        <StyledRoot
            Header={() => <SecondaryHeader
                onBackPress={() => { navigation.goBack() }}
                centerTitle={STRINGS.TARGET_DATE}
            />}
        >
            <View style={styles.top}>
                <Text style={styles.questionNum}>
                    {STRINGS.QUESTION3}
                </Text>
                <ProgressComponent progress={1} />
            </View>

            <View style={styles.center}>
                <Text style={styles.question}>{STRINGS.WHEN_TO_WITHDRAW}</Text>
                <Dropdown
                    RightComponent={() => <CalenderIcon />}
                    value={date?.length > 0 ? date : STRINGS.CHOOSE_A_DATE}
                    placeholder={STRINGS.CHOOSE_A_DATE}
                    onPress={() => setDatePickerVisibility(true)}
                    useRightComponent
                />
                <CustomButton
                    label={STRINGS.CONTINUE}
                    onPress={() => { navigation.navigate('ReviewPlans', { purpose, amount, date: dateString }) }}
                    style={{ marginTop: 30, width: '96%' }}
                    disabled={date.length < 1}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                    locale="en_GB"
                />
            </View>
        </StyledRoot>
    )
}

export default TargetDate

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