const profile = {
  path: "/profile",
  get: (req, res) => {
    console.log(req.session.user);
    res.render("./web/Profile", { user: req.session.user });
  },
};

export default profile;
