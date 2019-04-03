import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { debugBackgroundColor } from './constants'

const createStyles = props => {
  const { width, marginLeft, marginRight, marginBottom, center, right, debug, style } = props

  let view = {
    flex: 0,
    width,
    alignItems: center ? 'center' : right ? 'flex-end' : 'stretch',
    marginLeft,
    marginRight,
    marginBottom
  }

  if (debug) { view.backgroundColor = debugBackgroundColor }

  if (style) { view = Object.assign({}, style, view) }

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
