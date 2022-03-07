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
    name: "Chocolate Chip Cookies (dozen)",
    description: "These delicious chocolate chip cookies are made with 72% Coucher du Soleil Guittard chocolate and are topped with Maldon Salt. We love them and we think you will too!",
    price: 1200,
    imageUrl: "https://i.imgur.com/KxJ6Z14.jpg"
  });
  const product2 = await Product.create({
    name: "Blueberry Scone",
    description: "Our blueberry scones are buttery and moist with crisp crumbly edges and soft flaky centers. Crunchy coarse sugar and creamy vanilla icing are the perfect finishing touches!",
    price: 300,
    imageUrl: "https://i.imgur.com/zog6fwt.jpg?1"
  });
  const product3 = await Product.create({
    name: "Lemon Cake Donut",
    description: "These are made with a tart-yet-sweet lemon glaze that is PERFECT! Lemon lovers will adore them!!",
    price: 100,
    imageUrl: "https://i.imgur.com/wyGlK2T.jpg?1"
  });
  const product4 = await Product.create({
    name: "Bourbon Pecan Pie",
    description: "Toasted organic pecans, organic butter, brown sugar (we are a corn syrup free bakery!), eggs and a healthy splash of bourbon and vanilla make this pie a must-have! Serves 8-10.",
    price: 2500,
    imageUrl: "https://cdn.shopify.com/s/files/1/0105/3212/products/IMG_0529_grande.JPG?v=1568134015"
  });

  const product5 = await Product.create({
    name: "Key Lime Pie",
    description: "We make our Key Lime Pies with the juice and zest of fresh organic limes, organic Clover eggs, and organic sweetened condensed milk, baked into a graham cracker shell. Serves 8-10.",
    price: 2500,
    imageUrl: "https://cdn.shopify.com/s/files/1/0105/3212/products/FullSizeRender-3_0b914664-4cd4-4ed8-8480-e73aa3d45b9e_grande.jpg?v=1614763342"
  });

  const product6 = await Product.create({
    name: "Chocolate Crinkle Cookies (dozen)",
    description: "Chewy chocolatey bite size cookies made with Guitard's 72% Coucher du Soliel bittersweet chocolate. Dusted in powdered sugar for a burst of sweetness!",
    price: 1200,
    imageUrl: "https://cdn.shopify.com/s/files/1/0105/3212/products/IMG_7788_2048x2048.jpg?v=1645037335"
  });

  const product7 = await Product.create({
    name: "Classic Apple Pie",
    description: "For this all-American favorite we use organic apples from a variety of Northern California orchards, organic sweet cream butter, freshly squeezed lemon juice and our own mix of spices to create the perfect apple pie. The lattice top is rolled, woven and fluted by hand - we think you'll agree that the result is a flaky, delicious masterpiece! Serves 8-10.",
    price: 2500,
    imageUrl: "https://cdn.shopify.com/s/files/1/0105/3212/products/apple_pie_square_2048x2048.jpeg?v=1568134005"
  });

  const product8 = await Product.create({
    name: "Blueberry Blackberry Crumble",
    description: "We pair juicy organic blueberries from the Smit Ranch (Hidden Star Orchards) in Linden with plump organic blackberries from Stahlbush Island Farms. They are topped with our famous oatmeal cookie crumble top!  So good! Serves 8-10.",
    price: 2500,
    imageUrl: "https://cdn.shopify.com/s/files/1/0105/3212/products/blackberry_vegan_2ea4c328-97a5-4ff1-9f3a-71c994b8642b_2048x2048.jpg?v=1643051364"
  });

  const product9 = await Product.create({
    name: "Peanut Butter Truffle Pie",
    description: "Peanut Butter Truffle Pie is kind of like a giant, very fancy, Reese's Peanut Butter Cup™. This pie starts with a chocolate graham crust, made from scratch with melted 70% Camino Verde, Ecuador chocolate. It is then filled with peanut butter custard and baked until it is light and fluffy. After the pie cools, we add a generous layer of silky chocolate cream and top the entire pie with a velvety river of chocolate ganache. As an added bonus, it's gluten-free! Serves 8-10.",
    price: 2500,
    imageUrl: "https://cdn.shopify.com/s/files/1/0105/3212/products/1-PiDay-ChessSliced-2022-WholePies-DandelionChocolate_2048x2048.jpg?v=1646201113"
  });

  const product10 = await Product.create({
    name: "Chocolate Turtle Pie",
    description: "Chocolate Turtle Pie is an elevated take on one of our favorite confections - turtles! These pies are a sweet-salty dream of caramel, salted pecans, toasted coconut and melted 70% dark chocolate from Costa Esmeraldas, Ecuador baked into our flaky butter crust. Serves 8-10.",
    price: 2500,
    imageUrl: "https://cdn.shopify.com/s/files/1/0105/3212/products/1-Pecan-Whole-PiDay-2022-WholePies-DandelionChocolate_2048x2048.jpg?v=1646179359"
  });

  const product11 = await Product.create({
    name: "Blackberry Blueberry Crumble",
    description: "We pair juicy organic blueberries from the Smit Ranch (Hidden Star Orchards) in Linden with plump organic blackberries from Stahlbush Island Farms. They are topped with our famous oatmeal cookie crumble top!  So good! Serves 8-10.",
    price: 2500,
    imageUrl: "https://cdn.shopify.com/s/files/1/0105/3212/products/blackberry_vegan_2ea4c328-97a5-4ff1-9f3a-71c994b8642b_2048x2048.jpg?v=1643051364"
  });

  const product12 = await Product.create({
    name: "Peanut Butter Cookies (dozen)",
    description: "These classic cookies are so soft and chewy. Your taste buds will say 'thank you'.",
    price: 1200,
    imageUrl: "https://www.jessicagavin.com/wp-content/uploads/2018/12/peanut-butter-cookies-8-1200.jpg"
  });
  


  const order1 = await Order.create({ complete: true });
  const order2 = await Order.create({});
  const order3 = await Order.create({});
  const order4 = await Order.create({});
  const order5 = await Order.create({})

  await user1.addOrder([order1, order2]);

  await order2.addProduct([product3, product4]);
  await order1.addProduct([product1, product2]);
  await order3.addProduct([product4, product5]);
  await order4.addProduct([product6, product7]);
  await order5.addProduct([product8, product9]);

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
