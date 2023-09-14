import { fakerFR as faker } from "@faker-js/faker";

const indication = [
  'post_pvc_ablation',
  'palpitations',
  'post_tavi',
]

const patients = new Array(40).fill(null).map(_ => ({
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  indication: indication[faker.number.int({ min: 0, max: 2 })],
  birth_date: faker.date.birthdate(),
  creation_date: faker.date.past(),
}))

console.log(JSON.stringify({
  patients
}, null, 2))

