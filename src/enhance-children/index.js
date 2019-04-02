import React, { cloneElement, Children } from 'react'
import Col from './../Col'
import wrapRegular from './wrap-regular'
import getColWidth from './get-col-width'
import getColProps from './get-col-props'
import { calculateMarginLeft, calculateMarginRight } from './calculate-margins'

let config = {}
export const getConfig = () => config

// Stores the number of current cols during iteration.
let positionStart = 0
let positionEnd = 0

const mapChild = child => {
  if (child.type !== Col) {
    positionStart = 0
    // Wrap the child in a full width col.
    return wrapRegular(child)
  }

  const { span, offset } = getColProps(child)

  const totalSpan = (span + offset)
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

  marginBottom = config.rowSpace

  // Swap positions for next iteration.
  positionStart = positionEnd % config.cols

  return cloneElement(child, {
    width,
    marginLeft,
    marginRight,
    marginBottom,
    debug: config.debug
  })
}

export default (children, currentConfig) => {
  config = currentConfig
  return Children.map(children, mapChild)
}
