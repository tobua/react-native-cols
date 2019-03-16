import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import config from './utils/config'

const createStyles = props => {
  const { width, marginLeft, marginRight, marginBottom, center, right } = props

  return StyleSheet.create({
    view: {
      flex: 0,
      width,
      alignItems: center ? 'center' : right ? 'flex-end' : 'stretch',
      marginLeft,
      marginRight,
      marginBottom,
      backgroundColor: config.debug ? 'gray' : undefined
    }
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
