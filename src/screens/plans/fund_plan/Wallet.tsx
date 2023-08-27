import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, FC, useContext } from 'react'
import { SecondaryHeader, StyledRoot, NoDataText } from '../../../components/molecules'
import { CustomButton } from '../../../components/atoms'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import {  Props, height, displayToast } from '../../../utils/utilityFunctions'
import { RenderWalletDetails } from './components'
import ExchangeRateModal from '../../modals/ExchangeRateModal'
import { AppContext } from '../../../data_storage/context_api/AppContext'
import { useQuery } from '@tanstack/react-query'
import { getRates } from '../../../network_services/networks'
import { RatesModel } from '../../../network_services/networkDataModels'



const Wallet: FC<Props> = ({ navigation, route }) => {
  const { userLoginData } = useContext(AppContext)
  const [walletData, setWalletData] = useState<Array<object>>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [rates, setRates] = useState<RatesModel>({})


  const { refetch, isLoading } = useQuery(
    [
      'rates',
      {
        token: userLoginData?.token,
      }
    ],
    getRates,
    {
      onSuccess: (data) => {
        if (data?.status == 200) setRates(data?.data)
      },
      onError: (err: any) => { console.log(err?.response?.data, 'op') }
    });

  return (
    <StyledRoot
      Header={() => <SecondaryHeader
        onBackPress={() => { navigation.goBack() }}
        centerTitle={STRINGS.FUND_WALLET}
        useCancelIcon
      />}
    >
      <View style={styles.flatlistRapper}>
        <FlatList
          data={walletData}
          renderItem={({ item }) => <RenderWalletDetails item={item} />}
          ListEmptyComponent={() => <NoDataText />}
        />
      </View>
      <View style={styles.center}>
        <CustomButton
          label={STRINGS.FUND_WALLET}
          onPress={() => {
            if (rates?.buy_rate || rates?.sell_rate) {
              setOpenModal(true)
            } else {
              displayToast("error", "ERROR", "data for rates not available at this time. Please try again.")
            }
          }}
          style={{ marginTop: 30, width: '96%' }}
        />
      </View>
      <ExchangeRateModal
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
        success={() => {
          setOpenModal(false)
          setTimeout(() => { navigation.navigate('Plans') }, 400)
        }}
        data={rates}
      />
    </StyledRoot>
  )
}

export default Wallet

const styles = StyleSheet.create({
  center: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 60
  },
  top: {
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  questionNum: {
    alignSelf: 'flex-start',
    color: colors.desaturatedDarkBlue,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 20
  },
  question: {
    alignSelf: 'flex-start',
    color: colors.mostlyBlack,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 20,
    marginLeft: 8
  },
  naira: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    paddingTop: 1,
    marginRight: 10
  },
  flatlistRapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.55
  }
})