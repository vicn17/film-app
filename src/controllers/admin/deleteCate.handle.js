import { Category } from "../../config/firebase";

const deleteCate = {
  path: "/deleteCate/:id",
  get: async (req, res) => {
    await Category.doc(req.params.id).delete();
    res.redirect("back");
  },
};

export default deleteCate;
