// Esperamos a que todo el HTML cargue para que el JS encuentre los elementos
document.addEventListener("DOMContentLoaded", function() {

    // 1. MANEJO DEL FORMULARIO
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault(); 
            
            // Creamos el mensaje de estado
            const status = document.createElement("p");
            status.style.marginTop = "20px";
            status.style.color = "#f27405"; // Naranja Daker
            status.style.fontWeight = "bold";
            status.style.textAlign = "center";

            const data = new FormData(event.target);
            
            // Enviamos los datos a Formspree vía Fetch
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // ÉXITO
                    status.innerHTML = "¡Mensaje enviado con éxito! Te contactaremos pronto.";
                    form.appendChild(status);
                    form.reset(); // Limpia los campos
                    
                    // Borramos el mensaje después de 5 segundos
                    setTimeout(() => status.remove(), 5000);
                } else {
                    // ERROR DE SERVIDOR
                    status.innerHTML = "¡Ups! Hubo un problema al enviar. Intenta de nuevo.";
                    form.appendChild(status);
                }
            }).catch(error => {
                // ERROR DE CONEXIÓN
                status.innerHTML = "¡Ups! Hubo un error de conexión.";
                form.appendChild(status);
            });
        });
    }

    // 2. AÑO AUTOMÁTICO EN EL FOOTER
    const footerCredits = document.querySelector('.footer__credits');
    if (footerCredits) {
        footerCredits.innerHTML = `&copy; ${new Date().getFullYear()} Daker Systems. Todos los derechos reservados.`;
    }

});
