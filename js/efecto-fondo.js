//Convertir color hexadecimal en arreglos de canales R, G, B y A (No se usa por ahora)
function hexToRgb(hex) {
    // Esta función convierte un color hex a un objeto RGB
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//Convertir RGB o RGBA en arreglos de canales R, G, B y A
function getRgbaChannels(colorString) {
    const result = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+.\d+|\d+))?\)/);
    
    if (result) {
        return {
            r: parseInt(result[1], 10),
            g: parseInt(result[2], 10),
            b: parseInt(result[3], 10),
            a: result[4] !== undefined ? parseFloat(result[4]) : 1 // El canal alfa es opcional y por defecto es 1
        };
    }
    return null;
}

//Interpolación lineal de colores en un punto intermedio determinado por el ratio
function mezclarColores(color1, color2, ratio) {
    var r = Math.round(color1.r * ratio + color2.r * (1 - ratio));
    var g = Math.round(color1.g * ratio + color2.g * (1 - ratio));
    var b = Math.round(color1.b * ratio + color2.b * (1 - ratio));
    var a = color1.a * ratio + color2.a * (1 - ratio);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//Actualizar color de fondo de los overlay de la clase background-trans
function actualizarFondos() {
    const seccions = document.querySelectorAll('.section-background');
    seccions.forEach((seccion, idx) => {
        if (seccion.classList.contains('background-trans')) {
            let colorAnteriorVar, colorActualVar, fondoActual;
            const overlay = seccion.querySelector('.overlay');
            
            //Seleccionar el color de fondo por defecto del overlay de la sección actual
            colorActualVar = window.getComputedStyle(overlay).getPropertyValue('--color-fondo-overlay').trim();

            //Seleccionar el color de fondo por defecto del overlay de la sección anterior
            if (idx === 0) {
                colorAnteriorVar = colorActualVar; 
            } else {
                const overlayAnterior = seccions[idx - 1].querySelector('.overlay');
                colorAnteriorVar = window.getComputedStyle(overlayAnterior).getPropertyValue('--color-fondo-overlay').trim();
            }

            let colorAnteriorRgb = getRgbaChannels(colorAnteriorVar);
            let colorActualRgb = getRgbaChannels(colorActualVar);

            // Calcular el porcentaje de visibilidad de la sección actual
            const rectActual = seccion.getBoundingClientRect();
            let porcentajeVisible = 1;
            if(rectActual.height <= window.innerHeight){
                porcentajeVisible = 0 < rectActual.top && rectActual.top < window.innerHeight ? Math.min(rectActual.height, window.innerHeight - rectActual.top) / rectActual.height : 1; //Secciones más pequeñas que la pantalla
            } else {
                porcentajeVisible = 0 < rectActual.top && rectActual.top < window.innerHeight ? (window.innerHeight - rectActual.top) / window.innerHeight : 1; //Secciones más grandes que la pantalla
            }
            fondoActual = mezclarColores(colorAnteriorRgb, colorActualRgb, 1 - porcentajeVisible);
            overlay.style.backgroundColor = fondoActual;
        }
    });
}

// Asignar el manejador de eventos para scroll y resize
window.addEventListener('scroll', actualizarFondos);
window.addEventListener('resize', actualizarFondos);
