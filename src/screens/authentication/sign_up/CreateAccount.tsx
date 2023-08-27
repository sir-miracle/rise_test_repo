import { StyleSheet, Text, View } from 'react-native'
import React, { useState, FC } from 'react'
import { StyledRoot, SecondaryHeader } from '../../../components/molecules'
import { validateEmail, validatePassword, isUppercaseIncluded, containsSpecialCharacter, Props } from '../../../utils/utilityFunctions';
import { colors } from '../../../theme/colors';
import { CustomButton, CustomInput } from '../../../components/atoms';
import { CheckBoxComponent } from './components';
import { STRINGS } from '../../../theme/strings';


const CreateAccount: FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')


  return (
    <StyledRoot Header={() => <SecondaryHeader onBackPress={() => navigation.goBack()} />}>
      <View style={styles.top}>
        <Text style={styles.create}>{STRINGS.CREATE_ACCOUNT}</Text>
        <Text style={styles.desc}>
          {STRINGS.START_BUILDING_YOUR_PORTFOLIO}
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
      <View style={styles.indicatorView}>
        <CheckBoxComponent details={STRINGS.MINIMUM_CHARACTERS} isChecked={password.length >= 8} />
        <CheckBoxComponent details={STRINGS.ONE_UPPER_CASE} isChecked={isUppercaseIncluded(password)} />
        <CheckBoxComponent details={STRINGS.ONE_UNIQUE_CHARACTER} isChecked={containsSpecialCharacter(password)} />
      </View>
      <CustomButton
        label={STRINGS.SIGNUP}
        onPress={() => { navigation.navigate('MoreAboutYou', { email, password }) }}
        disabled={!(validateEmail(email) && validatePassword(password))}
      />
    </StyledRoot>
  )
}

export default CreateAccount

const styles = StyleSheet.create({
  inputView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  indicatorView: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20
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
    width: '80%',
    marginTop: 8,
    lineHeight: 18,
  }
})