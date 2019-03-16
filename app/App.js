import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Grid, Col } from 'react-native-cols'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 25
  }
})

export default class GridApp extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Grid>
          <Text style={styles.title}>React Native Cols</Text>
          <Text style={styles.description}>Span</Text>
          <Col span={1}>
            <Text>Col span 1</Text>
          </Col>
          <Col span="2">
            <Text>Col span 2</Text>
          </Col>
          <Col span="1">
            <Text>Col span 1</Text>
          </Col>
          <Col span={3}>
            <Text>Col span 3</Text>
          </Col>
          <Col span="1">
            <Text>Col span 1</Text>
          </Col>
          <Col span={4}>
            <Text>Col span 4</Text>
          </Col>
          <Col span="2">
            <Text>Col span 2</Text>
          </Col>
          <Col span="2">
            <Text>Col span 2</Text>
          </Col>
          <Text style={styles.description}>Offset</Text>
          <Col span={1}>
            <Text>offset 0</Text>
          </Col>
          <Col span={1} offset={2}>
            <Text>offset 2</Text>
          </Col>
          <Col span="1" offset={1}>
            <Text>offset 1</Text>
          </Col>
          <Col span="1" offset={2}>
            <Text>offset 2</Text>
          </Col>
          <Col span={1} offset={3}>
            <Text>offset 3</Text>
          </Col>
          <Col span="3" offset="1">
            <Text>offset 1</Text>
          </Col>
          <Col span="4" offset={2}>
            <Text>offset 2 ignored</Text>
          </Col>
          <Col span={1}>
            <Text>offset 0</Text>
          </Col>
          <Col span="2" offset={1}>
            <Text>offset 1</Text>
          </Col>
          <Text style={styles.description}>Position</Text>
          <Col span={1}>
            <Text>default</Text>
          </Col>
          <Col span="2" center>
            <Text>center</Text>
          </Col>
          <Col span="1" right>
            <Text>right</Text>
          </Col>
        </Grid>
      </View>
    )
  }
}
