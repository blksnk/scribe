import lib, { recursiveParser, createDictionary, exportToFile, sort } from './lib/index.js'
import { mergeOptions } from './lib/options.js'

class Scribe {
  constructor(options) {
    this.options = mergeOptions(options)
    this.strings = this.options.source
    this.dictionary = []
    this.finished = {
      strings: false,
      dictionary: false,
    }

    this._init()
  }

  _init() {
    if (this.options.config.strings.autoStart) {
      this.parse(this.options.el)

      if (this.options.config.dictionary.autoStart) {
        this.generateDictionary(this.strings)
      }
    }
    this._autoExport()
  }

  _setFinished(cat) {
    this.finished[cat] = true
  }

  _sortIfNeeded(list, listConfig) {
    if (listConfig.sort) {
      list = sort(list)
    }
  }

  _autoExport() {
    if (this.options.config.strings.exportOnFinish
      && this.options.config.dictionary.exportOnFinish
      && this.finished.strings
      && this.finished.dictionary) {
      this.exportStringsAndDictionary()
    }
    else if (this.options.config.strings.exportOnFinish
      && !this.options.config.dictionary.exportOnFinish
      && this.finished.strings) {
      this.exportStrings()
    }
    else if (!this.options.config.strings.exportOnFinish
      && this.options.config.dictionary.exportOnFinish
      && this.finished.strings
      && this.finished.dictionary) {
      this.exportDictionary()
    }
  }

  parse(el) {
    const toParse = el || this.options.el
    if (!toParse) {
      throw new Error('DOM Element supplied to Scribe is null')
    }
    this.strings = recursiveParser(toParse, this.options.source)
    this._sortIfNeeded(this.strings, this.options.config.strings)
    this._setFinished('strings')

    return this.strings
  }

  generateDictionary(lines) {
    const parsed = lines || this.strings
    this.dictionary = createDictionary(parsed)
    this._sortIfNeeded(this.dictionary, this.options.config.dictionary)
    this._setFinished('dictionary')

    return this.dictionary
  }

  exportStrings(title) {
    exportToFile(this.strings, title || 'parsed')
  }

  exportDictionary(title) {
    exportToFile(this.dictionary, title || 'dictionary')
  }

  exportStringsAndDictionary(title) {
    exportToFile({ 
      strings: this.strings,
      dictionary: this.dictionary
    }, title || 'stringsAndDictionary')
  }
}

export default Scribe
