document.getElementById('contact-form').addEventListener('submit', function(e) {
    // Evitar que el formulario se envíe de manera predeterminada
    e.preventDefault();

    // Realizar la validación
    if (!validarFormulario()) {
        return; // Detener la ejecución si la validación falla
    }

    // Proceder con el envío del formulario
    enviarFormulario(e);
    alert('Formulario enviado correctamente.');
});

function validarFormulario() {

    // Obtener los valores de los campos
    var nombre = document.getElementById('nombre').value.trim();
    var email = document.getElementById('email').value.trim();
    var numero = document.getElementById('numero').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();
    
    // Validar el campo nombre
    if (nombre === '') {
        alert('Por favor, introduce tu nombre.');
        return false;
    }

    // Validar el campo email
    if (email === '' || !validarEmail(email)) {
        alert('Por favor, introduce un email válido.');
        return false;
    }

     // Validar el campo número si está presente
    if (numero !== '' && !validarNumero(numero)) {
        alert('Por favor, introduce un número de contacto válido.');
        return false;
    }

    // Validar el campo mensaje
    if (mensaje === '') {
        alert('Por favor, introduce un mensaje.');
        return false;
    }

    return true;
}

function validarNumero(numero) {
    var re = /^\+?[0-9\s\-()]+$/;
    return re.test(numero);
}

function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function enviarFormulario(e) {
    const form = e.target;
    const data = new FormData(form);

    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSe5vfBhBy4pSq5QshXP3-PP24zIeuUVqgd55FEpN5QqDN43rQ/formResponse'; // Sustituye con tu URL de Google Form

    const nombreEntry = 'entry.977929139';
    const emailEntry = 'entry.1185937400';
    const numeroEntry = 'entry.1905775892';
    const mensajeEntry = 'entry.450646345';

    const params = new URLSearchParams();
    params.append(nombreEntry, data.get('nombre'));
    params.append(emailEntry, data.get('email'));
    params.append(numeroEntry, data.get('numero'));
    params.append(mensajeEntry, data.get('mensaje'));

    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: params
    }).then(response => {
        console.log('Formulario enviado');
        form.reset();
    }).catch(error => console.error('Error:', error));
}