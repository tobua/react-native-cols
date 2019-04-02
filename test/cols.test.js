import React from 'react'
import { Cols } from 'react-native-cols'
import renderer from 'react-test-renderer'
import { wrapperStyles } from './../src/constants'

test('Renders empty Cols correctly.', () => {
  const Grid = <Cols />

  const tree = renderer.create(Grid).toJSON()

  expect(tree.type).toEqual('View')
  expect(tree.props.style[0]).toEqual(wrapperStyles())
  expect(tree.children).toEqual(null)
})

test('Cols accepts a style prop that will be added to the main View.', () => {
  const style = { color: 'red' }
  const Grid = <Cols style={style}></Cols>

  const tree = renderer.create(Grid).toJSON()

  expect(tree.type).toEqual('View')
  expect(tree.props.style[1]).toEqual(style)
  expect(tree.children).toEqual(null)
})
