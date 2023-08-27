import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { SecondaryHeader, StyledRoot } from '../../../components/molecules'
import House from '../../../assets/svgs/rise_plan_house.svg'
import { CustomButton } from '../../../components/atoms'
import QuestionMark from '../../../assets/svgs/rise_ask.svg'
import CalenderIcon from '../../../assets/svgs/rise_calender.svg'
import Gear from '../../../assets/svgs/rise_gear.svg'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import { Options } from './components'
import { Props } from '../../../utils/utilityFunctions'

const PlanIntro: FC<Props> = ({ navigation }) => {

    return (
        <StyledRoot
            Header={() => <SecondaryHeader
                onBackPress={() => { navigation.goBack() }}
                centerTitle={STRINGS.CREATE_A_PLAN}
                useCancelIcon
                style={{ paddingLeft: 10 }}
            />}
        >
            <View style={styles.topView}>
                <Text style={styles.reach}>
                    {STRINGS.REACH_YOUR_GOALS_FASTER}
                </Text>
                <House />
            </View>
            <View style={styles.center}>
                <Options
                    title='Give us a few details'
                    desc='Tell us what you want to achieve and we will help you get there'
                    Icon={QuestionMark}
                />
                <Options
                    title='Turn on auto-invest'
                    desc='The easiest way to get your investment working for you is to fund to periodically. '
                    Icon={CalenderIcon}
                />
                <Options
                    title='Modify as you progress'
                    desc='You are in charge. Make changes to your plan, from adding funds, funding source, adding money to your wallet and more.'
                    Icon={Gear}
                />
            </View>
            <CustomButton
                label={STRINGS.CONTINUE}
                onPress={() => { navigation.navigate('PlanName') }}
            />
        </StyledRoot>
    )
}

export default PlanIntro

const styles = StyleSheet.create({
    topView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 50
    },
    reach: {
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
        marginBottom: 40
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 50
    }
})