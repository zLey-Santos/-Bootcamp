const banner = document.querySelector('#footer-slider');
const images = banner.querySelectorAll('img');
let index = 0;

setInterval(() => {
    images[index].style.opacity = 0;
    index = (index + 1) % images.length;
    images[index].style.opacity = 1
}, 4000);
