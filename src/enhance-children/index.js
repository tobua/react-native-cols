import { cloneElement, Children } from 'react'
import { Col } from './../Col'
import wrapRegular from './wrap-regular'
import getColWidth from './get-col-width'
import getColProps from './get-col-props'
import { getConfig } from './../utils/config'
import { calculateMarginLeft, calculateMarginRight } from './calculate-margins'

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
    newProps.style = props.colStyle
  }

  return cloneElement(child, newProps)
}

export default (children, props) => {
  // Reset positions for iteration.
  positionStart = 0
  positionEnd = 0

  return Children.map(children, mapChild.bind(null, props))
}
