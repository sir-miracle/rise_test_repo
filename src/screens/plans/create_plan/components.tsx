import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../../theme/colors'
import { width } from '../../../utils/utilityFunctions';
import * as Progress from 'react-native-progress';
import { SvgProps } from 'react-native-svg';

interface OptionsProps {
    title?: string,
    desc?: string,
    Icon?: FC<SvgProps>
}

export const Options: FC<OptionsProps> = ({ title = '', desc = '', Icon }) => {
    return (
        <View style={styles.optionsView}>
            <View style={styles.iconRapper}>
                {Icon && <Icon />}
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.desc}>
                    {desc}
                </Text>
            </View>
        </View>
    )
}

export const ProgressComponent = ({ progress = 0 }) => {
    return (
        <View style={styles.progressView}>
            <Progress.Bar
                color={colors.teal}
                progress={progress}
                unfilledColor={colors.mostlyDarkBlue}
                borderWidth={0}
                height={9}
                width={width * 0.9}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    optionsView: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20
    },
    iconRapper: {
        width: 35,
        height: 35,
        borderRadius: 40,
        backgroundColor: colors.mostlyDarkBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        width: '90%',
        justifyContent: 'center',
        marginLeft: 20,
    },
    title: {
        color: colors.mostlyBlack,
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 20,
        marginBottom: 10,
        width: '90%',
    },
    desc: {
        color: colors.desaturatedDarkBlue,
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        width: '95%',
    },
    progressView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})