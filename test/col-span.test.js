import React from 'react'
import { Text } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { getDefaults } from './../src/utils/create-config'
import { viewWidth } from './constants'

const { cols, colSpace, rowSpace, debug } = getDefaults()

test('Renders a single Col with default span of 1.', () => {
  const Grid = (
    <Cols>
      <Col><Text>Col</Text></Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(1)

  const col = tree.children[0]

  expect(col.type).toEqual('View')

  const singleColWidth = (viewWidth - colSpace * 3) / cols

  expect(col.props.style.width).toEqual(singleColWidth)
  expect(col.children.length).toEqual(1)

  const text = col.children[0]

  expect(text.type).toEqual('Text')
  expect(text.children[0]).toEqual('Col')
})
