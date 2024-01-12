document.getElementById('mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-list').classList.toggle('active');
});

let lastScrollTop = 0; // Variable para guardar la posición de desplazamiento anterior
let menuClicked = false;

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        // Indica que el menú ha sido clickeado
        menuClicked = true;

        // Oculta la barra de navegación
        document.getElementById("navbar").style.top = "-80px"; // Ajusta según la altura de tu barra de navegación
        // Si estás usando un menú de hamburguesas, también querrás ocultar la lista de navegación
        document.getElementById("nav-list").classList.remove('active');
        // Restablece la bandera después de un corto período
        setTimeout(() => {
            menuClicked = false;
        }, 500); // Ajusta el tiempo si es necesario
    });
});

window.addEventListener("scroll", function() {
    if (!menuClicked) {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            document.getElementById("navbar").style.top = "-80px";
        } else {
            document.getElementById("navbar").style.top = "0";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
}, false);
