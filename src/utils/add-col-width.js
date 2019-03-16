import React, { cloneElement, Children } from 'react'
import config from './config'
import Col from './../Col'

// Calculates the width of a span 1 col without spaces.
const getColWidth = cols => {
  if (cols === 0) {
    return 0
  }
  const totalSpace = (config.cols - 1) * config.spaceHorizontal
  const space = (cols - 1) * config.spaceHorizontal
  // screenwidth - Screenpadding left and right - all space
  const singleColWidth = (config.width - (2 * config.padding) - totalSpace) / config.cols

  return singleColWidth * cols + space
}
// Calculates the left margin necessary inclucing offset margin.
const getMarginLeft = (position, offset = 0) => {
  const spacer = position > 0 ? config.spaceHorizontal / 2 : 0
  const colSpace = offset > 0 ? config.spaceHorizontal : 0 // Other offset included in getColWidth
  return getColWidth(offset) + colSpace + spacer
}
// Calculates the margin necessary on the right.
const getMarginRight = position => position < config.cols ? config.spaceHorizontal / 2 : 0
// Stores the number of current cols during iteration.
let positionStart = 0
let positionEnd = 0

const mapChild = child => {
  if (child.type !== Col) {
    positionStart = 0
    // Wrap the child in a full width col.
    return (
      <Col width={getColWidth(config.cols)} marginBottom={config.spaceVertical}>
        {child}
      </Col>
    )
  }

  let { span = 1, offset = 0 } = child.props

  span = Number(span)
  offset = Number(offset)

  // Make sure values are applicable, reassign otherwise.
  if (span > config.cols) {
    span = config.cols
  }

  if (span + offset > config.cols) {
    offset = config.cols - span
  }

  const totalSpan = (span + offset)
  // positionX: value, 0 means on the left, config.cols means on the right
  positionEnd = positionStart + totalSpan

  let width, marginLeft, marginRight

  // Fits into current row.
  if (positionEnd <= config.cols) {
    width = getColWidth(span)
    marginLeft = getMarginLeft(positionStart, offset)
    marginRight = getMarginRight(positionEnd)
  } else {
    // Doesn't fit into current row, wrap to next row.
    positionStart = 0
    positionEnd = totalSpan

    width = getColWidth(span)
    marginLeft = getMarginLeft(positionStart, offset)
    marginRight = getMarginRight(positionEnd)
  }

  marginBottom = config.spaceVertical

  // Swap positions for next iteration.
  positionStart = positionEnd % config.cols

  return cloneElement(child, {
    width,
    marginLeft,
    marginRight,
    marginBottom
  })
}

export default (children) => {
  return Children.map(children, mapChild)
}
