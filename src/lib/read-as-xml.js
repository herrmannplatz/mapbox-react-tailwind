export const readAsXML = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(evt.target.result, "application/xml")
      resolve(doc);
    }
    reader.onerror = reject
    reader.readAsText(file);
  })
}