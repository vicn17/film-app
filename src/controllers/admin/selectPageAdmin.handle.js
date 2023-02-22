import { Films, Category } from "../../config/firebase";

//* Home page admin
const selectPage = {
  path: "/:page",
  get: async (req, res) => {
    const page = req.params.page;
    let listFilms = "";
    let detailFilm = "";
    let listCate = "";
    if (page === "film") {
      const snapshot = await Films.get();
      listFilms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return res.render("./admin/Browser", { page, listFilms });
    } else if (page == "category") {
      const snapshot = await Category.get();
      listCate = snapshot.docs.map((doc) => doc.id);
      return res.render("./admin/Browser", { page, listCate });
    }
    const listFilmBrowser = (await Films.get()).docs.map((film) => ({
      f_id: film.id,
      f_banner: film.data().f_banner,
      f_title: film.data().f_title,
    }));
    const countsFlim = (await Films.count().get()).data().count;
    return res.render("./admin/Browser", { page, listFilmBrowser, countsFlim });
  },
  post: [
    {
      path: "/add/new-film",
      upload: [
        {
          name: "f_poster",
          maxCount: 1,
        },
        {
          name: "f_banner",
          maxCount: 1,
        },
      ],
      reqHandle: async (req, res) => {
        try {
          const {
            f_category,
            f_title,
            f_actor,
            f_character,
            f_directors,
            f_country,
            f_trailer,
            f_description,
          } = req.body;

          //* get img post in form
          const imgPoster = req.files.f_poster;
          let pathImgPoster = "";
          imgPoster.forEach((item) => {
            pathImgPoster = `uploads/${item.filename}`;
          });

          //* get img banner in form
          const imgBanner = req.files.f_banner;
          let pathImgBanner = "";
          imgBanner.forEach((item) => {
            pathImgBanner = `uploads/${item.filename}`;
          });

          //* add database
          var date = new Date();
          await Films.add({
            f_category: f_category,
            f_title: f_title,
            f_actor: f_actor,
            f_character: f_character,
            f_directors: f_directors,
            f_country: f_country,
            f_trailer: f_trailer,
            f_video: "",
            f_description: f_description,
            f_poster: pathImgPoster,
            f_banner: pathImgBanner,
            f_created_at: date,
            f_views: 0,
          });

          const snapshot = await Films.where(
            "f_poster",
            "==",
            pathImgPoster
          ).get();
          const detailFilm = snapshot.docs.map((doc) => doc.id);

          res.redirect(`/admin/detail/${detailFilm}`);
        } catch (error) {
          res.send("khong them dc");
        }
      },
    },
  ],
};
export default selectPage;
