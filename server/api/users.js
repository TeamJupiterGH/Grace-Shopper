const router = require("express").Router();
const {
  models: { User },
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


router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch(error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async(req, res, next) => {
  try{
    const userToBeDeleted= await User.findByPk(req.params.id);
    await userToBeDeleted.destroy();
    res.send(userToBeDeleted);
  } catch(error) {
    next(error);
  }
})

router.put("/:id", async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch(error) {
    next(error);
  }
})

