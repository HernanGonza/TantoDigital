const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
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
      }
    });