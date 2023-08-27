import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInStack from './SignInStack';
import SignupStack from './SignupStack';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignInStack" component={SignInStack} />
            <Stack.Screen name="SignupStack" component={SignupStack} />
        </Stack.Navigator>
    )
}

export default AuthStack