const  {imageUpload}  = require("../middleware/multer.js");


module.exports = (app) => {
  const article = require("../controllers/article.controller.js");

  const router = require("express").Router();

  router.post("/create",imageUpload.single("image"), article.create);
  router.get("/get_articles", article.findAll);

  app.use("/api/articles", router);
};
