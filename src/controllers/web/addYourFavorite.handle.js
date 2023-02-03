//* Add your favorite film
const addYourFavorite = {
  path: "/addYourFavorite/:id",
  get: async (req, res) => {
    const idFilm = req.params.id;
    const film = await Films.doc(idFilm).get();
    let checkFavoriteFilm = 0;
    const listFilmOld = await Accounts.doc(req.session.user.acc_id)
      .get()
      .then((snapshot) => snapshot.data().acc_favorite);
    const favoriteList = await Accounts.doc(req.session.user.acc_id)
      .get()
      .then((querySnapshot) => querySnapshot.data().acc_favorite);
    favoriteList.map((item) => {
      if (item.f_id == idFilm) {
        return (checkFavoriteFilm = 1);
      }
    });
    if (checkFavoriteFilm == 1) {
      res.redirect("..");
    } else {
      await Accounts.doc(req.session.user.acc_id).update({
        acc_favorite: [...listFilmOld, { f_id: idFilm, ...film.data() }],
      });
      res.redirect("/favorite");
    }
  },
};

export default addYourFavorite;
