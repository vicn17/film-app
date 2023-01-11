import controlWebPages from "../controllers/web";
import controlAdminPages from "../controllers/admin";

export default (app, router, upload) => {
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

  controlAdminPages.forEach((item) => {
    item.path && router.get(item.path, item.get);
    item.post &&
      item.post.forEach((post) =>
        router.post(
          post.path,
          post.upload ? upload.fields(post.upload) : upload.none(),
          post.reqHandle
        )
      );
  });

  app.use("/", router);
};
