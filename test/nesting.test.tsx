import React from 'react'
import { Text, View } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { getDefaults } from '../helper'
import { nestedViewWidth } from './constants'

const { colSpace } = getDefaults()

const colWidth = (currentCols: number, localColSpace: number, totalCols: number, width: number) =>
  ((width - localColSpace * (totalCols - 1)) / totalCols) * currentCols +
  (currentCols - 1) * localColSpace

test('Basic nesting is possible.', () => {
  const Grid = (
    <Cols>
      <View>
        <Cols>
          <Text>Nested</Text>
        </Cols>
      </View>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.type).toEqual('View')
  expect(tree.children.length).toEqual(1)
  expect(tree.children[0].children.length).toEqual(1)

  const nested = tree.children[0].children[0]

  expect(nested.type).toEqual('View')

  expect(nested.children.length).toEqual(1)
  expect(nested.children[0].type).toEqual('View')

  expect(nested.children[0].children.length).toEqual(1)

  const col = nested.children[0].children[0]

  expect(col.props.style[0].marginLeft).toEqual(0)
  expect(col.props.style[0].width).toEqual(nestedViewWidth)
  expect(col.props.style[0].marginRight).toEqual(0)
})

test('Cols can be a direct descendant of another Cols.', () => {
  const Grid = (
    <Cols>
      <Cols>
        <Text>Nested</Text>
      </Cols>
    </Cols>
  )

  const tree = renderToTree(Grid)

  const col = tree.children[0].children[0].children[0]

  expect(col.props.style[0].marginLeft).toEqual(0)
  expect(col.props.style[0].width).toEqual(nestedViewWidth)
  expect(col.props.style[0].marginRight).toEqual(0)

  expect(col.children[0].type).toEqual('Text')
})

test('Nested cols get the proper widths.', () => {
  const Grid = (
    <Cols cols={2}>
      <Cols>
        <Col>
          <View />
        </Col>
        <Col span={2}>
          <View />
        </Col>
      </Cols>
      <Cols>
        <Col span={3}>
          <View />
        </Col>
        <Col>
          <View />
        </Col>
      </Cols>
    </Cols>
  )

  const tree = renderToTree(Grid)

  const firstNestedGrid = tree.children[0].children[0]
  const secondNestedGrid = tree.children[1].children[0]

  expect(tree.children.length).toEqual(2)

  expect(firstNestedGrid.props.style[0]).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap',
  })
  expect(secondNestedGrid.props.style[0]).toEqual({
    flexDirection: 'row',
    flexWrap: 'wrap',
  })

  const firstNestedGridFirstCol = firstNestedGrid.children[0]
  const firstNestedGridSecondCol = firstNestedGrid.children[1]

  const secondNestedGridFirstCol = secondNestedGrid.children[0]
  const secondNestedGridSecondCol = secondNestedGrid.children[1]

  expect(firstNestedGridFirstCol.props.style[0].marginLeft).toEqual(0)
  expect(firstNestedGridFirstCol.props.style[0].width).toEqual(
    colWidth(1, colSpace, 4, nestedViewWidth)
  )
  expect(firstNestedGridFirstCol.props.style[0].marginRight).toEqual(colSpace / 2)

  expect(firstNestedGridSecondCol.props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(firstNestedGridSecondCol.props.style[0].width).toEqual(
    colWidth(2, colSpace, 4, nestedViewWidth)
  )
  expect(firstNestedGridSecondCol.props.style[0].marginRight).toEqual(colSpace / 2)

  expect(secondNestedGridFirstCol.props.style[0].marginLeft).toEqual(0)
  expect(secondNestedGridFirstCol.props.style[0].width).toEqual(
    colWidth(3, colSpace, 4, nestedViewWidth)
  )
  expect(secondNestedGridFirstCol.props.style[0].marginRight).toEqual(colSpace / 2)

  expect(secondNestedGridSecondCol.props.style[0].marginLeft).toEqual(colSpace / 2)
  expect(secondNestedGridSecondCol.props.style[0].width).toEqual(
    colWidth(1, colSpace, 4, nestedViewWidth)
  )
  expect(secondNestedGridSecondCol.props.style[0].marginRight).toEqual(0)
})
