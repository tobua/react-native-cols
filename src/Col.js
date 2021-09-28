import React from 'react'
import { StyleSheet, View } from 'react-native'
import getPosition from './utils/get-position.js'

const createStyles = ({
  width,
  marginLeft,
  marginRight,
  marginBottom,
  debug,
  style,
  ...props
}) => {
  let view = {
    width,
    alignItems: getPosition(props),
    marginLeft,
    marginRight,
    marginBottom,
  }

  if (debug) {
    view.backgroundColor = '#cccccc'
  }
  if (style) {
    view = Object.assign({}, view, style)
  }

  return StyleSheet.create({
    view,
  })
}

export const Col = ({ children, ...props }) => {
  const styles = createStyles(props)

  return <View style={styles.view}>{children}</View>
}
