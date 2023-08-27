import { ImageBackgroundProps, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native'
import React, { FC } from 'react'
import Bg from '../../assets/images/rise_bg2.png'
import { width } from '../../utils/utilityFunctions'

interface Props {
    CenterCompoent?: any,
    LeftComponent?: any,
    showLeftComponent?: boolean,
    showCenterComponent?: boolean
    RightComponent?: any,
    showRightComponent?: boolean,
    style?: object,
    useImageBg?: boolean,
    ImageBg?: ImageSourcePropType,
    useFullWidth?: boolean
}
const PrimaryHeader: FC<Props> = ({
    CenterCompoent,
    LeftComponent,
    RightComponent,
    showLeftComponent = true,
    showRightComponent = true,
    showCenterComponent = true,
    style,
    useImageBg = false,
    ImageBg,
    useFullWidth = false
}) => {
    return (
        <>
            {useImageBg ?
                <ImageBackground style={[styles.root, useFullWidth && { width, paddingVertical: 20, paddingTop: 20 }, style]}
                    source={ImageBg}
                >
                    {showLeftComponent && LeftComponent && <LeftComponent />}
                    {showCenterComponent && CenterCompoent && <CenterCompoent />}
                    {showRightComponent && RightComponent && <RightComponent />}
                </ImageBackground>
                :
                <View style={[styles.root, style]}>
                    {showLeftComponent && LeftComponent && <LeftComponent />}
                    {showCenterComponent && CenterCompoent && <CenterCompoent />}
                    {showRightComponent && RightComponent && <RightComponent />}
                </View>
            }
        </>
    )
}

export default PrimaryHeader

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingHorizontal: 10,
    }
})