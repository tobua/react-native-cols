import React from 'react'
import { Text, Dimensions } from 'react-native'
import { Cols } from 'react-native-cols'
import renderer from 'react-test-renderer'
import { debugBackgroundColor, wrapperStyles } from './../src/constants'

test('Correct defaults without config are applied.', () => {
  const Grid = (
    <Cols>
      <Text>Default</Text>
    </Cols>
  )

  const tree = renderer.create(Grid).toJSON()

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual(wrapperStyles())
  expect(tree.children.length).toEqual(1)

  // Non Col elements are wrapped in a full width Col.
  const col = tree.children[0]

  expect(col.type).toEqual('View')
  expect(col.props.style.width).toEqual(400)
  expect(col.props.style.backgroundColor).not.toBeDefined()

  const text = col.children[0]

  expect(text.type).toEqual('Text')
  expect(text.children[0]).toEqual('Default')
})

test('Debug mode can be set on Cols coloring the cols.', () => {
  const Grid = (
    <Cols debug>
      <Text>Debug</Text>
    </Cols>
  )

  const tree = renderer.create(Grid).toJSON()

  expect(tree.type).toEqual('View')
  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')
  expect(col.props.style.backgroundColor).toEqual(debugBackgroundColor)

  const text = col.children[0]

  expect(text.type).toEqual('Text')
  expect(text.children[0]).toEqual('Debug')
})

test('Global padding around Grid can be set.', () => {
  const Grid = (
    <Cols padding={10}>
      <Text>Padding</Text>
    </Cols>
  )

  const tree = renderer.create(Grid).toJSON()

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0].padding).toEqual(10)
  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')
  expect(col.props.style.width).toEqual(380)
})
