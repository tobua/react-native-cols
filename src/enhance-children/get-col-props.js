import { getConfig } from './../utils/config.js'

export default (child) => {
  const config = getConfig()
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
