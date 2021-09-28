import React from 'react'
import { Col } from './../Col.js'
import { getConfig } from './../utils/config.js'
import getColWidth from './get-col-width.js'

export default (child, props) => {
  const config = getConfig()

  return (
    <Col
      width={getColWidth(config.cols)}
      marginBottom={config.rowSpace}
      marginLeft={0}
      marginRight={0}
      debug={config.debug}
      style={props.colStyle}
    >
      {child}
    </Col>
  )
}
