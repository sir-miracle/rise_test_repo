import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { FC } from 'react';
import Modal from 'react-native-modal';
import { height, width, } from '../../utils/utilityFunctions';
import { colors } from '../../theme/colors';
import Cancel from '../../assets/svgs/cancel_rise.svg'

interface Props {
    modalVisible: boolean,
    closeModal: () => void,
    children: any,
    headerText?: string,
    scrollOffset?: number,
    style?: object,
    isDragToClose?: boolean,
    headerStyle?: object,
    headerTextStyle?: object,
    showClose?: boolean,
    containerStyle?: object,
    scrollEnabled?: boolean,
    cancelView?: object
}
const CustomBottomModal: FC<Props> = ({
    modalVisible,
    closeModal = () => { },
    headerText,
    scrollOffset = 6,
    children,
    style,
    isDragToClose = true,
    headerStyle,
    headerTextStyle,
    showClose = true,
    containerStyle,
    scrollEnabled = true,
    cancelView,
}) => {
    const Content = () => (
        <>
            <View style={[styles.top, headerStyle]}>
                {showClose &&
                    <TouchableOpacity
                        style={[styles.btnView, cancelView]}
                        onPress={closeModal}
                    >
                        <Cancel />
                    </TouchableOpacity>
                }
                <Text style={[styles.header, headerTextStyle]}>
                    {headerText}
                </Text>
                <View />
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollStyle}
                scrollEnabled={scrollEnabled}
            >
                {children}
            </ScrollView>
        </>
    )
    return (
        <Modal
            avoidKeyboard
            animationOut={'zoomOutUp'}
            isVisible={modalVisible}
            coverScreen={true}
            backdropOpacity={0.3}
            onSwipeComplete={closeModal}
            swipeDirection={isDragToClose ? ['down'] : []}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}
            scrollOffset={scrollOffset}
            propagateSwipe={true}
            style={[styles.modalRoot, style]}>
            <View style={[styles.root, containerStyle]}>
                <Content />
            </View>
        </Modal>
    );
};

export default CustomBottomModal;

const styles = StyleSheet.create({
    top: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 8
    },
    root: {
        width: width,
        minHeight: height * 0.3,
        backgroundColor: colors.white,
        marginHorizontal: 50,
        borderRadius: 20,
        paddingBottom: 20,
        paddingTop: 10,
    },
    modalRoot: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    btnView: {
        width: 30,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.mostlyDarkBlue
    },
    header: {
        color: colors.black,
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 18,
    },
    scrollStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25
    }
});
