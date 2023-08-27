import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanIntro from '../../screens/plans/create_plan/PlanIntro';
import PlanName from '../../screens/plans/create_plan/PlanName';
import Target from '../../screens/plans/create_plan/Target';
import TargetDate from '../../screens/plans/create_plan/TargetDate';
import PlanCreationSuccess from '../../screens/plans/create_plan/PlanCreationSuccess';
import ReviewPlans from '../../screens/plans/create_plan/ReviewPlans';
const Stack = createNativeStackNavigator();

const CreatePlanStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PlanIntro" component={PlanIntro} />
            <Stack.Screen name="PlanName" component={PlanName} />
            <Stack.Screen name="Target" component={Target} />
            <Stack.Screen name="TargetDate" component={TargetDate} />
            <Stack.Screen name="ReviewPlans" component={ReviewPlans} />
            <Stack.Screen name="PlanCreationSuccess" component={PlanCreationSuccess} />
        </Stack.Navigator>
    )
}

export default CreatePlanStack
