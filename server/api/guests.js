const router = require("express").Router();
const {
  models: { User, Order, Order_Details, Product },
} = require("../db");
module.exports = router;

// router.get("/:guestId/cart", async (req, res, next) => {
//     const guestId = req.params.guestId;
//     try {
//         const order = await Order.findOne({
//             where
//         })
//     }
// })

router.post("/guest", async (req, res, next) => {
  //req.body = {firstName: "EB", lastName: "Hong", email: "EB@gmail.com", tempCart:[{id: 1, quantity: 3}, {id: 4, quantity: 6}]}
  try {
    const guest = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    // const tempCart = JSON.str(req.body.tempCart);
    const tempCart = req.body.tempCart;
    const order = await Order.create({ userId: guest.id });
    const order_details = await Order_Details.create({
      orderId: order.id,
      productId: tempCart[0].id,
      quantity: tempCart[0].quanity,
    });

    res.send(order_details);
    // res.send(guest);
  } catch (err) {
    next(err);
  }
});
