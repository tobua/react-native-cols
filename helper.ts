import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { ColPosition, Config, ColProps } from './types'

const defaults = {
  cols: 4,
  colSpace: 10,
  rowSpace: 15,
  debug: false,
}

// Change defaults for every grid.
export const setDefaults = (values: object) => Object.assign(defaults, values)
// Returns the current defaults.
export const getDefaults = () => defaults

// Create a new context object with defaults or overrides from props.
export const createConfig = (props: any, width: number) => {
  const config: Config = {
    width,
    cols: props.cols ?? defaults.cols,
    colSpace: props.colSpace ?? defaults.colSpace,
    rowSpace: props.rowSpace ?? defaults.rowSpace,
    debug: props.debug ?? defaults.debug,
  }

  if (props.padding) {
    config.padding = props.padding
    config.width = config.width - 2 * props.padding
  }

  return config
}

export const getPosition = ({
  left,
  center,
  right,
}: {
  left?: boolean
  center?: boolean
  right?: boolean
}) => {
  if (left) {
    return 'flex-start'
  }
  if (center) {
    return 'center'
  }
  if (right) {
    return 'flex-end'
  }
  return 'stretch'
}

export const createColStyles = (
  props: Omit<ColProps, 'children'> & Partial<Config> & Partial<ColPosition>,
) => {
  let view: StyleProp<ViewStyle> = {
    width: props.width,
    alignItems: getPosition(props),
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginBottom: props.marginBottom,
  }

  if (props.debug) {
    view.backgroundColor = '#cccccc'
  }

  return StyleSheet.create({
    view,
  })
}

export const screenStyles: (config: Config) => StyleProp<ViewStyle> = (config) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: config.padding,
})
