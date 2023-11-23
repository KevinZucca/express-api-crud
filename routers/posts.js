const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.get("/", postsController.index);
router.post("/", postsController.create);
router.get("/:slug", postsController.show);
router.put("/:slug", postsController.update);
router.delete("/:slug", postsController.destroy);

module.exports = router;
