import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountSuccess from '../../screens/authentication/sign_up/AccountSuccess';
import CreateAccount from '../../screens/authentication/sign_up/CreateAccount';
import MoreAboutYou from '../../screens/authentication/sign_up/MoreAboutYou';


const Stack = createNativeStackNavigator();

const SignupStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="MoreAboutYou" component={MoreAboutYou} />
            <Stack.Screen name="AccountSuccess" component={AccountSuccess} />
        </Stack.Navigator>
    )
}

export default SignupStack

