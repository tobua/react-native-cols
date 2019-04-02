import React from 'react'
import Col from './../Col'
import { getConfig } from './index'
import getColWidth from './get-col-width'

export default child => {
  const config = getConfig()

  return (
    <Col
      width={getColWidth(config.cols)}
      marginBottom={config.rowSpace}
      debug={config.debug}
    >
      {child}
    </Col>
  )
}
