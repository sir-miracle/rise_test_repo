import React, { FC, memo } from 'react'
import CustomBottomModal from '../../components/organisms/CustomBottomModal'
import { STRINGS } from '../../theme/strings'
import { CustomButton } from '../../components/atoms'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../theme/colors'
import { RatesModel } from '../../network_services/networkDataModels'

interface Props {
    openModal: boolean,
    setOpenModal: () => void,
    success: () => void,
    data: RatesModel
}

const ExchangeRateModal: FC<Props> = ({ openModal, setOpenModal = () => { }, success = () => { }, data }) => {

    return (
        <CustomBottomModal
            modalVisible={openModal}
            closeModal={setOpenModal}
            headerText={STRINGS.ABOUT_EXCHANGE_RATES}
        >
            <View style={styles.root}>
                <View style={styles.item}>
                    <View>
                        <Text style={styles.buy}>{STRINGS.USD_BUY_RATE}</Text>
                        <Text style={styles.sell}>{STRINGS.WE_BUY_USD}</Text>
                    </View>
                    <Text style={styles.rate}>₦{data?.buy_rate}</Text>
                </View>
                <View style={styles.item}>
                    <View>
                        <Text style={styles.buy}>{STRINGS.USD_SELL_RATE}</Text>
                        <Text style={styles.sell}>{STRINGS.CURRENT_VALUE_IN_NAIRA}</Text>
                    </View>
                    <Text style={styles.rate}>₦{data?.sell_rate}</Text>
                </View>
            </View>
            <Text style={styles.desc}>
                {STRINGS.THESE_EXCHANGE_RATES_ARE_PROVIDED_BY_THIRD_PARTIES}
            </Text>
            <CustomButton
                label={STRINGS.ACCEPT_AND_CONTINUE}
                onPress={() => { success() }}
                style={{ marginVertical: 30 }}
            />
        </CustomBottomModal>
    )
}

export default memo(ExchangeRateModal)

const styles = StyleSheet.create({
    root: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    item: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 5
    },
    desc: {
        color: '#838F91',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        textAlign: 'justify'
    },
    buy: {
        color: colors.mostlyBlack,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    rate: {
        color: colors.mostlyBlack,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    sell: {
        color: colors.desaturatedDarkBlue,
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 30,
    }
})
