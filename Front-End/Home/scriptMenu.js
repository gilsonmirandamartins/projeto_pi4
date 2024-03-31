var menu = document.getElementsByClassName('menu');

function ClickMenu() {
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].style.display == 'none') {
            menu[i].style.display = 'block';
        } else {
            menu[i].style.display = 'none';
        }
    }
}
