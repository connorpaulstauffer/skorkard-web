import { isNil } from 'ramda'

const isNotNil = val => !isNil(val)

module.exports = {
  isNotNil
}