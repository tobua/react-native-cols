import React from 'react'
import { View } from 'react-native'
import { Cols, Col } from 'react-native-cols'
import renderToTree from './utils/render-to-tree'

test("Renders the Col's with the correct positioning.", () => {
  const Grid = (
    <Cols>
      <Col>
        <View />
      </Col>
      <Col left>
        <View />
      </Col>
      <Col center>
        <View />
      </Col>
      <Col right>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(4)

  expect(tree.children[0].props.style[0].alignItems).toEqual('stretch')
  expect(tree.children[1].props.style[0].alignItems).toEqual('flex-start')
  expect(tree.children[2].props.style[0].alignItems).toEqual('center')
  expect(tree.children[3].props.style[0].alignItems).toEqual('flex-end')
})

test('Positioning can be overriden by Cols colStyle.', () => {
  const Grid = (
    <Cols colStyle={{ alignItems: 'flex-start' }}>
      <Col>
        <View />
      </Col>
      <Col left>
        <View />
      </Col>
      <Col center>
        <View />
      </Col>
      <Col right>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(4)

  expect(tree.children[0].props.style[1].alignItems).toEqual('flex-start')
  expect(tree.children[1].props.style[1].alignItems).toEqual('flex-start')
  expect(tree.children[2].props.style[1].alignItems).toEqual('flex-start')
  expect(tree.children[3].props.style[1].alignItems).toEqual('flex-start')
})

test('Positioning can be overriden by Col style.', () => {
  const Grid = (
    <Cols>
      <Col style={{ alignItems: 'flex-start' }}>
        <View />
      </Col>
      <Col style={{ alignItems: 'flex-start' }} left>
        <View />
      </Col>
      <Col style={{ alignItems: 'flex-start' }} center>
        <View />
      </Col>
      <Col style={{ alignItems: 'flex-start' }} right>
        <View />
      </Col>
    </Cols>
  )

  const tree = renderToTree(Grid)

  expect(tree.children.length).toEqual(4)

  expect(tree.children[0].props.style[1].alignItems).toEqual('flex-start')
  expect(tree.children[1].props.style[1].alignItems).toEqual('flex-start')
  expect(tree.children[2].props.style[1].alignItems).toEqual('flex-start')
  expect(tree.children[3].props.style[1].alignItems).toEqual('flex-start')
})
