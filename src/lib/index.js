export const extractInnerText = el => el.innerText

export const getChildren = el => el.childNodes

export const splitWords = string => string.split(/\s+/)

export const sort = list => list.sort()

export const pushTextIfNew = (text, list) => {
  if (!list.includes(text) && !text.includes('\n')) {
    list.push(text)
  }
}

export const recursiveParser = (el, parsed) => {
  const elText = extractInnerText(el)
  if (elText) {
    pushTextIfNew(elText, parsed)
  }
  getChildren(el).forEach(child => {
    recursiveParser(child, parsed)
  })

  return parsed
}

// TODO find a way to prevent string pollution and duplication:
// verify if current string can be recontructed with already parsed strings

export const createDictionary = parsed => {
  let dictionary = []
  parsed.forEach(string => {
    splitWords(string.toLowerCase()).forEach(word => {
      pushTextIfNew(word, dictionary)
    })
  })
  
  return dictionary
}

export const parse = (pageEl) => {
  const parsed = recursiveParser(pageEl, [])
  const dictionary = sort(createDictionary(parsed))

  return {
    parsed,
    dictionary,
  }
}

export const exportToFile = (src, title) => {
  const data = JSON.stringify(src, null, 2)
  const blob = new Blob([data], { type: 'text/plain' })
  const e = document.createEvent('MouseEvents')
  const a = document.createElement('a')
  a.download = `${title || 'export'}.json`
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
  a.remove()
}

export default {
  extractInnerText,
  getChildren,
  splitWords,
  sort,
  pushTextIfNew,
  recursiveParser,
  createDictionary,
  parse,
  exportToFile
}

