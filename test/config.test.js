import React from 'react'
import { Text } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { getDefaults } from './../src/utils/config'

const { cols, colSpace, rowSpace, debug } = getDefaults()

test('Correct defaults without config are applied.', () => {
  const Grid = (
    <Cols>
      <Text>Default</Text>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap',
  })
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

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')
  expect(col.props.style.backgroundColor).toEqual('#cccccc')

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

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0].padding).toEqual(10)
  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')
  expect(col.props.style.width).toEqual(380)
})

test('Cols style is added to the wrapper.', () => {
  const style = { borderWidth: 1, borderColor: 'red' }
  const Grid = (
    <Cols style={style}>
      <Text>Style</Text>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[1]).toEqual(style)
})

test('colStyle is added to wrapped Col.', () => {
  const style = { borderWidth: 1, borderColor: 'red' }
  const Grid = (
    <Cols colStyle={style}>
      <Text>ColStyle</Text>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap',
  })
  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')
  expect(col.props.style.borderWidth).toEqual(style.borderWidth)
  expect(col.props.style.borderColor).toEqual(style.borderColor)
})

test('colSpace and rowSpace can be configured.', () => {
  const currentColSpace = 12
  const currentRowSpace = 13
  const Grid = (
    <Cols colSpace={currentColSpace} rowSpace={currentRowSpace}>
      <Text>ColStyle</Text>
      <Col span={4} />
      <Col />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap',
  })

  expect(tree.children.length).toEqual(3)

  expect(tree.children[0].props.style.marginBottom).toEqual(currentRowSpace)
  expect(tree.children[1].props.style.marginBottom).toEqual(currentRowSpace)
  // Should last row really have rowSpace added?
  expect(tree.children[2].props.style.marginBottom).toEqual(currentRowSpace)
})
