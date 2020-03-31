import { merge } from 'lodash'

export const defaultOptions = {
  el: null, // dom element to search text in
  source: [],
  config: {
    strings: {
      autoStart: false,
      exportOnFinish: false,
      sort: false,
    },
    dictionary: {
      autoStart: false,
      exportOnFinish: false,
      sort: true,
    },
  },
}

export const mergeOptions = userOptions => {
  let o = {}
  merge(o, defaultOptions, userOptions)
  return o
}

export default {
  defaultOptions,
  mergeOptions
}