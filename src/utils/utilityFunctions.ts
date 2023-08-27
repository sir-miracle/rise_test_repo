import { Dimensions, Platform, LayoutAnimation, UIManager } from "react-native"
import Toast from 'react-native-toast-message';

const dimensions = Dimensions.get('window')
export const height = dimensions.height
export const width = dimensions.width

export interface Props {
    navigation?: any,
    route?: any
}
// Validation of email
export const validateEmail = (email: string): boolean => {
    if (email.trim().length > 0) {
        if (/^\w+([\.+-]?\w+)*@\w+([\.+-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
            return true
        }
        else return false
    }
    else return false
}

//check if a string contains a number(s)
export const containsNumbers = (str: string) => { return /\d/.test(str) }

//check if a string contains a Upper case letter
export const isUppercaseIncluded = (str: string) => { return /[A-Z]/.test(str) }

//validate password based on set conditions
export const validatePassword = (password: string) => {
    if (
        isUppercaseIncluded(password) &&
        password.length >= 8 &&
        containsSpecialCharacter(password)
    ) { return true } else { return false }
}

export const containsSpecialCharacter = (str: string) => { return /\p{P}/gu.test(str) }

export const displayToast = (type: 'success' | 'error' | 'info', header: 'SUCCESS' | 'ERROR' | 'INFO', message: string, position: 'bottom' | 'top' = 'bottom') => {
    Toast.hide()
    Toast.show({
        type: type,
        text1: header,
        text2: message,
        position: position,
        visibilityTime: 3000
    });
}

// validate number-only
export const validateNumbers = (value: string) => {
    if (Number.isNaN(Number(value))) {
        return false;
    } else {
        return true;
    }
}

export const formatDecimalAmount = (amount: string, digits = 2) => {
    if (amount == null || amount == undefined) return '0.00'
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: digits,
    });
    const toFormat = Number(amount)  /// 100
    return (formatter.format(toFormat))
}

export const simpleAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
}

export const simpleAnimationsSettings = () => {
    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
    ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}