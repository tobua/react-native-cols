import React, { useState, useCallback, ReactElement } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native'
import enhanceChildren from './enhance-children'
import { createConfig, createColStyles, screenStyles } from './helper'
import { Config, ColProps, ColPosition } from './types'

export { setDefaults, getDefaults } from './helper'

export const Col = ({
  children,
  style,
  ...props
}: ColProps & Partial<Config> & Partial<ColPosition>) => {
  const styles = createColStyles(props)

  return <View style={[styles.view, style]}>{children}</View>
}

const styles = StyleSheet.create({
  initialFullWidth: {
    width: '100%',
  },
})

const useComponentSize = () => {
  const [size, setSize] = useState<{ width?: number; height?: number }>({})

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    // react-native-web will round values in some cases causing wrap, e.g. for nested grid.
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  return { size, onLayout }
}

interface ColsProps {
  style?: StyleProp<ViewStyle>
  children: ReactElement[] | ReactElement
  colStyle?: StyleProp<ViewStyle>
}

export const Cols = ({ style, children, ...props }: ColsProps & Partial<Config>) => {
  const { size, onLayout } = useComponentSize()

  // Return an empty View first, to measure the width after it's rendered.
  if (!size.width) {
    return <View style={styles.initialFullWidth} onLayout={onLayout} />
  }

  const config = createConfig(props, size.width)
  const enhancedChildren = enhanceChildren(
    Array.isArray(children) ? children : [children],
    props,
    config,
  )

  return <View style={[screenStyles(config), style]}>{enhancedChildren}</View>
}
