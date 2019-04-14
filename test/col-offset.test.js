import React from 'react'
import { Text } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { getDefaults } from './../src/utils/config'
import { viewWidth } from './constants'

const { cols, colSpace, rowSpace, debug } = getDefaults()

const colWidth = (currentCols, colSpace) => ((viewWidth - colSpace * (cols - 1)) / cols) * currentCols + (currentCols - 1) * colSpace

test('Renders a single Col with default span of 1 and an offset of 0.', () => {
  const Grid = (
    <Cols>
      <Col offset={0} />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style.marginLeft).toEqual(0)
  expect(col.props.style.width).toEqual(colWidth(1, colSpace))
  expect(col.props.style.marginRight).toEqual(colSpace / 2)
})

test('Renders a single Col with default span of 1 and an offset of 1.', () => {
  const Grid = (
    <Cols>
      <Col offset={1} />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style.marginLeft).toEqual(colWidth(1, colSpace) + colSpace)
  expect(col.props.style.width).toEqual(colWidth(1, colSpace))
  expect(col.props.style.marginRight).toEqual(colSpace / 2)
})

test('Renders a single Col with a span of 2 and an offset of 2.', () => {
  const Grid = (
    <Cols>
      <Col offset={2} span={2} />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style.marginLeft).toEqual(colWidth(2, colSpace) + colSpace)
  expect(col.props.style.width).toEqual(colWidth(2, colSpace))
  expect(col.props.style.marginRight).toEqual(0)

  expect(
    col.props.style.marginLeft +
    col.props.style.width +
    col.props.style.marginRight
  ).toEqual(viewWidth)
})

test('Renders a single Col with default span of 1 and an offset of 3.', () => {
  const Grid = (
    <Cols>
      <Col offset={3} />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style.marginLeft).toEqual(colWidth(3, colSpace) + colSpace)
  expect(col.props.style.width).toEqual(colWidth(1, colSpace))
  expect(col.props.style.marginRight).toEqual(0)

  expect(
    col.props.style.marginLeft +
    col.props.style.width +
    col.props.style.marginRight
  ).toEqual(viewWidth)
})

test('Too much offset is cut down to max possible value.', () => {
  const Grid = (
    <Cols>
      <Col offset={4} />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  expect(col.props.style.marginLeft).toEqual(colWidth(3, colSpace) + colSpace)
  expect(col.props.style.width).toEqual(colWidth(1, colSpace))
  expect(col.props.style.marginRight).toEqual(0)

  expect(
    col.props.style.marginLeft +
    col.props.style.width +
    col.props.style.marginRight
  ).toEqual(viewWidth)
})

test('Renders a full row with different spans correctly.', () => {
  const Grid = (
    <Cols>
      <Col span={1} />
      <Col offset={1} span={2} />
      <Col offset={2} span={1} />
      <Col span={1} />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(4)

  expect(tree.children[0].props.style.marginLeft).toEqual(0)
  expect(tree.children[0].props.style.width).toEqual(colWidth(1, colSpace))
  expect(tree.children[0].props.style.marginRight).toEqual(colSpace / 2)

  expect(tree.children[1].props.style.marginLeft).toEqual(colWidth(1, colSpace) + colSpace + colSpace / 2)
  expect(tree.children[1].props.style.width).toEqual(colWidth(2, colSpace))
  expect(tree.children[1].props.style.marginRight).toEqual(0)

  expect(tree.children[2].props.style.marginLeft).toEqual(colWidth(2, colSpace) + colSpace)
  expect(tree.children[2].props.style.width).toEqual(colWidth(1, colSpace))
  expect(tree.children[2].props.style.marginRight).toEqual(colSpace / 2)

  expect(tree.children[3].props.style.marginLeft).toEqual(colSpace / 2)
  expect(tree.children[3].props.style.width).toEqual(colWidth(1, colSpace))
  expect(tree.children[3].props.style.marginRight).toEqual(0)

  // Fills the full row.
  expect(
    tree.children[0].props.style.marginLeft +
    tree.children[0].props.style.width +
    tree.children[0].props.style.marginRight +
    tree.children[1].props.style.marginLeft +
    tree.children[1].props.style.width +
    tree.children[1].props.style.marginRight
  ).toEqual(viewWidth)

  expect(
    tree.children[2].props.style.marginLeft +
    tree.children[2].props.style.width +
    tree.children[2].props.style.marginRight +
    tree.children[3].props.style.marginLeft +
    tree.children[3].props.style.width +
    tree.children[3].props.style.marginRight
  ).toEqual(viewWidth)
})
