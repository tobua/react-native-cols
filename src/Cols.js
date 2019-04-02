import React, { Component, createContext } from 'react'
import { StyleSheet, View } from 'react-native'
import enhanceChildren from './enhance-children'
import createConfig from './utils/create-config'
import { wrapperStyles } from './constants'

const getStyles = config => {
  const screen = wrapperStyles()

  if (config.padding) screen.padding = config.padding

  return StyleSheet.create({
    screen
  })
}

export default class Cols extends Component {
  render() {
    const { style } = this.props
    const children = this.props.children
    const config = createConfig(this.props)
    const styles = getStyles(config)
    const enhancedChildren = enhanceChildren(children, config)

    return (
      <View style={[styles.screen, style]}>
        {enhancedChildren}
      </View>
    )
  }
}
