const router = require("express").Router();
const { requireToken } = require("../api/authentication");
const {
  models: { User, Order, Order_Details, Product },
} = require("../db");
module.exports = router;

//DO WE NEED REQUIRETOKEN HERE????
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/cart", requireToken, async (req, res, next) => {
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

// router.get("/:userId/products", requireToken, async(req, res, next) => {
//   const userId = req.params.userId;

//   try{
//     const 
//   }
// })

router.post("/:userId/cart", requireToken, async (req, res, next) => {
  const userId = req.params.userId;
  try {
    let order = await Order.findOne({
      where: { userId: userId, complete: false },
    });
    if (!order) {
      order = await Order.create({ userId: userId });
    }
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

router.delete(
  "/:userId/cart/:productId",
  requireToken,
  async (req, res, next) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    try {
      let order = await Order.findOne({
        where: { userId: userId, complete: false },
      });

      let productToBeDeleted = await Order_Details.findOne({
        where: { productId: productId, orderId: order.id },
      });

      await productToBeDeleted.destroy();
      res.send(productToBeDeleted);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:userId/checkout", requireToken, async (req, res, next) => {
  const userId = req.params.userId;
  try {
    let order = await Order.findOne({
      where: { userId: userId, complete: false },
      include: Product,
    });

    await order.update(req.body);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId/cart/:productId", requireToken, async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    let order = await Order.findOne({
      where: { userId: userId, complete: false },
    });

    let productToBeUpdate = await Order_Details.findOne({
      where: { productId: productId, orderId: order.id },
    });

    await productToBeUpdate.update(req.body);

    res.send(productToBeUpdate);
  } catch (error) {
    next(error);
  }
});
