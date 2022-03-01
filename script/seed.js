'use strict'

const {db, models: {User, Product } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    // User.create({ username: 'cody', password: '123' }),
    // User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'sara', password: '123', firstName: 'Sara', lastName: 'Sauceda', email: 'sara@gmail.com' })
  ])

  const products = await Promise.all([
    Product.create({ name: 'choco chip cookie', description: 'a warm fluffy delicious cookie', price: 1.99 }),
    Product.create({ name: 'blueberry scone', description: 'scone', price: 3.00 }),
    Product.create({ name: 'lemon cake donut', description: 'soft, zesty donut', price: 1.00 }),
    Product.create({ name: 'pumpkin pie', description: 'fresh pumpkin pie', price: 4.00 })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      // cody: users[0],
      // murphy: users[1],
      sara: users[0]
    },
    products: {
      cookie: products[0],
      scone: products[1],
      donut: products[2],
      pumpkinPie: products[3],
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
