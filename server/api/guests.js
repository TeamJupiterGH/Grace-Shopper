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

router.post("/guest", async(req, res, next) => {
    try{
        const guest = await User.create(req.body);
        console.log("this is guest.id", guest.id);
        const order = await Order.create({userId: guest.id});
        res.send(guest);
    } catch(err) {
        next(err)
    }
})
