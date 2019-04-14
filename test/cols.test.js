import React from 'react'
import { Text } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { wrapperStyles } from './../src/constants'
import { getDefaults } from './../src/utils/config'
import { viewWidth } from './constants'

const { colSpace, rowSpace, debug } = getDefaults()

const colWidth = (currentCols, colSpace, totalCols) => ((viewWidth - colSpace * (totalCols - 1)) / totalCols) * currentCols + (currentCols - 1) * colSpace

test('Renders empty Cols correctly.', () => {
  const Grid = <Cols />

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual(wrapperStyles())
  expect(tree.children).toEqual(null)
})

test('Cols accepts a style prop that will be added to the main View.', () => {
  const style = { color: 'red' }
  const Grid = <Cols style={style}></Cols>

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[1]).toEqual(style)
  expect(tree.children).toEqual(null)
})

test('rowSpace defaults work properly.', () => {
  const Grid = (
    <Cols>
      <Text>ColStyle</Text>
      <Col span={4} />
      <Col />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual(wrapperStyles())

  expect(tree.children.length).toEqual(3)

  expect(tree.children[0].props.style.marginBottom).toEqual(rowSpace)
  expect(tree.children[1].props.style.marginBottom).toEqual(rowSpace)
  // Should last row really have rowSpace added?
  expect(tree.children[2].props.style.marginBottom).toEqual(rowSpace)
})

test('Renders three cols with cols set to 3 correctly.', () => {
  const cols = 3
  const Grid = (
    <Cols cols={cols}>
      <Col span={1} />
      <Col span={1} />
      <Col span={1} />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(3)

  expect(tree.children[0].props.style.marginLeft).toEqual(0)
  expect(tree.children[0].props.style.width).toEqual(colWidth(1, colSpace, cols))
  expect(tree.children[0].props.style.marginRight).toEqual(colSpace / 2)

  expect(tree.children[1].props.style.marginLeft).toEqual(colSpace / 2)
  expect(tree.children[1].props.style.width).toEqual(colWidth(1, colSpace, cols))
  expect(tree.children[1].props.style.marginRight).toEqual(colSpace / 2)

  expect(tree.children[2].props.style.marginLeft).toEqual(colSpace / 2)
  expect(tree.children[2].props.style.width).toEqual(colWidth(1, colSpace, cols))
  expect(tree.children[2].props.style.marginRight).toEqual(0)
})

test('Renders three cols with cols set to 3 correctly.', () => {
  const cols = 7
  const Grid = (
    <Cols cols={cols}>
      <Col span={2} />
      <Col span={3} />
      <Col offset={1} span={1} />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(3)

  expect(tree.children[0].props.style.marginLeft).toEqual(0)
  expect(tree.children[0].props.style.width).toEqual(colWidth(2, colSpace, cols))
  expect(tree.children[0].props.style.marginRight).toEqual(colSpace / 2)

  expect(tree.children[1].props.style.marginLeft).toEqual(colSpace / 2)
  expect(tree.children[1].props.style.width).toEqual(colWidth(3, colSpace, cols))
  expect(tree.children[1].props.style.marginRight).toEqual(colSpace / 2)

  expect(tree.children[2].props.style.marginLeft).toEqual(colWidth(1, colSpace, cols) + colSpace + colSpace / 2)
  expect(tree.children[2].props.style.width).toEqual(colWidth(1, colSpace, cols))
  expect(tree.children[2].props.style.marginRight).toEqual(0)

  // Fills the full row.
  expect(
    tree.children[0].props.style.marginLeft +
    tree.children[0].props.style.width +
    tree.children[0].props.style.marginRight +
    tree.children[1].props.style.marginLeft +
    tree.children[1].props.style.width +
    tree.children[1].props.style.marginRight +
    tree.children[2].props.style.marginLeft +
    tree.children[2].props.style.width +
    tree.children[2].props.style.marginRight
  ).toEqual(viewWidth)
})
