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
            // Si estás usando un menú de hamburguesas, también querrás ocultar la lista de navegación
            document.getElementById("nav-list").classList.remove('active');
        } else {
            document.getElementById("navbar").style.top = "0";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
}, false);

function ajustarIndicadores() {
    const indicadorArriba = document.getElementById('scroll-up-indicator');
    const indicadorAbajo = document.getElementById('scroll-down-indicator');
    const posicionInicial = navbar.offsetTop;
    const navList = document.getElementById('nav-list');

    if (window.innerWidth > 900 || window.innerHeight > 370) {
        // Ocultar ambos indicadores si la lista no es desplazable
        indicadorArriba.style.display = 'none';
        indicadorAbajo.style.display = 'none';
    } else {
        navList.scrollTo({
            top: posicionInicial
        });
        indicadorAbajo.style.display = 'block';
    }
}

// Evento de redimensionamiento de la ventana
window.addEventListener('resize', ajustarIndicadores);/**/


document.getElementById('nav-list').addEventListener('scroll', function() {
    var navList = this;
    var scrollUpIndicator = document.getElementById('scroll-up-indicator');
    var scrollDownIndicator = document.getElementById('scroll-down-indicator');

    const tolerancia = 60; // Un pequeño margen de tolerancia en píxeles

    // Mostrar/Ocultar el indicador superior
    if (Math.round(navList.scrollTop) > tolerancia) {
        scrollUpIndicator.style.display = 'block';
    } else {
        scrollUpIndicator.style.display = 'none';
    }

    // Mostrar/Ocultar el indicador inferior
    if (Math.round(navList.scrollHeight - navList.clientHeight - navList.scrollTop) > tolerancia) {
        scrollDownIndicator.style.display = 'block';
    } else {
        scrollDownIndicator.style.display = 'none';
    }
});
