import { Accounts } from "../../config/firebase";

//* Remove your favorite film
const removeYourFavorite = {
  path: "/removeYourFavorite/:id",
  get: async (req, res) => {
    let new_favorite = [];
    const checkFilm = await Accounts.doc(req.session.user.acc_id)
      .get()
      .then((snapshot) => snapshot.data());
    checkFilm.acc_favorite.map((item) => {
      item.f_id != req.params.id && new_favorite.push(item);
    });
    await Accounts.doc(req.session.user.acc_id).update({
      acc_favorite: new_favorite,
    });
    res.redirect("back");
  },
};

export default removeYourFavorite;
