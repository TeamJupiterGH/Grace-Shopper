"use strict";

const {
  db,
  models: { User, Product, Order, Order_Details },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const user1 = await // User.create({ username: 'cody', password: '123' }),
  // User.create({ username: 'murphy', password: '123' }),
  User.create({
    username: "sara",
    password: "123",
    firstName: "Sara",
    lastName: "Sauceda",
    email: "sara@gmail.com",
  });

  const user2 = await // User.create({ username: 'cody', password: '123' }),
  // User.create({ username: 'murphy', password: '123' }),
  User.create({
    username: "EB",
    password: "123",
    firstName: "EB",
    lastName: "Hong",
    email: "EB@gmail.com",
    isAdmin: true
  });

  const product1 = await Product.create({
    name: "choco chip cookie",
    description: "a warm fluffy delicious cookie",
    price: 199,
  });
  const product2 = await Product.create({
    name: "blueberry scone",
    description: "scone",
    price: 300,
  });
  const product3 = await Product.create({
    name: "lemon cake donut",
    description: "soft, zesty donut",
    price: 100,
  });
  const product4 = await Product.create({
    name: "pumpkin pie",
    description: "fresh pumpkin pie",
    price: 400,
  });

  const order1 = await Order.create({});
  const order2 = await Order.create({});

  await user1.addOrder([order1, order2]);

  await order2.addProduct([product3, product4]);
  await order1.addProduct([product1, product2]);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
