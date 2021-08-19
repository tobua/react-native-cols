import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import enhanceChildren from './enhance-children'
import { setConfig } from './utils/config'

const getStyles = (config) => {
  const screen = { flexDirection: 'row', flexWrap: 'wrap' }

  if (config.padding) {
    screen.padding = config.padding
  }

  return StyleSheet.create({
    screen,
  })
}

const useComponentSize = () => {
  const [size, setSize] = useState({})

  const onLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  return [size, onLayout]
}

export const Cols = ({ style, children, ...props }) => {
  const [size, onLayout] = useComponentSize()

  // Return an empty View first, to measure the width after it's rendered.
  if (!size.width) return <View style={{ width: '100%' }} onLayout={onLayout} />

  const config = setConfig(props, size.width)
  const styles = getStyles(config)
  const enhancedChildren = enhanceChildren(children, props)

  return <View style={[styles.screen, style]}>{enhancedChildren}</View>
}
