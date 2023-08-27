import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, FC, useContext } from 'react'
import { StyledRoot, NoDataText, PrimaryHeader } from '../../../components/molecules'
import { CustomButton } from '../../../components/atoms'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import { Props } from '../../../utils/utilityFunctions'
import { AppContext } from '../../../data_storage/context_api/AppContext'
import { ProgressComponent } from '../create_plan/components'
import AddIcon from '../../../assets/svgs/rise_add2.svg'
import Question from '../../../assets/svgs/question_shade.svg'
import RightIcon from '../../../assets/svgs/forward_color.svg'
import { DetailsItem } from './components'
import YellowHeader from '../../../assets/images/yellow_header.png'
import LeftIcon from '../../../assets/svgs/white_left.svg'
import Dots from '../../../assets/svgs/options_icon.svg'

const PlanDetails: FC<Props> = ({ navigation, route }) => {
    const { item } = route?.params

    const progressPercent = () => {
        if ((item?.total_returns / item?.target_amount) == undefined || (item?.total_returns / item?.target_amount) == null) return 0
        return ((item?.total_returns / item?.target_amount))
    }

    return (
        <StyledRoot
            headerRapperStyle={{ paddingVertical: 0 }}
            Header={() => <PrimaryHeader
                useFullWidth
                ImageBg={YellowHeader}
                useImageBg
                CenterCompoent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.start}>{item?.plan_name}</Text>
                        <Text style={styles.nameTop}>for Kate Ventures</Text>
                    </View>
                )}
                LeftComponent={() => (
                    <TouchableOpacity style={styles.left} onPress={() => navigation.goBack()}>
                        <LeftIcon />
                    </TouchableOpacity>
                )}
                RightComponent={() => (
                    <TouchableOpacity style={styles.right}>
                        <Dots />
                    </TouchableOpacity>
                )}
            />}>
            <View style={styles.top}>
                <Text style={styles.name}>{'Plan Balance'}</Text>
                <Text style={styles.amount}>{STRINGS.NAIRA_SYMBOL}{'$0.00'}</Text>
                <View style={styles.questionRapper}>
                    <Text style={styles.value}>{'~ ₦0.00'}</Text>
                    <Question />
                </View>
                <Text style={styles.gains}>{'Gains'}</Text>
                <Text style={styles.gainsValue}>{'+$5,000.43 • +12.4% '}</Text>
                <View style={{ flexDirection: 'row', width: '95%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View style={styles.valuesRapper}>
                        <Text style={styles.returns}>{item?.total_returns} achieved</Text>
                    </View>
                    <View style={[styles.valuesRapper, { justifyContent: 'flex-end' }]}>
                        <Text style={[styles.returns, { textAlign: 'right' }]}>Target: ${item?.target_amount}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 25 }}><ProgressComponent progress={progressPercent()} /></View>

                <View style={styles.resultsRapper}>
                    <Text style={styles.results}>Results are updated monthly</Text>
                </View>
                <CustomButton
                    label=''
                    useComponent
                    onPress={() => { navigation.navigate('FundPlanStack') }}
                    ComponentAsChildren={() => (
                        <View style={{ flexDirection: 'row' }}>
                            <AddIcon />
                            <Text style={styles.add}>Fund plan</Text>
                        </View>
                    )}
                    style={styles.addMoney}
                />
                <View style={styles.detailsRapper}>
                    <DetailsItem
                        title='Total earnings'
                        value='$12,000.09'
                    />
                    <DetailsItem
                        title='Current earnings'
                        value='$12,000.09'
                    />
                    <DetailsItem
                        title='Deposit value'
                        value='$50,543.05'
                    />
                    <DetailsItem
                        title='Balance in Naira (*₦505)'
                        value='₦31,918,837.5'
                    />
                    <DetailsItem
                        title='Plan created on'
                        value='23rd July, 2019'
                    />
                    <DetailsItem
                        title='Maturity date'
                        value='24th July 2022'
                    />
                </View>
                <View style={styles.recentRapper}>
                    <Text style={styles.trans}>
                        Recent transactions
                    </Text>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.view}>View all</Text>
                        <RightIcon />
                    </TouchableOpacity>
                </View>
                <NoDataText text='No recent transactions data available' />
            </View>
        </StyledRoot>
    )
}

export default PlanDetails

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
        height: 30,
        marginVertical: 20
    },
    name: {
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    amount: {
        color: '#012224',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
        marginVertical: 10
    },
    date: {
        color: colors.veryDarkGray,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    value: {
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        marginRight: 7
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
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    add: {
        color: colors.teal,
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 20,
        marginLeft: 10
    },
    addMoney: {
        backgroundColor: colors.mostlyDarkBlue,
        marginVertical: 20,
        width: '100%'
    },
    questionRapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    gains: {
        color: '#012224',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    gainsValue: {
        color: colors.strongLimeGreen,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 24,
        marginBottom: 5
    },
    resultsRapper: {
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: colors.mostlyDarkBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    results: {
        color: colors.desaturatedDarkBlue,
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 20,
    },
    detailsRapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
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
        color: '#222222',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    recentRapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
    },
    view: {
        color: colors.teal,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 20,
        marginRight: 5
    },
    trans: {
        color: colors.black,
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 20,
    },
    left: {
        width: 35,
        height: 35,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    right: {
        width: 35,
        height: 35,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    start: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 26,
    },
    nameTop: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        alignSelf: 'center'
    }
})