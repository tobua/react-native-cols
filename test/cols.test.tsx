import React from 'react'
import { Text, View } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { getDefaults } from '../helper'
import { viewWidth } from './constants'

const { colSpace, rowSpace } = getDefaults()

const colWidth = (currentCols: number, localColSpace: number, totalCols: number) =>
  ((viewWidth - localColSpace * (totalCols - 1)) / totalCols) * currentCols +
  (currentCols - 1) * localColSpace

test('Renders empty Cols correctly.', () => {
  const Grid = (
    <Cols>
      <View />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap',
  })
  expect(tree.children.length).toEqual(1)
})

test('Cols accepts a style prop that will be added to the main View.', () => {
  const style = { backgroundColor: 'red' }
  const Grid = (
    <Cols style={style}>
      <View />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[1]).toEqual(style)
  expect(tree.children.length).toEqual(1)
})

test('rowSpace defaults work properly.', () => {
  const Grid = (
    <Cols>
      <Text>ColStyle</Text>
      <Col span={4}>
        <View />
      </Col>
      <Col>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap',
  })

  expect(tree.children.length).toEqual(3)

  expect(tree.children[0].props.style[0].marginBottom).toEqual(rowSpace)
  expect(tree.children[1].props.style[0].marginBottom).toEqual(rowSpace)
  // Should last row really have rowSpace added?
  expect(tree.children[2].props.style[0].marginBottom).toEqual(rowSpace)
})

test('Renders three cols with cols set to 3 correctly.', () => {
  const cols = 3
  const Grid = (
    <Cols cols={cols}>
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

  expect(tree.children.length).toEqual(3)

  expect(tree.children[0].props.style[0].marginLeft).toEqual(0)
  expect(tree.children[0].props.style[0].width).toEqual(colWidth(1, colSpace, cols))
  expect(tree.children[0].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[1].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[1].props.style[0].width).toEqual(colWidth(1, colSpace, cols))
  expect(tree.children[1].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[2].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[2].props.style[0].width).toEqual(colWidth(1, colSpace, cols))
  expect(tree.children[2].props.style[0].marginRight).toEqual(0)
})

test('Renders three cols with cols set to 7 correctly.', () => {
  const cols = 7
  const Grid = (
    <Cols cols={cols}>
      <Col span={2}>
        <View />
      </Col>
      <Col span={3}>
        <View />
      </Col>
      <Col offset={1} span={1}>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(3)

  expect(tree.children[0].props.style[0].marginLeft).toEqual(0)
  expect(tree.children[0].props.style[0].width).toEqual(colWidth(2, colSpace, cols))
  expect(tree.children[0].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[1].props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(tree.children[1].props.style[0].width).toEqual(colWidth(3, colSpace, cols))
  expect(tree.children[1].props.style[0].marginRight).toEqual(colSpace / 2)

  expect(tree.children[2].props.style[0].marginLeft).toEqual(
    colWidth(1, colSpace, cols) + colSpace + colSpace / 2
  )
  expect(tree.children[2].props.style[0].width).toEqual(colWidth(1, colSpace, cols))
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
      tree.children[2].props.style[0].marginRight
  ).toEqual(viewWidth)
})
