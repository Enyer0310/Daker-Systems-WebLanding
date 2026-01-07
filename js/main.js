const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita que la página se recargue o se vaya a otra web
        
        const status = document.createElement("p"); // Para mostrar un mensaje de éxito
        status.style.marginTop = "20px";
        status.style.color = "var(--accent-orange)";
        status.style.fontWeight = "bold";

        const data = new FormData(event.target);
        
        // Enviamos los datos
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // ÉXITO: Limpiamos el formulario y avisamos
                status.innerHTML = "¡Mensaje enviado con éxito! Nos vemos en WhatsApp.";
                form.appendChild(status);
                form.reset(); // <--- ¡ESTO LIMPIA LOS CAMPOS!
                
                // Borramos el mensaje de éxito después de 5 segundos
                setTimeout(() => status.remove(), 5000);
            } else {
                // ERROR
                status.innerHTML = "Ups! Hubo un problema al enviar.";
                form.appendChild(status);
            }
        }).catch(error => {
            status.innerHTML = "Ups! Hubo un error de conexión.";
            form.appendChild(status);
        });
    });

    // Esto pone el año actual automáticamente cada vez que carga la web
document.querySelector('.footer__credits').innerHTML = `&copy; ${new Date().getFullYear()} Daker Systems. Diseñado para el éxito digital.`;
}
