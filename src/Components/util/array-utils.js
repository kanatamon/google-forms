/**
 * @param {string[]} strArray
 * @param {string} excludedStr
 * @returns {string[]}
 */
export function getAllButExclude(strArray, excludedStr) {
  return strArray.filter((str) => str !== excludedStr)
}
