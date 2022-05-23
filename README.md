<p></p>
<p align="center">
  <img src="https://raw.githubusercontent.com/tobua/react-native-cols/main/preview.png" width="400" alt="React Native Cols Preview">
</p>

# React Native Cols

[![npm](https://img.shields.io/npm/v/react-native-cols)](https://npmjs.com/react-native-cols) [![Try in CodeSandbox](https://img.shields.io/badge/Try%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/react-native-cols-35q4s)

Grid for React Native Apps.

## Installation

```
npm i react-native-cols
```

## Usage

```jsx
import React, { Component } from 'react'
import { Text } from 'react-native'
import { Cols, Col } from 'react-native-cols'

class Screen extends Component {
  render() {
    return (
      <Cols>
        <Col>
          <Text>First</Text>
        </Col>
        <Col span={2}>
          <Text>Second</Text>
        </Col>
        <Col>
          <Text>Third</Text>
        </Col>
      </Cols>
    )
  }
}
```

## Props

```jsx
// Wrapper component with possible props and their defaults.
<Cols
  cols={4}
  padding={20}
  colSpace={10}
  rowSpace={15}
  debug={false}
  style={}
  colStyle={}
>
  // Column component with defaults added.
  <Col
    span={1}
    offset={0}
    left={true}
    center={false}
    right={false}
    style={}
  ></Col>
</Cols>
```

### `<Cols />`

The wrapper component sets the defaults for all `<Col />` components wrapped.

`cols` The number of columns per row.

`padding` The padding around the cols.

`colSpace` The horizontal space between cols.

`rowSpace` The vertical space between rows.

`debug` Highlights cols with a light grey background.

`style` Optional styles for the wrapper component.

`colStyle` Optional styles applied to every col, possibly overriding generated
values.

### `<Col />`

The column can be a configured with the following props:

`span` How many columns the current column should take up.

`offset` Empty columns to the left of the current column.

`left/center/right` Denotes how the content should be aligned horizontally.

`style` Optional styles added to the component, possibly overriding generated
values.

## Development

This plugin was build with [create-react-native-plugin](https://github.com/tobua/create-react-native-plugin) please refer to it's documentation on how to run the example app and make changes.
