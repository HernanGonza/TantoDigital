document.addEventListener('DOMContentLoaded', () => {
  // Despertar el backend apenas carga la página
  fetch('https://tanto-contact-backend.onrender.com/')
    .then(() => console.log('Backend despierto'))
    .catch(err => console.warn('No se pudo despertar el backend:', err));

  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMessage');
  const loader = document.getElementById('loader');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Mostrar loader
    loader.classList.remove('d-none');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const data = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      mensaje: document.getElementById('mensaje').value,
    };

    try {
      const response = await fetch('https://tanto-contact-backend.onrender.com/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === 'success') {
        form.reset();
        successMsg.style.display = 'block';
      } else {
        alert('Hubo un error al enviar tu mensaje.');
      }
    } catch (err) {
      alert('Error de conexión con el servidor.');
      console.error(err);
    } finally {
      // Ocultar loader y resetear botón
      loader.classList.add('d-none');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }
  });
});
