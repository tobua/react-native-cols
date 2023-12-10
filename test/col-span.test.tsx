import React from 'react'
import { Text, View } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { getDefaults } from '../helper'
import { viewWidth } from './constants'

const { cols, colSpace } = getDefaults()

const colWidth = (currentCols: number, localColSpace: number) =>
  ((viewWidth - localColSpace * (cols - 1)) / cols) * currentCols +
  (currentCols - 1) * localColSpace

test('Renders a single Col with default span of 1.', () => {
  const Grid = (
    <Cols>
      <Col>
        <Text>Col</Text>
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(0)
  expect(col.props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(col.props.style[0].marginRight).toEqual(colSpace / 2)
  expect(col.children.length).toEqual(1)

  const text = col.children[0]

  expect(text.type).toEqual('Text')
  expect(text.children[0]).toEqual('Col')
})

test('Renders a single Col with span of 1.', () => {
  const Grid = (
    <Cols>
      <Col span={1}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(0)
  expect(col.props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(col.props.style[0].marginRight).toEqual(colSpace / 2)
})

test("Renders a row of Col's with span of 1.", () => {
  const Grid = (
    <Cols>
      <Col span={1}>
        <View />
      </Col>
      <Col span={1}>
        <View />
      </Col>
      <Col span={1}>
        <View />
      </Col>
      <Col span={1}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(4)

  expect(tree.children[0].props.style[0].marginLeft).toEqual(0)
  expect(tree.children[0].props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(tree.children[0].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[1].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[1].props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(tree.children[1].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[2].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[2].props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(tree.children[2].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[3].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[3].props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(tree.children[3].props.style[0].marginRight).toEqual(0)
})

test('Renders a single Col with span as string.', () => {
  const Grid = (
    <Cols>
      <Col span="1">
        <Text>Col</Text>
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(0)
  expect(col.props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(col.props.style[0].marginRight).toEqual(colSpace / 2)
})

test('Renders a single Col with span of 2.', () => {
  const Grid = (
    <Cols>
      <Col span={2}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(0)
  expect(col.props.style[0].width).toEqual(colWidth(2, colSpace))
  expect(col.props.style[0].marginRight).toEqual(colSpace / 2)
})

test('Renders a single Col with span of 3.', () => {
  const Grid = (
    <Cols>
      <Col span={3}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(0)
  expect(col.props.style[0].width).toEqual(colWidth(3, colSpace))
  expect(col.props.style[0].marginRight).toEqual(colSpace / 2)
})

test('Renders a single Col with span of 4.', () => {
  const Grid = (
    <Cols>
      <Col span={4}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(0)
  expect(col.props.style[0].width).toEqual(colWidth(4, colSpace))
  expect(col.props.style[0].width).toEqual(viewWidth)
  expect(col.props.style[0].marginRight).toEqual(0)
})

test('Renders a full row with different spans correctly.', () => {
  const Grid = (
    <Cols>
      <Col span={1}>
        <View />
      </Col>
      <Col span={2}>
        <View />
      </Col>
      <Col span={1}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(3)

  expect(tree.children[0].props.style[0].marginLeft).toEqual(0)
  expect(tree.children[0].props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(tree.children[0].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[1].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[1].props.style[0].width).toEqual(colWidth(2, colSpace))
  expect(tree.children[1].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[2].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[2].props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(tree.children[2].props.style[0].marginRight).toEqual(0)

  // Fills the full row.
  expect(
    tree.children[0].props.style[0].marginLeft +
      tree.children[0].props.style[0].width +
      tree.children[0].props.style[0].marginRight +
      tree.children[1].props.style[0].marginLeft +
      tree.children[1].props.style[0].width +
      tree.children[1].props.style[0].marginRight +
      tree.children[2].props.style[0].marginLeft +
      tree.children[2].props.style[0].width +
      tree.children[2].props.style[0].marginRight,
  ).toEqual(viewWidth)
})
