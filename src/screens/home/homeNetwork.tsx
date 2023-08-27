import React, { useState, useContext } from 'react'
import { getUserSession, getPlans, getQuotes } from '../../network_services/networks';
import { useQuery } from '@tanstack/react-query';
import { QuotesModel, PlansDataModel } from '../../network_services/networkDataModels';
import { AppContext } from '../../data_storage/context_api/AppContext';

const useHomeNetwork = () => {
    const { userLoginData, setUserWholeDetails } = useContext(AppContext)
    const [quotes, setQuotes] = useState<QuotesModel>({})
    const [plans, setPlans] = useState<Array<PlansDataModel>>([])

    const { refetch, isLoading } = useQuery(
        [
            'user_data',
            {
                token: userLoginData?.token,
            }
        ],
        getUserSession,
        {
            onSuccess: (data) => { if (data?.status == 200) setUserWholeDetails(data?.data) },
            onError: (err: any) => { console.log(err) }
        });

    const { refetch: refetchQuotes, isLoading: isLoadingQuotes } = useQuery(
        [
            'quotes',
            {
                token: userLoginData?.token,
            }
        ],
        getQuotes,
        {
            onSuccess: (data) => {
                if (data?.status == 200) setQuotes(data?.data)
            },
            onError: (err: any) => { console.log(err?.response?.data) }
        });


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
                if (data?.status == 200) setPlans(data?.data?.items)
            },
            onError: (err: any) => { console.log(err?.response?.data) }
        });

    return [quotes, plans, userLoginData]
}


export default useHomeNetwork 