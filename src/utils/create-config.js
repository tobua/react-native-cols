const defaults = {
  cols: 4,
  colSpace: 10,
  rowSpace: 15,
  debug: false
}

// Change defaults for every grid.
export const setDefaults = values => Object.assign(defaults, values)
// Returns the current defaults.
export const getDefaults = () => defaults

// Create a new context object with defaults or overrides from props.
export default ({
  padding = 0,
  cols = defaults.cols,
  colSpace = defaults.colSpace,
  rowSpace = defaults.rowSpace,
  debug = defaults.debug
}, width) => {
  const config = ({
    width,
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
