import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, FC, useContext, useEffect } from 'react'
import { StyledRoot } from '../../../components/molecules'
import { validateEmail, validatePassword, Props, displayToast, simpleAnimationsSettings, simpleAnimation } from '../../../utils/utilityFunctions';
import { colors } from '../../../theme/colors';
import { CustomButton, CustomInput } from '../../../components/atoms';
import { useMutation } from '@tanstack/react-query'
import { login } from "../../../network_services/networks";
import { AppContext } from '../../../data_storage/context_api/AppContext';
import { STRINGS } from '../../../theme/strings';

const SignIn: FC<Props> = ({ navigation }) => {
    const { setUserLoginData } = useContext(AppContext)
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const { mutate, isLoading } = useMutation(login, {
        onSuccess: (data: any) => {
            if (data?.status == 200) {
                setUserLoginData(data?.data)
                navigation.replace('BottomTabStack')
            } else { displayToast("error", "ERROR", STRINGS.ERROR_OCCURRED) }
        },
        onError: (err: any) => {
            if (err?.response?.data?.message != undefined) {
                displayToast("error", "ERROR", err?.response?.data?.message)
                return
            } else { displayToast("error", "ERROR", err?.message) }
        },
    });

    const performSignIn = () => {
        mutate({ email, password })
    }


    return (
        <StyledRoot>
            <View style={styles.topRapper}>
                <View style={styles.top}>
                    <Text style={styles.create}>{STRINGS.WELCOME_BACK}</Text>
                    <Text style={styles.desc}>
                        {STRINGS.LETS_GET_YOU_LOGGED_IN}
                    </Text>
                </View>
                <View style={styles.inputView}>
                    <CustomInput
                        rootStyle={{ marginBottom: 20 }}
                        placeholder={STRINGS.EMAIL_ADDRESS}
                        value={email}
                        onChangeText={(val: string) => setEmail(val)}
                    />
                    <CustomInput
                        isForPassword
                        placeholder={STRINGS.PASSWORD}
                        value={password}
                        onChangeText={(val: string) => setPassword(val)}
                    />
                </View>
                <CustomButton
                    label={STRINGS.SIGN_IN}
                    onPress={() => { performSignIn() }}
                    disabled={!(validateEmail(email) && validatePassword(password))}
                    loading={isLoading}
                />
                <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
                    <Text style={styles.forgot}>{STRINGS.FORGOT_PASSWORD}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.noAccount}>
                    {STRINGS.DONT_HAVE_ACCOUNT} <Text style={{ color: colors.teal }} onPress={() => { navigation.navigate('SignupStack') }}>{STRINGS.SIGNUP}</Text>
                </Text>
            </View>
        </StyledRoot>
    )
}

export default SignIn

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    check: {
        width: 16,
        height: 16,
        borderRadius: 50,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderColor: colors.teal,
        marginRight: 10,

    },
    top: {
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
        width: '100%',
        paddingHorizontal: 10
    },
    create: {
        color: colors.mostlyBlack,
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 26,
    },
    desc: {
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '400',
        width: '90%',
        marginTop: 8,
        lineHeight: 18,
    },
    topRapper: {
        flex: 0.7,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start'
    },
    bottom: {
        flex: 0.2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgot: {
        color: colors.teal,
        fontSize: 14,
        fontWeight: '700',
        marginTop: 30,
        lineHeight: 18,
    },
    noAccount: {
        color: colors.desaturatedDarkBlue,
        fontSize: 14,
        fontWeight: '700',
        marginTop: 30,
        lineHeight: 18,
    }
})