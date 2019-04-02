import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width

const defaults = {
  cols: 4,
  colSpace: 10,
  rowSpace: 15,
  debug: false
}

export const setDefaults = values => Object.assign(defaults, values)

// Create a new context object with defaults or overrides from props.
export default ({
  padding,
  cols = defaults.cols,
  colSpace = defaults.colSpace,
  rowSpace = defaults.rowSpace,
  debug = defaults.debug
}) => {
  const config = ({
    width,
    padding,
    cols,
    colSpace,
    rowSpace,
    debug
  })

  if (padding) {
    config.padding = padding
    config.width = config.width - 2 * padding
  }

  return config
}
