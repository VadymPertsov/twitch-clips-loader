export const buildClipsByIdsPath = (ids: string[]): string => {
  return ids.map(id => `id=${id}`).join('&')
}

//TODO: check other global helpers-function. mb needs to replace funcs
