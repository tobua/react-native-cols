import React from 'react'
import { Text } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'
import { getDefaults } from './../src/utils/config'
import { viewWidth } from './constants'

test('Renders the Col\'s with the correct positioning.', () => {
  const Grid = (
    <Cols>
      <Col />
      <Col left />
      <Col center />
      <Col right />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(4)

  expect(tree.children[0].props.style.alignItems).toEqual('stretch')
  expect(tree.children[1].props.style.alignItems).toEqual('flex-start')
  expect(tree.children[2].props.style.alignItems).toEqual('center')
  expect(tree.children[3].props.style.alignItems).toEqual('flex-end')
})

test('Positioning can be overriden by Cols colStyle.', () => {
  const Grid = (
    <Cols colStyle={{ alignItems: 'flex-start' }}>
      <Col />
      <Col left />
      <Col center />
      <Col right />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(4)

  expect(tree.children[0].props.style.alignItems).toEqual('flex-start')
  expect(tree.children[1].props.style.alignItems).toEqual('flex-start')
  expect(tree.children[2].props.style.alignItems).toEqual('flex-start')
  expect(tree.children[3].props.style.alignItems).toEqual('flex-start')
})

test('Positioning can be overriden by Col style.', () => {
  const Grid = (
    <Cols>
      <Col style={{ alignItems: 'flex-start' }} />
      <Col style={{ alignItems: 'flex-start' }} left />
      <Col style={{ alignItems: 'flex-start' }} center />
      <Col style={{ alignItems: 'flex-start' }} right />
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(4)

  expect(tree.children[0].props.style.alignItems).toEqual('flex-start')
  expect(tree.children[1].props.style.alignItems).toEqual('flex-start')
  expect(tree.children[2].props.style.alignItems).toEqual('flex-start')
  expect(tree.children[3].props.style.alignItems).toEqual('flex-start')
})
