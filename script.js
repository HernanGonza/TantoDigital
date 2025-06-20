document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const loaderOverlay = document.getElementById('loaderOverlay');
  const submitBtn = form.querySelector('button[type="submit"]');
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));

  const contactModal = document.getElementById('contactModal');
  contactModal.addEventListener('show.bs.modal', () => {
    // Al abrir el modal, despertamos el back
    fetch('https://tanto-contact-backend.onrender.com/')
      .then(() => console.log('Backend activado'))
      .catch(err => console.warn('No se pudo despertar el backend:', err));
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    loaderOverlay.classList.remove('d-none');
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
        bootstrap.Modal.getInstance(contactModal).hide();
        successModal.show();
        setTimeout(() => {
          successModal.hide();
        }, 3500);
      } else {
        alert('Hubo un error al enviar tu mensaje.');
      }
    } catch (err) {
      alert('Error de conexión con el servidor.');
      console.error(err);
    } finally {
      loaderOverlay.classList.add('d-none');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }
  });
});
