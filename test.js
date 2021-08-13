//const database = require('./controller/mongo')
const setup = require('./controller/setup')
const token = require('./middleware/token')
//setup.createAdminAccount("admin", "admin@12345")

token.getData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjI4ODUzNzIzLCJleHAiOjE2MzQwMzc3MjN9.YO8Ovm0T0BqSlCWmMq5tFvpkhb42S-oPVXDFJSb3PO8', (cc, bb)=>{
    console.log(cc)
})