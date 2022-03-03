const router = require("express").Router();
const {
  models: { User, Order, Order_Details, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    }
    );
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/cart", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const order = await Order.findOne({
      where: { userId: userId, complete: false },
      include: Product,
    });

    res.send(order);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId/cart", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const order = await Order.findOne({
      where: { userId: userId, complete: false },
    });
    await Order_Details.create({
      orderId: order.id,
      productId: req.body.id,
    });

    const updatedOrder = await Order.findOne({
      where: { userId: userId, complete: false },
      include: Product,
    });

    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
});