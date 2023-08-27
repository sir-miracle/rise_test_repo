import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, FC, useContext } from 'react'
import { SecondaryHeader, StyledRoot, NoDataText } from '../../components/molecules'
import { STRINGS } from '../../theme/strings'
import { colors } from '../../theme/colors'
import { Props, height } from '../../utils/utilityFunctions'
import { AppContext } from '../../data_storage/context_api/AppContext';
import { getPlans } from '../../network_services/networks';
import { useQuery } from '@tanstack/react-query';
import { RenderPlans } from '../home/components'

const Plans: FC<Props> = ({ navigation, route }) => {
  const { userLoginData } = useContext(AppContext)
  const [plans, setPlans] = useState([])


  const { refetch: refetchPlans, isLoading: isLoadingPlans } = useQuery(
    [
      'plans',
      {
        token: userLoginData?.token,
      }
    ],
    getPlans,
    {
      onSuccess: (data) => {
        console.log(data?.data, ' lopol')
        if (data?.status == 200) setPlans(data?.data?.items)
      },
      onError: (err: any) => { console.log(err?.response?.data, 'op') }
    });


  return (
    <StyledRoot
      Header={() => <SecondaryHeader
        onBackPress={() => { navigation.goBack() }}
        centerTitle={'Choose from plans'}
      />}
      enableScroll={false}
    >
      <Text style={styles.tap}>Tap on any of the plans to select</Text>
      <View style={styles.flatlistRapper}>
        <FlatList
          data={plans}
          renderItem={({ item }) => <RenderPlans item={item} onPress={(item) => { navigation.navigate('SelectBank', { item }) }} style={styles.plansListRapper} />}
          ListEmptyComponent={() => <NoDataText text='No plans available yet, kindly create a plan.' />}
          numColumns={2}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          refreshing={isLoadingPlans}
          onRefresh={refetchPlans}
        />
      </View>
    </StyledRoot>
  )
}

export default Plans

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