import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, FC, useContext } from 'react'
import { SecondaryHeader, StyledRoot, NoDataText } from '../../../components/molecules'
import { STRINGS } from '../../../theme/strings'
import { colors } from '../../../theme/colors'
import { Props, height } from '../../../utils/utilityFunctions'
import { AppContext } from '../../../data_storage/context_api/AppContext';
import { getBanks } from '../../../network_services/networks';
import { useQuery } from '@tanstack/react-query';
import { RenderBanks } from './components'

const SelectBank: FC<Props> = ({ navigation, route }) => {
  const { userLoginData } = useContext(AppContext)
  const [banks, setBanks] = useState([])


  const { refetch, isLoading } = useQuery(
    [
      'banks',
      {
        token: userLoginData?.token,
      }
    ],
    getBanks,
    {
      onSuccess: (data) => {
        console.log(data?.data, ' lopol')
        if (data?.status == 200) setBanks(data?.data)
      },
      onError: (err: any) => { console.log(err?.response?.data, 'op') }
    });


  return (
    <StyledRoot
      Header={() => <SecondaryHeader
        onBackPress={() => { navigation.goBack() }}
        centerTitle={'Select bank'}
      />}
      enableScroll={false}
    >
      {banks?.length > 0 && <Text style={styles.tap}>Tap on any of the plans to select</Text>}
      <View style={styles.flatlistRapper}>
        <FlatList
          data={banks}
          renderItem={({ item }) => <RenderBanks item={item} onPress={(item) => { }} />}
          ListEmptyComponent={() => <NoDataText text='Sorry, no banks available at the moment.' />}
          numColumns={2}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      </View>
    </StyledRoot>
  )
}

export default SelectBank

const styles = StyleSheet.create({

  tap: {
    color: colors.desaturatedDarkBlue,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 20,
  },
  flatlistRapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: height * 0.8,
  },
  plansListRapper: {
    width: '44%',
    height: 208,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 13,
    backgroundColor: colors.verySoftBlue,
    marginBottom: 10
  }
})