import { reject } from 'ramda'

const rejectVal = (val, arr) => reject(el => el === val, arr)

module.exports = {
  rejectVal
}