import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef } from 'react'
import PhoneInput from 'react-native-phone-number-input'
import { colors } from '../../theme/colors'
import { STRINGS } from '../../theme/strings'
import { validateNumbers } from '../../utils/utilityFunctions'
import ArrowDown from '../../assets/svgs/rise_down.svg'

const CustomPhoneInput = ({ getValue = (value: string) => { }, style = {} }) => {
    const [value, setValue] = useState("");
    const phoneInput = useRef<PhoneInput>(null);

    return (
        <>
            <Text style={styles.alignPlaceholderUp}>
                {STRINGS.PHONE_NUMBER}
            </Text>
            <View style={[styles.root, style]}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="NG"
                    layout="first"
                    autoFocus
                    textContainerStyle={{ backgroundColor: colors.white }}
                    codeTextStyle={{}}
                    textInputProps={{
                        keyboardType: 'numeric',
                        onChangeText: (text) => {
                            if (validateNumbers(text)) {
                                setValue(text)
                                getValue(text)
                            }
                        },
                        value: value
                    }}
                    renderDropdownImage={<ArrowDown />}
                    countryPickerProps={{}}
                />
            </View>
        </>
    )
}

export default CustomPhoneInput

const styles = StyleSheet.create({
    root: {
        width: '95%',
        height: 55,
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        alignItems: 'center',
        borderColor: colors.lightGrayishBlue,
        borderWidth: 1,
        marginBottom: 20
    },
    alignPlaceholderUp: {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        marginBottom: -9,
        zIndex: 999,
        alignSelf: 'flex-start',
        marginLeft: 10,
        color: colors.teal,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    }
})