function getRandom (min, max) {
  return Math.ceil(Math.random() * (max - min)) + min
}
export function shuffle (arr) {
  var _arr = [].concat(arr)
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, _arr.length - 1)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  console.log(arr)
  return _arr
}
