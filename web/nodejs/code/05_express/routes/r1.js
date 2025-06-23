/*
    在外部定义 router
*/
const router = require("express").Router();

router.get("/hello", (req, res) => {
  res.send("定义在外部文件");
});

module.exports = router;
