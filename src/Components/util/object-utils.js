/**
 * @param {object} unknownOrderedObj
 * @returns {string}
 */
function getObjectIdentical(unknownOrderedObj) {
  const keyOrderedObj = Object.keys(unknownOrderedObj)
    .sort()
    .reduce((resultObj, key) => {
      resultObj[key] = unknownOrderedObj[key]
      return resultObj
    }, {})

  return JSON.stringify(keyOrderedObj)
}

/**
 * @param {object} objA
 * @param {object} objB
 * @returns {boolean}
 */
export function isDeepEqual(objA, objB) {
  return getObjectIdentical(objA) === getObjectIdentical(objB)
}

/**
 * Deep clone object but without attached functions
 * @param {object} obj
 * @returns {object} a given object with new reference
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
