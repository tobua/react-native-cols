import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import addColWidth from './utils/add-col-width'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default class Grid extends Component {
  render() {
    const children = addColWidth(this.props.children)

    return (
      <View style={styles.screen}>
        {children}
      </View>
    )
  }
}
