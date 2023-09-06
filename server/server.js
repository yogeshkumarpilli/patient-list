import jsonServer from 'json-server'
import { faker } from '@faker-js/faker';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const patients = require('./patients.json');

const server = jsonServer.create()
const router = jsonServer.router(patients)
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

function checkRequiredKeys(data, requiredKeys = []) {
  return requiredKeys.filter((key) => !data[key]);
}

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const missingParameters = checkRequiredKeys(req.body, [
      'first_name',
      'last_name',
      'birth_date',
      'indication'
    ]);

    if (missingParameters.length > 0) {
      res.status(400).send({
        reason: 'Missing parameters',
        parameters: missingParameters,
      })
      return;
    }

    req.body.creation_date = new Date().toUTCString()
    req.body.id = faker.string.uuid()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
