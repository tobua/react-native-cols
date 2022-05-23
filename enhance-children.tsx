import React, { cloneElement, Children, ReactElement, ReactNode } from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Col } from './index'
import { ColPosition, Config } from './types'

const wrapRegular = (child: ReactNode, props: any, config: Config) => (
  <Col
    width={getColWidth(config.cols, config)}
    marginBottom={config.rowSpace}
    marginLeft={0}
    marginRight={0}
    debug={config.debug}
    style={props.colStyle}
    // Only required to be set by user as used for calculation above.
    cols={0}
    rowSpace={0}
    colSpace={0}
  >
    {child}
  </Col>
)

const getColProps = (child: ReactElement, config: Config) => {
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

  return {
    span,
    offset,
  }
}

// Get the width of a col by span including the covered space.
const getColWidth = (span: number, config: Config) => {
  if (span === 0) {
    return 0
  }

  const generalColSpace = (config.cols - 1) * config.colSpace
  const coveredColSpace = (span - 1) * config.colSpace
  const singleColWidth = (config.width - generalColSpace) / config.cols

  return singleColWidth * span + coveredColSpace
}

// Calculates the left margin necessary inclucing offset margin.
const calculateMarginLeft = (position: number, offset = 0, config: Config) => {
  const spacer = position > 0 ? config.colSpace / 2 : 0
  const colSpace = offset > 0 ? config.colSpace : 0 // Other offset included in getColWidth
  return getColWidth(offset, config) + colSpace + spacer
}

// Calculates the margin necessary on the right.
const calculateMarginRight = (position: number, config: Config) =>
  position < config.cols ? config.colSpace / 2 : 0

// Stores the number of current cols during iteration.
let positionStart: number
let positionEnd: number

const mapChild = (props: any, config: Config, child: ReactElement) => {
  if (child.type !== Col) {
    positionStart = 0
    // Wrap the child in a full width col.
    return wrapRegular(child, props, config)
  }

  const { span, offset } = getColProps(child, config)

  const totalSpan = span + offset
  // positionX: value, 0 means on the left, config.cols means on the right
  positionEnd = positionStart + totalSpan

  let width, marginLeft, marginRight

  // Fits into current row.
  if (positionEnd <= config.cols) {
    width = getColWidth(span, config)
    marginLeft = calculateMarginLeft(positionStart, offset, config)
    marginRight = calculateMarginRight(positionEnd, config)
  } else {
    // Doesn't fit into current row, wrap to next row.
    positionStart = 0
    positionEnd = totalSpan

    width = getColWidth(span, config)
    marginLeft = calculateMarginLeft(positionStart, offset, config)
    marginRight = calculateMarginRight(positionEnd, config)
  }

  const marginBottom = config.rowSpace

  // Swap positions for next iteration.
  positionStart = positionEnd % config.cols

  const newProps: ColPosition & { debug: boolean; style?: StyleProp<ViewStyle> } = {
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

export default (children: ReactElement[], props: any, config: Config) => {
  // Reset positions for iteration.
  positionStart = 0
  positionEnd = 0

  return Children.map(children, mapChild.bind(null, props, config))
}
