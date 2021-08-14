//const database = require('./controller/mongo')
const setup = require('./controller/setup')
const token = require('./middleware/token')

console.log(setup.renderTokenKey())
console.log(setup.renderTokenKey())