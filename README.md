# Scribe &mdash; Client-side text parser.

Parse any page / DOM element's text content.
Gets all unique strings used in the given element. Generate a dictionary based on parsing results.
Exports results in JSON format.


## Installation

Install the package with your package manager of choice.

```bash
yarn add @blksnk/scribe
# or
npm install --save @blksnk/scribe
```

Import the package.

```javascript
import Scribe from '@blksnk/scribe'

// or

const Scribe = require('@blksnk/scribe')
```


## Getting Started

To use Scribe, you first need to create an instance.
Optionnaly, pass it an options object a first argument.

```javascript
const parser = new Scribe({
    // options table located below
})
```


## Basic Usage

Scribe should work with all major front-end frameworks, since it exclusively uses the vanilla JS API.

**Manually, using API**

```javascript=
// Initialize Scribe instance, target element "main"
const parser = new Scribe()

// Target "main"
const element = document.querySelector('main')

// Parse Element
const strings = parser.parse(element)

// Generate 
const dictionary = parser.generateDictionary()

// export results and dictionnary to JSON
// with title "myExport"
parser.exportStringsAndDictionnary('myExport')
```

*Scribe can easily automate this same process.*

**Automatically, using options**

```javascript=
new Scribe({
  el: document.querySelector('main'),
  config: {
    strings: {
      autoStart: true,
      exportOnFinish: true,
    },
    dictionary: {
      autoStart: true,
      exportOnFinish: true,
    }
  }
})
```


## Instance Options

Options are declared through nested object properties, formatted as such:


### Default options

```javascript
const defaultOptions = {
  el: null,
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
    }
  }
}
```

Strings- and dictionnary-related options are to be declared separately.


### Options

|  Option   |   Type         | Default |           Description                                       |
| --------  | ------------   | ------- | --------------------------------                            |
| `el`      | `DOMElement`   | `null`  | Element to parse for strings.                               |
| `source`  | `Array[String]`| `[]`    | Strings array to use as initial source when parsing element.|
|`autoStart`| `Boolean`      | `false` | Parsing starts as soon as instance is created.              |
|`exportOnFinish`|`Boolean`  | `false` | Start download dialog as soon as parsing is finished.       |
| `sort`    | `Boolean`      | `false` | Sort results alphabetically.                                |


## Instance Methods

| Method          |  Description            | Arguments                                  |  Returns  |
| --------        | --------                | -------                                    | ------    |
|`parse(el)`|Parse element for strings|`el`: Element to parse. Uses `options.el` if left empty.| Parsing results `Array[String]`|
|`generateDictionary(list)`|Extract unique words from supplied list|`list`: Strings to convert into dictionary. Uses parsing results (`instance.strings`) if left empty.|Dictionnary `Array[String]`|
|`exportStrings(title)`|Convert parsing results to JSON and trigger download dialog|`title`: title of generated file.|`JSON File`|
|`exportDictionary(title)`|Convert dictionary to JSON and trigger download dialog|`title`: title of generated file.|`JSON File`|
|`exportStringAndDictionary(title)`|Export parsing results and dictionary to JSON and trigger download dialog|`title`: title of generated file.|`JSON File`|


## Contributing

Scribe still is a young package. Issues, pull requests and forks are welcome!
