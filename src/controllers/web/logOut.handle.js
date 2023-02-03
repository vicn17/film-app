//* Log out
const logOut = {
  path: "/logout",
  get: (req, res) => {
    try {
      req.session.user && req.session.destroy(null);
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  },
};

export default logOut;
