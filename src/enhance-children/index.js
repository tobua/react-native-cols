import { cloneElement, Children } from 'react'
import { StyleSheet } from 'react-native'
import { Col } from './../Col.js'
import wrapRegular from './wrap-regular.js'
import getColWidth from './get-col-width.js'
import getColProps from './get-col-props.js'
import { getConfig } from './../utils/config.js'
import {
  calculateMarginLeft,
  calculateMarginRight,
} from './calculate-margins.js'

// Stores the number of current cols during iteration.
let positionStart
let positionEnd

const mapChild = (props, child) => {
  if (child.type !== Col) {
    positionStart = 0
    // Wrap the child in a full width col.
    return wrapRegular(child, props)
  }

  const config = getConfig()
  const { span, offset } = getColProps(child)

  const totalSpan = span + offset
  // positionX: value, 0 means on the left, config.cols means on the right
  positionEnd = positionStart + totalSpan

  let width, marginLeft, marginRight

  // Fits into current row.
  if (positionEnd <= config.cols) {
    width = getColWidth(span)
    marginLeft = calculateMarginLeft(positionStart, offset)
    marginRight = calculateMarginRight(positionEnd)
  } else {
    // Doesn't fit into current row, wrap to next row.
    positionStart = 0
    positionEnd = totalSpan

    width = getColWidth(span)
    marginLeft = calculateMarginLeft(positionStart, offset)
    marginRight = calculateMarginRight(positionEnd)
  }

  const marginBottom = config.rowSpace

  // Swap positions for next iteration.
  positionStart = positionEnd % config.cols

  const newProps = {
    width,
    marginLeft,
    marginRight,
    marginBottom,
    debug: config.debug,
  }

  if (props.colStyle) {
    // react-native-web compatibility, see https://necolas.github.io/react-native-web/docs/styling
    if (typeof props.colStyle === 'number') {
      newProps.style = StyleSheet.flatten(props.colStyle)
    } else {
      newProps.style = props.colStyle
    }
  }

  return cloneElement(child, newProps)
}

export default (children, props) => {
  // Reset positions for iteration.
  positionStart = 0
  positionEnd = 0

  return Children.map(children, mapChild.bind(null, props))
}
