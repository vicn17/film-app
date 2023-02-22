const getDetailFilm = (img) => {
  document.querySelector(".wrapper-filter-detail-film").style.visibility =
    "visible";
  document.querySelector(".wrapper-filter-detail-film").style.opacity = 1;

  const f_id = img.getAttribute("data-id");
  const f_trailer = img.getAttribute("data-iframe");
  const f_description = img.getAttribute("data-desc");
  console.log(f_id, f_trailer, f_description);

  document.querySelector(
    ".video-detail-film iframe"
  ).src = `${f_trailer}?autoplay=1`;

  document.querySelector(".description-detail-film").innerHTML = f_description;

  if (document.getElementById("removeFavorite")) {
    document.querySelector(
      ".list-btn-detail-film"
    ).children[1].href = `/removeYourFavorite/${f_id}`;
  } else {
    document.querySelector(
      ".list-btn-detail-film"
    ).children[1].href = `/addYourFavorite/${f_id}`;
  }
};

document.querySelector(".filter-detail-film").addEventListener("click", () => {
  document.querySelector(".wrapper-filter-detail-film").style.visibility =
    "hidden";
  document.querySelector(".wrapper-filter-detail-film").style.opacity = 0;

  document.querySelector(".video-detail-film iframe").src = "";
});
