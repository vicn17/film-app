import express from "express";
import controlWebPages from "../controllers/web";
const router = express.Router();

//* check user
const checkUser = (req, res, next) => {
  if (req.session && req.session.user != "") {
    next();
  } else {
    res.redirect("/login");
  }
};

//* Use loop router for request
controlWebPages.forEach((item) => {
  item.path && router.get(item.path, item.get);
  item.post &&
    item.post.forEach((post) => router.post(post.path, post.reqHandle));
});

export default router;
