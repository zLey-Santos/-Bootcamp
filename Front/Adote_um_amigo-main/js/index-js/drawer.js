let appBarDrawer = document.getElementById('app-bar-open-drawer');
let drawer = document.querySelector('#drawer');
let drawerMenu = document.querySelectorAll('menu-drawer')

appBarDrawer.addEventListener('click', () => {
    if (drawer.style.right === '0px') {
        drawer.style.right = '-230px';
    } else {
        drawer.style.right = '0px';
    }
});
