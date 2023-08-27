import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ViewStyle, StyleProp } from 'react-native'
import React, { useState, useContext, FC } from 'react'
import Bell from '../../assets/svgs/rise_bell.svg'
import LinearGradient from 'react-native-linear-gradient';
import EyeOpen from '../../assets/svgs/eye_open.svg';
import EyeClose from '../../assets/svgs/eye_close.svg'
import UpIcon from '../../assets/svgs/green_up.svg'
import Forward from '../../assets/svgs/rise_forward.svg'
import Plus from '../../assets/svgs/rise_add2.svg'
import PlanImage from '../../assets/images/plan_card.png'
import { AppContext } from '../../data_storage/context_api/AppContext';
import { colors } from '../../theme/colors';
import { STRINGS } from '../../theme/strings';
import { PlansDataModel } from '../../network_services/networkDataModels';

export const BarLeftComponent = () => {
    const { userWholeDetails } = useContext(AppContext)
    const time = new Date().getHours()
    const greeting = (time >= 0 && time < 11) ? 'morning' : (time >= 12 && time < 17) ? 'Afternoon' : 'Evening'

    return (
        <View>
            <Text style={styles.greet}>
                Good {greeting} ☀
            </Text>
            <Text style={styles.name}>
                {userWholeDetails?.first_name}
            </Text>
        </View>
    )
}

export const BarRightComponent = ({ onBonusPressed = () => { }, onBellPressed = () => { } }) => {
    return (
        <View style={styles.rightComponentRoot}>
            <TouchableOpacity style={styles.bonusRapper} activeOpacity={0.8} onPress={onBonusPressed}>
                <Text style={styles.bonus}>Earn 3% bonus</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightRapper} activeOpacity={0.8} onPress={onBellPressed}>
                <Bell />
                <View style={styles.noticeRapper}><Text style={styles.notice}>9+</Text></View>
            </TouchableOpacity>
        </View>
    )
}

const HomeIndicatorComponent = ({ isActive = false }) => {
    return (<View style={isActive ? styles.indicator1 : styles.indicator2} />)
}

export const HomeBalanceSummary = ({ }) => {
    const { userWholeDetails } = useContext(AppContext)
    const [isSecureEntry, setIsSecureEntry] = useState(true);

    //toggles balance field visibility
    const passwordVisibility = () => {
        if (isSecureEntry == false) { setIsSecureEntry(true) } else { setIsSecureEntry(false) }
    };
    return (
        <View style={styles.balanceView}
        // colors={['red', 'rgba(255, 255, 255, 0.06)', 'red']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        >
            <View style={styles.balEyeRapper}>
                <Text style={styles.total}>
                    {STRINGS.TOTAL_BALANCE}
                </Text>
                {
                    isSecureEntry ?
                        <TouchableOpacity onPress={passwordVisibility} activeOpacity={0.7} style={styles.eyeRapper}>
                            <EyeClose height={18} width={18} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={passwordVisibility} activeOpacity={0.7} style={styles.eyeRapper}>
                            <EyeOpen height={18} width={18} />
                        </TouchableOpacity>
                }
            </View>
            <Text style={styles.balance}>
                {isSecureEntry ? '******' : userWholeDetails?.total_balance ? `$${userWholeDetails?.total_balance}` : '$0.00'}
            </Text>
            <View style={styles.divide} />
            <View style={styles.gainsView}>
                <Text style={styles.gains}>
                    {STRINGS.TOTAL_GAINS}
                </Text>
                <UpIcon />
                <Text style={[styles.gainsValue]}>
                    {userWholeDetails?.total_balance ? userWholeDetails?.total_balance : '0.00'}%
                </Text>
                <TouchableOpacity>
                    <Forward />
                </TouchableOpacity>
            </View>
            <View style={styles.indicatorRapper}>
                <HomeIndicatorComponent isActive />
                <HomeIndicatorComponent />
                <HomeIndicatorComponent />
            </View>
        </View>
    )
}

interface PlansProps {
    item: PlansDataModel,
    style?: StyleProp<ViewStyle>,
    onPress: (item: PlansDataModel) => void
}

export const RenderPlans: FC<PlansProps> = ({ item, onPress, style }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.9} style={[styles.plansListRapper, style]}>
            <ImageBackground
                source={PlanImage}
                resizeMode={'cover'}
                style={styles.plansList}
                imageStyle={{ width: '100%', height: '100%', borderRadius: 12 }}
            >
                <Text style={styles.planDetails}>
                    {item?.plan_name}
                </Text>
                <Text style={styles.planDetails}>
                    {STRINGS.NAIRA_SYMBOL}{item?.target_amount}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export const PlansHeaderComponent = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity style={styles.listHeader} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.plusView}>
                <Plus />
            </View>
            <Text style={styles.create}>{STRINGS.CREATE_INVESTMENT_PLAN}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    greet: {
        color: colors.veryDarkGray,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    name: {
        color: colors.veryDarkGray,
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 20,
    },
    bonusRapper: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.teal,
        borderRadius: 16,
        paddingHorizontal: 10,
        marginRight: 20
    },
    bonus: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
    },
    rightRapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    rightComponentRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noticeRapper: {
        width: 20,
        height: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.brightRed,
        alignSelf: 'flex-start',
        marginBottom: 20,
        marginLeft: -9
    },
    notice: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 14,
    },
    balanceView: {
        width: '95%',
        height: 175,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.white,
        marginVertical: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 3,
        backgroundColor: colors.mostlyDarkBlue
    },
    eyeRapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    balEyeRapper: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '37%'
    },
    gainsView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '47%'
    },
    indicatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    indicator1: {
        height: 6,
        width: 16,
        borderRadius: 30,
        backgroundColor: colors.teal
    },
    indicator2: {
        height: 6,
        width: 6,
        borderRadius: 30,
        backgroundColor: colors.mostlyDarkBlue2
    },
    indicatorRapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '15%',
        marginTop: 15
    },
    total: {
        color: colors.desaturatedDarkBlue,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    balance: {
        color: colors.veryDarkGray,
        fontSize: 32,
        fontWeight: '400',
        lineHeight: 35,
        marginVertical: 15
    },
    gains: {
        color: colors.desaturatedDarkBlue,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
    },
    gainsValue: {
        color: colors.strongLimeGreen,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
    },
    divide: {
        width: '70%',
        height: 1,
        backgroundColor: colors.mostlyDarkBlue,
        marginBottom: 10
    },
    listHeader: {
        backgroundColor: colors.mostlyDarkBlue,
        width: 165,
        height: '100%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    plusView: {
        width: 43,
        height: 43,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.moderateCyan2,
        marginBottom: 10
    },
    create: {
        color: colors.veryDarkGray,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 22,
        width: '65%',
        textAlign: 'center'
    },
    plansList: {
        backgroundColor: colors.mostlyDarkBlue,
        width: '100%',
        height: '100%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    planDetails: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 22,
        alignSelf: 'flex-start',
        marginLeft: 15,
    },
    plansListRapper: {
        width: 165,
        height: '100%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 15,
        backgroundColor: colors.verySoftBlue
    }
})