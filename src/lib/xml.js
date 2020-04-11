export const xmlToString = xml => new XMLSerializer().serializeToString(xml)

export const stringToXml = str => new DOMParser().parseFromString(str, 'application/xml')

export const readAsXml = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = evt => resolve(stringToXml(evt.target.result))
    reader.onerror = reject
    reader.readAsText(file);
  })
}