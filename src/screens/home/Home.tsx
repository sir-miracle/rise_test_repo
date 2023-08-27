import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState, FC, useContext, useEffect } from 'react'
import { StyledRoot, PrimaryHeader } from '../../components/molecules'
import { Props, height, simpleAnimation, simpleAnimationsSettings } from '../../utils/utilityFunctions';
import { colors } from '../../theme/colors';
import { CustomButton } from '../../components/atoms';
import { BarLeftComponent, BarRightComponent, HomeBalanceSummary, RenderPlans, PlansHeaderComponent } from './components';
import AddIcon from '../../assets/svgs/rise_add2.svg'
import ForwardIcon from '../../assets/svgs/front.svg'
import Ask from '../../assets/svgs/rise_ask.svg'
import Mark from '../../assets/svgs/rise_mark.svg'
import ShareIcon from '../../assets/svgs/rise_share.svg'
import { STRINGS } from '../../theme/strings';
import useHomeNetwork from './homeNetwork';

const Home: FC<Props> = ({ navigation }) => {
    const [quotes, plans] = useHomeNetwork()

    useEffect(() => { simpleAnimationsSettings() }, [])

    return (
        <StyledRoot
            Header={() => <PrimaryHeader
                ImageBg={null}
                LeftComponent={() => <BarLeftComponent />}
                RightComponent={() => <BarRightComponent />}
            />}
        >
            <HomeBalanceSummary />
            <CustomButton
                label=''
                useComponent
                onPress={() => { navigation.navigate('FundPlanStack') }}
                ComponentAsChildren={() => (
                    <View style={{ flexDirection: 'row' }}>
                        <AddIcon />
                        <Text style={styles.add}>{STRINGS.ADD_MONEY}</Text>
                    </View>
                )}
                style={styles.addMoney}
            />
            <View style={styles.planRapper}>
                <View style={styles.innerPlanRapper}>
                    <Text style={styles.create}>
                        {STRINGS.CREATE_A_PLAN}
                    </Text>
                    <TouchableOpacity style={styles.forwardRapper}>
                        <Text style={styles.viewAll}>
                            {STRINGS.VIEW_ALL_PLANS}
                        </Text>
                        <ForwardIcon />
                    </TouchableOpacity>
                </View>
                <Text style={styles.desc}>
                    {STRINGS.START_YOUR_INVESTMENT_JOURNEY}
                </Text>
            </View>
            <View style={styles.flatlistRapper}>
                <FlatList
                    horizontal
                    data={plans}
                    renderItem={({ item }) => <RenderPlans item={item} onPress={() => navigation.navigate('PlanDetails', { item })} />}
                    ListHeaderComponent={() => <PlansHeaderComponent onPress={() => navigation.navigate('CreatePlanStack')} />}
                />
            </View>
            <CustomButton
                label=''
                onPress={() => { }}
                useComponent
                ComponentAsChildren={() => (
                    <View style={styles.btnStyle}>
                        <View style={{ flexDirection: 'row', width: '50%', alignItems: 'center' }}>
                            <View style={styles.askRapper}>
                                <Ask />
                            </View>
                            <Text style={styles.help}>
                                {STRINGS.NEED_HELP}
                            </Text>
                        </View>
                        <CustomButton
                            label={STRINGS.CONTACT_US}
                            onPress={() => { }}
                            style={{ width: '50%', height: 45 }}
                        />
                    </View>
                )}
                disabled
                style={{ backgroundColor: colors.white, elevation: 8, height: 60 }}
            />
            <View style={styles.greenBottom}>
                <Text style={styles.today}>
                    {STRINGS.TODAYS_QUOTE}
                </Text>
                <View style={{ backgroundColor: colors.white, height: 2, width: 40, marginVertical: 10 }} />
                <Text style={styles.quote}>
                    {quotes?.quote}
                </Text>
                <View style={styles.bottom}>
                    <Text style={styles.today}>
                        {quotes?.author}
                    </Text>
                    <TouchableOpacity style={styles.shareView} activeOpacity={0.8}>
                        <ShareIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <Mark />
        </StyledRoot>
    )
}

export default Home

const styles = StyleSheet.create({
    add: {
        color: colors.teal,
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 20,
        marginLeft: 10
    },
    addMoney: {
        backgroundColor: colors.white,
        borderColor: colors.mostlyDarkBlue2,
        borderWidth: 1,
        marginVertical: 20
    },
    planRapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10
    },
    innerPlanRapper: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    desc: {
        alignSelf: 'flex-start',
        color: colors.desaturatedDarkBlue,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        marginTop: 15
    },
    create: {
        color: colors.black,
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 20,
    },
    viewAll: {
        color: colors.darkGrayishBlue,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        marginRight: 10
    },
    forwardRapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatlistRapper: {
        justifyContent: 'center',
        width: '100%',
        height: height * 0.25,
        marginVertical: 30,
    },
    greenBottom: {
        marginVertical: 30,
        width: '100%',
        // height: height * 0.35,
        backgroundColor: colors.teal,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: colors.moderateCyan,
        elevation: 5,
        shadowColor: colors.moderateCyan2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    today: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    },
    quote: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        marginTop: 30,
    },
    shareView: {
        width: 43,
        height: 43,
        borderRadius: 40,
        backgroundColor: colors.white2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnStyle: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
    },
    askRapper: {
        width: 25,
        height: 25,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.mostlyDarkBlue,
        marginRight: 10
    },
    help: {
        color: '#171C22',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    }
})