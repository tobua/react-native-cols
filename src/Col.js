import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { debugBackgroundColor } from './constants'
import getPosition from './utils/get-position'

const createStyles = props => {
  const { width, marginLeft, marginRight, marginBottom, debug, style } = props

  let view = {
    width,
    alignItems: getPosition(props),
    marginLeft,
    marginRight,
    marginBottom
  }

  if (debug) { view.backgroundColor = debugBackgroundColor }
  if (style) { view = Object.assign({}, view, style) }

  return StyleSheet.create({
    view
  })
}

export default class Col extends Component {
  render() {
    const { children } = this.props
    const styles = createStyles(this.props)

    return (
      <View style={styles.view}>
        {children}
      </View>
    )
  }
}
