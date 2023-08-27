import { Image, View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../theme/colors'
import HomeIcon from '../../assets/svgs/rise_home.svg'
import WalletIcon from '../../assets/svgs/rise_wallet.svg'
import FeedIcon from '../../assets/svgs/rise_feed.svg'
import PlansIcon from '../../assets/svgs/plans.svg'
import ProfileIcon from '../../assets/images/rise_profile.png'
import Home from '../../screens/home/Home';
import Feed from '../../screens/feed/Feed';
import Plans from '../../screens/plans/Plans';
import Wallet from '../../screens/plans/fund_plan/Wallet';
import Account from '../../screens/account/Account';
import { STRINGS } from '../../theme/strings';

const Tab = createBottomTabNavigator();

const BottomTabStack = () => {

    const CustomActiveIndicator = () => (<View style={{ width: 9, height: 9, borderRadius: 10, backgroundColor: colors.moderateCyan, marginBottom: 3 }} />)

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.darkGrayishBlue,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    height: 70,
                    borderTopColor: colors.lightGrayishBlue2,
                    borderTopWidth: 1,
                    // paddingBottom: 10
                },
                tabBarItemStyle: { marginBottom: 0, },
                tabBarIconStyle: { marginTop: 5 }
            })}
        >
            <Tab.Screen name="Home" component={Home}
                options={(route) => {
                    return {
                        title: '',
                        tabBarIcon:
                            ({ focused }) => (
                                <View style={styles.barRapper}>
                                    <HomeIcon
                                        style={focused ? { color: colors.moderateCyan } : { color: colors.darkGrayishBlue }}
                                    />
                                    {focused ? <CustomActiveIndicator /> : <Text style={styles.barTextStyle}>{STRINGS.HOME}</Text>}
                                </View>
                            ),
                    }
                }} />

            <Tab.Screen name="Plans" component={Plans}
                options={(route) => {
                    return {
                        title: '',
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.barRapper}>
                                <PlansIcon
                                    style={focused ? { color: colors.moderateCyan } : { color: colors.darkGrayishBlue }}
                                />
                                {focused ? <CustomActiveIndicator /> : <Text style={styles.barTextStyle}>{STRINGS.PLANS}</Text>}
                            </View>
                        )
                    }
                }} />


            <Tab.Screen name="Wallet" component={Wallet}
                options={(route) => {
                    return {
                        title: '',
                        tabBarIcon:
                            ({ focused }) => (
                                <View style={styles.barRapper}>
                                    <WalletIcon
                                        style={focused ? { color: colors.moderateCyan } : { color: colors.darkGrayishBlue }}
                                    />
                                    {focused ? <CustomActiveIndicator /> : <Text style={styles.barTextStyle}>{STRINGS.WALLET}</Text>}
                                </View>)
                    }
                }} />
            <Tab.Screen name="Feed" component={Feed}
                options={(route) => {
                    return {
                        title: '',
                        tabBarIcon:
                            ({ focused }) => (
                                <View style={styles.barRapper}>
                                    <FeedIcon
                                        style={focused ? { color: colors.moderateCyan } : { color: colors.darkGrayishBlue }}
                                    />
                                    {focused ? <CustomActiveIndicator /> : <Text style={styles.barTextStyle}>{STRINGS.FEED}</Text>}
                                </View>),
                        tabBarBadge: <Text>{'9+'}</Text>
                    }
                }} />
            <Tab.Screen name="Account" component={Account}
                options={(route) => {
                    return {
                        title: '',
                        tabBarIcon:
                            ({ focused }) => (
                                <View style={styles.barRapper}>
                                    <View style={{ marginTop: -6 }}>
                                        <Image
                                            source={ProfileIcon}
                                            resizeMode={'contain'}
                                            style={{ width: 27, height: 30, borderRadius: 30 }}
                                        />
                                    </View>
                                    {focused ? <CustomActiveIndicator /> : <Text style={styles.barTextStyle}>{STRINGS.ACCOUNT}</Text>}
                                </View>
                            ),
                    }
                }} />
        </Tab.Navigator>
    )
}

export default BottomTabStack

const styles = StyleSheet.create({
    barRapper: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        marginTop: 10
    },
    barTextStyle: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.darkGrayishBlue,
    }
})
