import { merge } from 'lodash'

export const defaultOptions = {
  el: null, // dom element to search text in
  source: {
    strings: null, // array of strings to exlude in parsing
    dictionary: null, // array of words to exlude in parsing
  },
  config: {
    strings: {
      autoStart: false,
      sort: false,
      exportOnFinish: false,
    },
    dictionary: {
      autoStart: false,
      sort: true,
      exportOnFinish: false,
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