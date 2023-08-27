import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect, FC } from 'react'
import { StyledRoot } from '../../components/molecules'
import Carousel from 'react-native-reanimated-carousel';
import { width, height } from '../../utils/utilityFunctions';
import Slider1 from '../../assets/images/rise_slider1.png'
import Slider2 from '../../assets/images/rise_slider2.png'
import Slider3 from '../../assets/images/rise_slider3.png'
import { SliderRender, IndicatorComponent } from './components';
import { colors } from '../../theme/colors';
import { CustomButton } from '../../components/atoms';
import ArrowLeft from '../../assets/svgs/arrow_left.svg'
import ArrowRight from '../../assets/svgs/arrow_right.svg'
import { Props } from '../../utils/utilityFunctions';
import { STRINGS } from '../../theme/strings';
import { setIsFirstLaunch } from '../../data_storage/local_storage/LocalStorage';

const data = [Slider1, Slider2, Slider3]

const Onboarding: FC<Props> = ({ navigation }) => {
    const [presentIndex, setPresentIndex] = useState<number>(0)
    const scrollRef = useRef(null)

    const moveToNext = () => scrollRef.current.next()
    const moveToPrev = () => { if (presentIndex != 0) scrollRef.current.prev() }

    useEffect(() => { setIsFirstLaunch(false) }, [])

    return (
        <StyledRoot style={presentIndex == 0 ? { backgroundColor: colors.grayishOrange } : presentIndex == 1 ? { backgroundColor: colors.grayishPink } : { backgroundColor: colors.paleCyan }}
            safeAreaStyle={presentIndex == 0 ? { backgroundColor: colors.grayishOrange } : presentIndex == 1 ? { backgroundColor: colors.grayishPink } : { backgroundColor: colors.paleCyan }}
        >
            <View style={{ flex: 0.5, }}>
                <Carousel
                    autoPlayInterval={3000}
                    loop
                    width={width * 0.9}
                    height={height * 0.45}
                    autoPlay={true}
                    data={data}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (<SliderRender item={item} />)}
                    ref={scrollRef}
                    onScrollBegin={() => {
                        setPresentIndex((prevValue: number) => { if (prevValue == 2) { return 0 } else if (prevValue == 0) { return 1 } else { return 2 } })
                    }}
                />
            </View>
            <IndicatorComponent presentIndex={presentIndex} />
            <View style={styles.descView}>
                <Text style={[styles.title]}>
                    {presentIndex == 0 ? STRINGS.QUALITY_ASSETS : presentIndex == 1 ? STRINGS.SUPERIOR_SELECTION : STRINGS.BETTER_PERFORMANCE}
                </Text>
                <Text style={styles.body}>
                    {presentIndex == 0 ?
                        STRINGS.SLIDER_TEXT_1 :
                        presentIndex == 1 ? STRINGS.SLIDER_TEXT_2 :
                            STRINGS.SLIDER_TEXT_3}
                </Text>
            </View>
            {presentIndex != 2 &&
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.goLeft} activeOpacity={0.8} onPress={() => { moveToPrev() }}>
                        <ArrowLeft style={presentIndex == 0 ? { color: colors.darkGrayishBlue } : { color: colors.paleCyan2 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.goRight} activeOpacity={0.8} onPress={() => { moveToNext() }}>
                        <Text style={[styles.next, presentIndex != 0 && { color: colors.paleCyan2 }]}>
                            {STRINGS.NEXT}
                        </Text>
                        <ArrowRight style={presentIndex == 0 ? { color: colors.vividOrange } : { color: colors.paleCyan2 }} />
                    </TouchableOpacity>
                </View>
            }
            {presentIndex == 2 &&
                <View style={styles.bottomView2}>
                    <CustomButton
                        label={STRINGS.SIGNUP}
                        onPress={() => { navigation.navigate('AuthStack', { screen: 'SignupStack' }) }}
                    />
                    <CustomButton
                        label={STRINGS.SIGN_IN}
                        style={{ marginTop: 15, backgroundColor: colors.mostlyDarkBlue }}
                        labelStyle={{ color: colors.teal }}
                        onPress={() => { navigation.navigate('AuthStack', { screen: 'SignInStack' }) }}
                    />
                </View>
            }
        </StyledRoot>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    sliderIndicatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    indicator1: {
        height: 10,
        width: 10,
        borderRadius: 30,
        marginHorizontal: 10
    },
    indicator2: {
        width: 7,
        height: 7,
        backgroundColor: colors.mostlyDarkBlue2,
        borderRadius: 30,
        marginHorizontal: 10
    },
    descView: {
        marginVertical: 50,
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        marginBottom: 10
    },
    body: {
        color: colors.mostlyBlack,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
    },
    bottomView: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    bottomView2: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    goLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 48,
        backgroundColor: colors.mostlyDarkBlue,
        borderRadius: 5
    },
    goRight: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 110,
        height: 48,
        backgroundColor: colors.mostlyDarkBlue,
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    next: {
        color: colors.vividOrange,
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 20,
    }
})