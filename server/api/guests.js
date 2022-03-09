const router = require("express").Router();
const {
  models: { User, Order, Order_Details, Product },
} = require("../db");
module.exports = router;

router.get("/:guestId/cart", async(req, res, next) => {
    const guestId = req.params.guestId;
    try {
        const order = await Order.findOne({
            where: {userId: guestId, complete: false},
        })
        const order_details = await Order_Details.findAll({
            where: {orderId : order.id}
        })
        res.send(order_details);

    } catch(error) {
        next(error);
    }
})

router.post("/guest", async (req, res, next) => {
  try {
    const guest = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    const tempCart = req.body.tempCart;
    const order = await Order.create({ userId: guest.id });

    for (let i = 0; i < tempCart.length; i++) {
        let current = tempCart[i];

        await Order_Details.create({
            orderId: order.id,
            productId: current.id,
            quantity: current.quantity
        })
    }
    const orderDetails = await Order.findOne({
        where: {
            id: order.id
        },
        include: Product
    })
    res.send(orderDetails);
  } catch (err) {
    next(err);
  }
});