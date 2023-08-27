import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, FC } from 'react'
import { StyledRoot, SecondaryHeader } from '../../../components/molecules'
import { displayToast, Props } from '../../../utils/utilityFunctions';
import { colors } from '../../../theme/colors';
import { CustomButton, CustomInput, Dropdown, CustomPhoneInput } from '../../../components/atoms';
import CalenderIcon from '../../../assets/svgs/rise_calender.svg'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useMutation } from '@tanstack/react-query'
import { signUp } from "../../../network_services/networks";
import { STRINGS } from '../../../theme/strings';


const MoreAboutYou: FC<Props> = ({ navigation, route }) => {
  const { email, password } = route?.params
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickName, setNickName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  const handleConfirm = useCallback((date: any) => {
    const _date = (new Date(date).toLocaleDateString())
    setDob(_date)
    setDatePickerVisibility(false)
  }, [])

  const { mutate, isLoading } = useMutation(signUp, {
    onSuccess: (data: any) => {
      if (data?.status == 200) {
        navigation.replace('AccountSuccess')
      } else { displayToast("error", "ERROR", STRINGS.ERROR_OCCURRED) }
    },
    onError: (err: any) => {
      if (err?.response?.data?.message != undefined) {
        displayToast("error", "ERROR", err?.response?.data?.message)
        return
      } else { displayToast("error", "ERROR", err?.message) }
    },
  });

  const performSignUp = () => {
    mutate({ email, password, firstName, lastName, phoneNumber: phone, dob })
  }

  return (
    <StyledRoot Header={() => <SecondaryHeader onBackPress={() => navigation.goBack()} />}>
      <View style={styles.top}>
        <Text style={styles.create}>{STRINGS.TELL_US_MORE}</Text>
        <Text style={styles.desc}>
          {STRINGS.USE_NAME_AS_ON_ID}
        </Text>
      </View>
      <View style={styles.detailsRapper}>
        <CustomInput
          placeholder={STRINGS.FIRST_NAME}
          rootStyle={{ marginBottom: 20 }}
          value={firstName}
          onChangeText={(val: string) => setFirstName(val)}
        />
        <CustomInput
          placeholder={STRINGS.LAST_NAME}
          rootStyle={{ marginBottom: 20 }}
          value={lastName}
          onChangeText={(val: string) => setLastName(val)}
        />
        <CustomInput
          placeholder={STRINGS.NICK_NAME}
          rootStyle={{ marginBottom: 20 }}
          value={nickName}
          onChangeText={(val: string) => setNickName(val)}
        />
        <CustomPhoneInput getValue={(value) => setPhone(value)} />
        <Dropdown
          RightComponent={() => <CalenderIcon />}
          value={dob?.length > 0 ? dob : 'Choose date'}
          placeholder={STRINGS.DATE_OF_BIRTH}
          onPress={() => setDatePickerVisibility(true)}
          useRightComponent
        />
        <CustomButton
          label={STRINGS.CONTINUE}
          onPress={() => { performSignUp() }}
          style={{ marginVertical: 30 }}
          loading={isLoading}
          disabled={(firstName?.trim() && lastName?.trim() && dob?.trim() && phone?.trim()) ? false : true}
        />
        <View>
          <Text style={styles.policy}>
            {STRINGS.BY_CLICKING_CONTINUE}
          </Text>
          <Text style={styles.terms}>{STRINGS.TERMS_OF_SERVICE} <Text style={{ color: colors.darkCyan }}>{STRINGS.AND}</Text> {STRINGS.PRIVACY_POLICY}</Text>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        locale="en_GB"
      />
    </StyledRoot>
  )
}

export default MoreAboutYou

const styles = StyleSheet.create({
  top: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
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
    width: '100%',
    marginTop: 8,
    lineHeight: 18,
  },
  detailsRapper: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center'
  },
  policy: {
    color: colors.darkCyan,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  terms: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  }
})