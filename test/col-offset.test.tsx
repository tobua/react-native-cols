import React from 'react'
import { View } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { getDefaults } from '../helper'
import { viewWidth } from './constants'

const { cols, colSpace } = getDefaults()

const colWidth = (currentCols: number, localColSpace: number) =>
  ((viewWidth - localColSpace * (cols - 1)) / cols) * currentCols +
  (currentCols - 1) * localColSpace

test('Renders a single Col with default span of 1 and an offset of 0.', () => {
  const Grid = (
    <Cols>
      <Col offset={0}>
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

test('Renders a single Col with default span of 1 and an offset of 1.', () => {
  const Grid = (
    <Cols>
      <Col offset={1}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(colWidth(1, colSpace) + colSpace)
  expect(col.props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(col.props.style[0].marginRight).toEqual(colSpace / 2)
})

test('Renders a single Col with a span of 2 and an offset of 2.', () => {
  const Grid = (
    <Cols>
      <Col offset={2} span={2}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(colWidth(2, colSpace) + colSpace)
  expect(col.props.style[0].width).toEqual(colWidth(2, colSpace))
  expect(col.props.style[0].marginRight).toEqual(0)

  expect(
    col.props.style[0].marginLeft + col.props.style[0].width + col.props.style[0].marginRight,
  ).toEqual(viewWidth)
})

test('Renders a single Col with default span of 1 and an offset of 3.', () => {
  const Grid = (
    <Cols>
      <Col offset={3}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(colWidth(3, colSpace) + colSpace)
  expect(col.props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(col.props.style[0].marginRight).toEqual(0)

  expect(
    col.props.style[0].marginLeft + col.props.style[0].width + col.props.style[0].marginRight,
  ).toEqual(viewWidth)
})

test('Too much offset is cut down to max possible value.', () => {
  const Grid = (
    <Cols>
      <Col offset={4}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style[0].marginLeft).toEqual(colWidth(3, colSpace) + colSpace)
  expect(col.props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(col.props.style[0].marginRight).toEqual(0)

  expect(
    col.props.style[0].marginLeft + col.props.style[0].width + col.props.style[0].marginRight,
  ).toEqual(viewWidth)
})

test('Renders a full row with different spans correctly.', () => {
  const Grid = (
    <Cols>
      <Col span={1}>
        <View />
      </Col>
      <Col offset={1} span={2}>
        <View />
      </Col>
      <Col offset={2} span={1}>
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

  expect(tree.children[1].props.style[0].marginLeft).toEqual(
    colWidth(1, colSpace) + colSpace + colSpace / 2,
  )
  expect(tree.children[1].props.style[0].width).toEqual(colWidth(2, colSpace))
  expect(tree.children[1].props.style[0].marginRight).toEqual(0)

  expect(tree.children[2].props.style[0].marginLeft).toEqual(colWidth(2, colSpace) + colSpace)
  expect(tree.children[2].props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(tree.children[2].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[3].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[3].props.style[0].width).toEqual(colWidth(1, colSpace))
  expect(tree.children[3].props.style[0].marginRight).toEqual(0)

  // Fills the full row.
  expect(
    tree.children[0].props.style[0].marginLeft +
      tree.children[0].props.style[0].width +
      tree.children[0].props.style[0].marginRight +
      tree.children[1].props.style[0].marginLeft +
      tree.children[1].props.style[0].width +
      tree.children[1].props.style[0].marginRight,
  ).toEqual(viewWidth)

  expect(
    tree.children[2].props.style[0].marginLeft +
      tree.children[2].props.style[0].width +
      tree.children[2].props.style[0].marginRight +
      tree.children[3].props.style[0].marginLeft +
      tree.children[3].props.style[0].width +
      tree.children[3].props.style[0].marginRight,
  ).toEqual(viewWidth)
})
