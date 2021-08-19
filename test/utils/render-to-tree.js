import renderer, { act } from 'react-test-renderer'
import { Cols } from 'react-native-cols'
import { viewWidth, nestedViewWidth } from './../constants'

export default (Grid) => {
  const rendered = renderer.create(Grid)

  // onLayout is only called on the actual device, so we need to mock it here.
  act(() => {
    rendered.root.findAllByType(Cols).map((node) => {
      if (
        node._fiber.child &&
        node._fiber.child.stateNode &&
        node._fiber.child.stateNode.props &&
        node._fiber.child.stateNode.props.onLayout
      ) {
        node._fiber.child.stateNode.props.onLayout({
          nativeEvent: { layout: { width: viewWidth } },
        })
      }
    })
  })

  // Call onLayout again for nested Grids that weren't rendered since onlayout
  // of the outer grids hasn't been called yet, width is now 200.
  act(() => {
    rendered.root.findAllByType(Cols).map((node) => {
      if (
        node._fiber.child &&
        node._fiber.child.stateNode &&
        node._fiber.child.stateNode.props &&
        node._fiber.child.stateNode.props.onLayout
      ) {
        node._fiber.child.stateNode.props.onLayout({
          nativeEvent: { layout: { width: nestedViewWidth } },
        })
      }
    })
  })

  return rendered.toJSON()
}
