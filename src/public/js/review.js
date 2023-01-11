const posterPreview = document.querySelector('.poster_review');
const filePosterPreview = document.querySelector('#poster_img');
const bannerPreview = document.querySelector('.banner_review');
const fileBannerPreview = document.querySelector('#banner_img');
const imgIconP = document.querySelector('.img_click');
const imgIconB = document.querySelector('.img_click-2');

const previewImage = {
    handleEvents: function() {
        filePosterPreview.addEventListener('change', (e) => {
            if (e.target.files.length) {
                const mySrc = URL.createObjectURL(e.target.files[0]);
                posterPreview.src = mySrc;
                imgIconP.style.opacity = '0';
            }
        });
        fileBannerPreview.addEventListener('change', (e) => {
            if (e.target.files.length) {
                const mySrc = URL.createObjectURL(e.target.files[0]);
                bannerPreview.src = mySrc;
                imgIconB.style.opacity = '0';
            }
        })
    },
    start : function () {
        this.handleEvents()
    }
}
previewImage.start();