# React Native Cols

Grid for React Native Apps.

## Installation

```
npm i react-native-cols
```

## Usage

```js
import React, { Component } from 'react'
import { Cols, Col } from 'react-native-cols'

class Screen extends Component {
  render() {
    return (
      <Cols cols="2">
        <Col><Text>First</Text></Col>
        <Col><Text>Second</Text></Col>
      </Cols>
    )
  }
}
```

## Props

```js
// Wrapper component with possible props and their defaults.
<Cols
  cols={4}
  padding={20}
  colSpace={10}
  rowSpace={15}
  debug={false}
  style={}
>
  // Column component with defaults added.
  <Col
    span={1}
    offset={0}
    left={true}
    center={false}
    right={false}
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

### `<Col />`

The column can be a configured with the following props:

`span` How many columns the current column should take up.

`offset` Empty columns to the left of the current column.

`left/center/right` Denotes how the content should be aligned horizontally.

`style` Optional styles added to the component, possibly overriding generated
values.

## Running the Example App

To create a fresh React Native app with the example seen in the screenshot on
top clone this repository and run the following.

```
npm install
npm run app
cd app
react-native run-ios
```
