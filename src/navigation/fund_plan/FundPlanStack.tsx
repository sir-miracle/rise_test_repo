import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Plans from '../../screens/plans/Plans';
import Wallet from '../../screens/plans/fund_plan/Wallet';
import SelectBank from '../../screens/plans/fund_plan/SelectBank';

const Stack = createNativeStackNavigator();

const FundPlanStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen name="Plans" component={Plans} />
            <Stack.Screen name="SelectBank" component={SelectBank} />
        </Stack.Navigator>
    )
}

export default FundPlanStack
