import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../theme/colors'

interface Props {
  color?: string,
  size?: 'small' | 'large'
}

const LoadingIndicator: FC<Props> = ({ color = colors.white, size = 'small' }) => {
  return (
    <View
      style={styles.root}>
      <ActivityIndicator size={size} color={color} animating={true} />
    </View>
  );
}

export default LoadingIndicator

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  }
})
