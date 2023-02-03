//* Login Admin
const loginAdmin = {
  path: "/login",
  get: async (req, res) => {
    res.render("./admin/LoginAdmin");
  },
};

export default loginAdmin;
