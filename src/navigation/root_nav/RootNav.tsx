import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../authentication/AuthStack';
import Onboarding from '../../screens/onboarding/Onboarding';
import BottomTabStack from '../bottom_nav/BottomNavStack';
import CreatePlanStack from '../create_plan/CreatePlanStack';
import FundPlanStack from '../fund_plan/FundPlanStack';
import PlanDetails from '../../screens/plans/view_plan/PlanDetails';
import { getIsFirstLaunch } from '../../data_storage/local_storage/LocalStorage';
import SelectBank from '../../screens/plans/fund_plan/SelectBank';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

const RootNav = () => {
    const [firstInstall, setFirstInstal] = useState<boolean | string>("-1")

    useEffect(() => {
        getIsFirstLaunch().then((val) => {
            if (val == false) { setFirstInstal(false) } else { setFirstInstal(true) }
        }).catch(() => setFirstInstal(true))
    }, [])

    // if (firstInstall == "-1") return (<View />)

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={firstInstall == false ? 'AuthStack' : 'Onboarding'}
        >
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
            <Stack.Screen name="CreatePlanStack" component={CreatePlanStack} />
            <Stack.Screen name="FundPlanStack" component={FundPlanStack} />
            <Stack.Screen name="PlanDetails" component={PlanDetails} />
            <Stack.Screen name="SelectBank" component={SelectBank} />
        </Stack.Navigator>
    )
}
export default RootNav
