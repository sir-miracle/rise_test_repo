import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { StyledRoot } from '../../../components/molecules'
import { Props } from '../../../utils/utilityFunctions';
import { colors } from '../../../theme/colors';
import { CustomButton } from '../../../components/atoms';
import OkkIcon from '../../../assets/svgs/ok_icon.svg'
import { STRINGS } from '../../../theme/strings';

const AccountSuccess: FC<Props> = ({ navigation }) => {
  return (
    <StyledRoot useScrollFlex>
      <View style={styles.top}>
        <OkkIcon />
        <Text style={styles.text1}>{STRINGS.YOU_CREATED_ACCOUNT}</Text>
        <Text style={styles.text2}>{STRINGS.WELCOME_TO_RISE}</Text>
      </View>
      <View style={styles.btnView}>
        <CustomButton
          label={STRINGS.OKAY}
          onPress={() => { navigation.replace('SignInStack') }}
        />
      </View>
    </StyledRoot>
  )
}

export default AccountSuccess

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    marginTop: 50,
    flex: 0.7,
    paddingTop: 35,
    width: '100%'
  },
  btnView: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  text1: {
    color: colors.mostlyBlack,
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 26,
    marginBottom: 10,
    marginTop: 40,
    width: '60%',
    textAlign: 'center'
  },
  text2: {
    color: colors.desaturatedDarkBlue,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    width: '50%',
    textAlign: 'center'
  }
})