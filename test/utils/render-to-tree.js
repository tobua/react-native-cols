import renderer from 'react-test-renderer'

export default Grid => {
  const rendered = renderer.create(Grid)
  // onLayout is only called on the actual device, so we need to mock it here.
  rendered.root._fiber.stateNode.onLayout({ nativeEvent: { layout: { width: 400 } } })
  return rendered.toJSON()
}
