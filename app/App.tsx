import React from 'react'
import { StyleSheet, View, ScrollView, Text, Platform } from 'react-native'
import { Cols, Col } from 'react-native-cols'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    fontSize: 20,
    paddingBottom: 10,
    color: 'black',
  },
  code: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  big: {
    fontSize: 12,
    marginBottom: 15,
  },
  col: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 5,
  },
})

export default () => (
  <ScrollView>
    <View style={styles.screen}>
      <Text style={styles.title}>React Native Cols</Text>
      <Text style={styles.description}>Span</Text>
      <Text style={[styles.code, styles.big]}>
        {'<Col span={n}>'} / {'<Col span="n">'}
      </Text>
      <Cols colStyle={styles.col}>
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
        <Col>
          <Text style={styles.code}></Text>
        </Col>
        <Col span={2}>
          <Text style={styles.code}>span={'{2}'}</Text>
        </Col>
        <Col span={2}>
          <Text style={styles.code}>span={'{2}'}</Text>
        </Col>
      </Cols>
      <Text style={styles.description}>Offset</Text>
      <Text style={[styles.code, styles.big]}>
        {'<Col offset={n}>'} / {'<Col offset="n">'}
      </Text>
      <Cols colStyle={styles.col}>
        <Col span={3} offset={1}>
          <Text style={styles.code}>offset={'{1}'}</Text>
        </Col>
        <Col span={1} offset={2}>
          <Text style={styles.code}>offset={'{2}'}</Text>
        </Col>
      </Cols>
      <Text style={styles.description}>Position</Text>
      <Cols colStyle={styles.col}>
        <Col span={1} left>
          <Text>left</Text>
        </Col>
        <Col span="2" center>
          <Text>center</Text>
        </Col>
        <Col span="1" right>
          <Text>right</Text>
        </Col>
      </Cols>
      <Text style={styles.description}>Columns</Text>
      <Text style={[styles.code, styles.big]}>{'<Cols cols={6}>'}</Text>
      <Cols colStyle={styles.col} cols={6}>
        <Col />
        <Col />
        <Col />
        <Col />
        <Col />
        <Col />
      </Cols>
      <Text style={styles.subtitle}>Debug Mode</Text>
      <Text style={[styles.code, styles.big]}>{'<Cols cols={2} debug>'}</Text>
      <Cols colStyle={styles.col} cols={2} debug>
        <Col left>
          <Text>left</Text>
        </Col>
        <Col right>
          <Text>right</Text>
        </Col>
      </Cols>
      <Text style={styles.subtitle}>Nested Grids</Text>
      <Cols colStyle={styles.col} cols={3}>
        <Col span={2} right>
          <Cols colStyle={styles.col} cols={2} rowSpace={0}>
            <Col left>
              <Text>left</Text>
            </Col>
            <Col right>
              <Text>right</Text>
            </Col>
          </Cols>
        </Col>
        <Col right>
          <Text>right</Text>
        </Col>
      </Cols>
      <Text style={styles.subtitle}>More Examples</Text>
      <Text style={styles.description}>Offset</Text>
      <Cols colStyle={styles.col}>
        <Col span={1}>
          <Text>No offset</Text>
        </Col>
        <Col span={1} offset={2}>
          <Text style={styles.code}>offset={'{2}'}</Text>
        </Col>
        <Col span="1" offset={1}>
          <Text style={styles.code}>offset={'{1}'}</Text>
        </Col>
        <Col span="1" offset={2}>
          <Text style={styles.code}>offset={'{2}'}</Text>
        </Col>
        <Col span={1} offset={3}>
          <Text style={styles.code}>offset={'{3}'}</Text>
        </Col>
        <Col span="3" offset="1">
          <Text style={styles.code}>offset={'"1"'}</Text>
        </Col>
        <Col span="4" offset={2}>
          <Text style={styles.code}>offset={'{2}'}</Text>
        </Col>
        <Col span={1}>
          <Text>No offset</Text>
        </Col>
        <Col span="2" offset={1}>
          <Text style={styles.code}>offset={'{1}'}</Text>
        </Col>
      </Cols>
    </View>
  </ScrollView>
)
