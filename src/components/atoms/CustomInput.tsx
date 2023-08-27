import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { colors } from '../../theme/colors'
import EyeOpen from '../../assets/svgs/eye_open.svg';
import EyeClose from '../../assets/svgs/eye_close.svg'
import { simpleAnimationsSettings, simpleAnimation } from '../../utils/utilityFunctions';

interface Props {
    placeholder: string,
    value: string,
    onChangeText: any,
    style?: object,
    rootStyle?: object,
    isForPassword?: boolean,
    keyboardType?: 'default' | 'numeric',
    editable?: boolean,
    placeholderStyle?: string,
    onEnterPressed?: any,
    returnKeyType?: 'next' | 'done',
    disabled?: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    showLeftComponent?: boolean,
    LeftComponent?: any
}
const CustomInput: FC<Props> = ({
    placeholder,
    placeholderStyle,
    value,
    onChangeText = () => { },
    style,
    rootStyle,
    isForPassword = false,
    editable = true,
    keyboardType = 'default',
    onEnterPressed = () => { },
    returnKeyType = 'next',
    onBlur = () => { },
    onFocus = () => { },
    showLeftComponent = false,
    LeftComponent
}) => {
    const [focus, setFocus] = useState<boolean>(false)
    const [isSecureEntry, setIsSecureEntry] = useState(true);

    useEffect(() => {
        simpleAnimationsSettings()
    }, [])

    //toggles password field visibility
    const passwordVisibility = () => {
        if (isSecureEntry == false) {
            setIsSecureEntry(true);
        } else {
            setIsSecureEntry(false);
        }
    };

    return (
        <>
            {focus &&
                <Text style={styles.alignPlaceholderUp}>
                    {placeholder}
                </Text>
            }
            <View style={[focus ? styles.root1 : styles.root2, rootStyle]}>
                {isForPassword ?
                    <>
                        <TextInput
                            placeholder={focus ? '' : placeholder}
                            value={value}
                            onChangeText={onChangeText}
                            style={[styles.input, style]}
                            onFocus={() => {
                                setFocus(true)
                                onFocus()
                                simpleAnimation()
                            }}
                            onBlur={() => {
                                setFocus(false)
                                onBlur()
                                simpleAnimation()
                            }}
                            secureTextEntry={isSecureEntry}
                            placeholderTextColor={placeholderStyle ? placeholderStyle : colors.veryDarkBlue}
                            keyboardType={keyboardType}
                            returnKeyType={returnKeyType}
                            onSubmitEditing={onEnterPressed}
                            editable={editable}
                        />
                        {
                            isSecureEntry ?
                                <TouchableOpacity onPress={passwordVisibility} activeOpacity={0.7} style={styles.eyeRapper}>
                                    <EyeClose />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={passwordVisibility} activeOpacity={0.7}>
                                    <EyeOpen />
                                </TouchableOpacity>
                        }
                    </>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        {showLeftComponent && LeftComponent && <LeftComponent />}
                        <TextInput
                            placeholder={focus ? '' : placeholder}
                            value={value}
                            onChangeText={onChangeText}
                            style={[styles.input, style]}
                            onFocus={() => {
                                setFocus(true)
                                onFocus()
                                simpleAnimation()
                            }}
                            onBlur={() => {
                                setFocus(false)
                                onBlur()
                                simpleAnimation()
                            }}
                            editable={editable}
                            placeholderTextColor={placeholderStyle ? placeholderStyle : colors.veryDarkBlue}
                            keyboardType={keyboardType}
                            returnKeyType={returnKeyType}
                            onSubmitEditing={onEnterPressed}
                        />
                    </View>
                }
            </View>
        </>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        width: '80%',
        color: colors.veryDarkBlue,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        paddingBottom: 7
    },
    root1: {
        width: '95%',
        height: 55,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderWidth: 1,
        borderColor: colors.teal,
        flexDirection: 'row',
        alignItems: 'center'
    },
    root2: {
        width: '95%',
        height: 55,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.lightGrayishBlue,
        borderWidth: 1,
    },
    eyeRapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    alignPlaceholderUp: {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        marginBottom: -8,
        zIndex: 999,
        alignSelf: 'flex-start',
        marginLeft: 20,
        color: colors.teal,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    },

})