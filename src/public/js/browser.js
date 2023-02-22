//* scroll header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".browser-header");
  if (window.scrollY > 0) {
    header.classList.add("scrollHeader");
  } else {
    header.classList.remove("scrollHeader");
  }
});

//* Handle banner
const listBanner = [
  {
    filmName: "Black Adam",
    path: "./posterFilm/black-adam-banner.jpg",
  },
  {
    filmName: "Black panther: Wakanda forever",
    path: "./posterFilm/black-panther-wakanda-forever-banner.jpg",
  },
  {
    filmName: "Chú thuật hồi chiến",
    path: "./posterFilm/jujutsu-kaisen-0-banner.jpg",
  },
  {
    filmName: "Doctor strange 2",
    path: "./posterFilm/scarlet-witch-and-doctor-strange-in-the-multiverse-of-madness-banner.jpg",
  },
  {
    filmName: "Sonic 2",
    path: "./posterFilm/sonic-the-hedgehog-2-banner.jpg",
  },
  {
    filmName: "Spiderman: không còn nhà",
    path: "./posterFilm/spiderman-no-way-home-banner.jpg",
  },
  {
    filmName: "Avatar: Dòng chảy của nước",
    path: "./posterFilm/banner-browser.jpg",
  },
];
let numberRandom = Math.floor(Math.random() * listBanner.length);
let title = document.querySelector(".content-banner-browser .title");
title.innerHTML = `<span>${listBanner[numberRandom].filmName}</span>`;
let posterBanner = document.querySelector(".banner-browser img");
posterBanner.src = listBanner[numberRandom].path;
numberRandom != listBanner.length ? (numberRandom += 1) : (numberRandom = 0);

//* Handle slide
const changeUser = document.querySelectorAll(".changeUser");
changeUser.forEach((item) => {
  item.onclick = () => item.children[0].submit();
});

const slide = (width, idListElement, item, prev, next) => {
  document.querySelector(next).onclick = () => {
    const widthItemRanking = document.querySelector(item).offsetWidth;
    document.querySelector(idListElement).scrollLeft +=
      widthItemRanking * width;
  };
  document.querySelector(prev).onclick = () => {
    const widthItemRanking = document.querySelector(item).offsetWidth;
    document.querySelector(idListElement).scrollLeft -=
      widthItemRanking * width;
  };
};

const slideListFilm = (width) => {
  const prev = document.querySelectorAll(".list-slide-film-prev");
  const next = document.querySelectorAll(".list-slide-film-next");
  prev.forEach((item) => {
    item.onclick = () => {
      const widthItemRanking =
        item.parentElement.children[1].children[0].children[0].offsetWidth;
      console.log(widthItemRanking);
      item.parentElement.children[1].scrollLeft -= widthItemRanking * width;
    };
  });
  next.forEach((item) => {
    item.onclick = () => {
      const widthItemRanking =
        item.parentElement.children[1].children[0].children[0].offsetWidth;
      item.parentElement.children[1].scrollLeft += widthItemRanking * width;
    };
  });
};

if (window.screen.width <= 768) {
  slide(
    2,
    ".form-list-ranking-film",
    ".item-ranking",
    ".btn-slide-prev",
    ".btn-slide-next"
  );
  slideListFilm(2);
} else {
  slide(
    5,
    ".form-list-ranking-film",
    ".item-ranking",
    ".btn-slide-prev",
    ".btn-slide-next"
  );
  slideListFilm(5);
}

const addYourFavorite = (i) => {
  const idFilm = i.getAttribute("data-id");
  location.href = `/addYourFavorite/${idFilm}`;
};
