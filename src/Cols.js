import React, { Component, createContext } from 'react'
import { StyleSheet, View } from 'react-native'
import enhanceChildren from './enhance-children'
import { setConfig } from './utils/config'
import { wrapperStyles } from './constants'

const getStyles = config => {
  const screen = wrapperStyles()

  if (config.padding) { screen.padding = config.padding }

  return StyleSheet.create({
    screen
  })
}

export default class Cols extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // Get the available width after first rendering am empty view.
  onLayout = event => {
    if (this.state.width) return
    let { width } = event.nativeEvent.layout
    this.setState({ width })
  }

  render() {
    const { style, children } = this.props
    const { width } = this.state

    // Return an empty View first, to measure the width after it's rendered.
    if (!width) return <View style={{ width: '100%' }} onLayout={this.onLayout} />

    const config = setConfig(this.props, width)
    const styles = getStyles(config)
    const enhancedChildren = enhanceChildren(children, this.props)

    return (
      <View style={[styles.screen, style]}>
        {enhancedChildren}
      </View>
    )
  }
}
