import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, Platform } from 'react-native'
import { Cols, Col } from 'react-native-cols'

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
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 20
  },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  big: {
    fontSize: 16,
    marginBottom: 5
  }
})

export default class GridApp extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.screen}>
          <Cols debug>
            <Text style={styles.title}>React Native Cols</Text>
            <Text style={styles.description}>Span</Text>
            <Text style={styles.code}>{'<Col span={n}>'} / {'<Col span="n">'}</Text>
            <Col span={1}>
              <Text style={styles.code}>span={'{1}'}</Text>
            </Col>
            <Col span="2">
              <Text style={styles.code}>span="2"</Text>
            </Col>
            <Col span="1">
              <Text style={styles.code}>span="1"</Text>
            </Col>
            <Col span={3}>
              <Text style={styles.code}>span={'{3}'}</Text>
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
          </Cols>
            {/* <Text style={styles.description}>Offset</Text>
            <Text style={styles.code}>{'<Col offset={n}>'} / {'<Col offset="n">'}</Text>
            <Col span={1}>
              <Text>No offset</Text>
            </Col>
            <Col span={1} offset={2}>
              <Text style={styles.code}>offset={'{2}'}</Text>
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
          </Cols>
          <Text style={styles.subtitle}>Debug Mode</Text>
          <Text style={[styles.code, styles.big]}>{'<Cols cols={2} debug>'}</Text>
          <Cols cols={2} debug>
            <Col left>
              <Text style={styles.code}>left</Text>
            </Col>
            <Col right>
              <Text style={styles.code}>right</Text>
            </Col>
          </Cols>
          <Text style={[styles.code, styles.big]}>{'<Cols cols={6} debug>'}</Text>
          <Cols cols={6} debug>
            <Col span={2}>
              <Text style={styles.code}>span={2}</Text>
            </Col>
            <Col span={4}>
              <Text style={styles.code}>span={4}</Text>
            </Col>
          </Cols>
          <Text style={styles.subtitle}>Nested Grids</Text>
          <Cols cols={2} debug>
            <Col left>
              <Text style={styles.code}>left</Text>
              <Cols cols={2} debug>
                <Col left>
                  <Text style={styles.code}>left</Text>
                </Col>
                <Col right>
                  <Text style={styles.code}>right</Text>
                </Col>
              </Cols>
            </Col>
            <Col right>
              <Text style={styles.code}>right</Text>
            </Col>
          </Cols>
          <Text style={styles.subtitle}>More Examples</Text> */}
        </View>
      </ScrollView>
    )
  }
}
