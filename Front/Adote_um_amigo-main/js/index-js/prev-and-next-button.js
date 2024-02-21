const banners = document.querySelectorAll('.img-animais');

banners.forEach((banner) => {
    const images = banner.querySelectorAll('img');
    const prevButton = banner.querySelector('.prev');
    const nextButton = banner.querySelector('.next');
    let index = 0;

    function showImage() {
        images.forEach((image) => (image.style.opacity = 0));
        images[index].style.opacity = 1;
    }

    function nextImage() {
        index = (index + 1) % images.length;
        showImage();
    }

    function prevImage() {
        index = (index - 1 + images.length) % images.length;
        showImage();
    }

    showImage();

    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);
});


