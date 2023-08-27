import React, { FC } from 'react'
import { StyleSheet, View, Platform, StatusBar, RefreshControl } from 'react-native'
import { colors } from '../../theme/colors'
import { width } from '../../utils/utilityFunctions'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


interface Props {
  style?: object,
  safeAreaStyle?: object,
  children: any,
  Header?: any,
  enableScroll?: boolean,
  useScrollFlex?: boolean,
  headerRapperStyle?: object,
  contentContainerStyle?: object,
  refreshing?: boolean,
  onRefresh?: () => void,
  canRefresh?: boolean,
  
}
const StyledRoot: FC<Props> = ({
  children,
  style,
  safeAreaStyle,
  Header,
  enableScroll = true,
  useScrollFlex = false,
  headerRapperStyle,
  contentContainerStyle,
  refreshing = false,
  onRefresh = () => { },
  canRefresh = false,
  
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container,
    {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
      safeAreaStyle]}>
      <StatusBar
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.black}
        animated={true} />
      <View style={[styles.header, headerRapperStyle]}>
        {Header && <Header />}
      </View>
      <View style={[styles.root, style]}>
        <KeyboardAwareScrollView
          extraScrollHeight={5}
          extraHeight={5}
          enableOnAndroid
          style={{ width: '100%' }}
          contentContainerStyle={useScrollFlex ? { ...styles.scrollContent, ...{ flex: 1 }, ...contentContainerStyle } : { ...styles.scrollContent, ...contentContainerStyle }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={enableScroll}
          refreshControl={canRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}>
          {children}
        </KeyboardAwareScrollView>
      </View>
    </View>
  )
}

export default StyledRoot

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    paddingHorizontal: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1
  },
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    width: width,
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
})