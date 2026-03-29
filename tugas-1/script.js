document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // FITUR 1: Dark Mode Toggle (dengan localStorage)
    // ============================================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Terapkan tema tersimpan
    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode(false);
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode(true);
        }
    });

    function enableDarkMode(save = true) {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<span class="icon">☀️</span><span class="toggle-label">Light Mode</span>';
        if (save) localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<span class="icon">🌙</span><span class="toggle-label">Dark Mode</span>';
        localStorage.setItem('theme', 'light');
    }


    // ============================================================
    // FITUR 2: Countdown Timer
    // ============================================================
    const eventDate = new Date('2024-10-15T09:00:00');

    function updateCountdown() {
        const now  = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            document.getElementById('countdown').innerHTML =
                '<p style="color:rgba(255,255,255,0.6);font-size:1rem;letter-spacing:0.05em">🎉 Event sedang berlangsung!</p>';
            return;
        }

        const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs  = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
        document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // ============================================================
    // FITUR 3: Validasi Form & Manipulasi DOM (Success State)
    // ============================================================
    const form               = document.getElementById('registration-form');
    const registrationSection = document.getElementById('registration-section');

    const fields = {
        name:   { input: document.getElementById('fullName'), error: document.getElementById('name-error') },
        email:  { input: document.getElementById('email'),    error: document.getElementById('email-error') },
        status: { input: document.getElementById('status'),   error: document.getElementById('status-error') },
    };

    // Hapus error real-time saat user mengedit field
    Object.values(fields).forEach(({ input, error }) => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
            error.style.display = 'none';
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) submitForm();
    });

    function validateForm() {
        let valid = true;

        // Nama minimal 3 karakter
        const nameVal = fields.name.input.value.trim();
        if (nameVal.length < 3) {
            showError('name');
            valid = false;
        }

        // Format email
        const emailVal  = fields.email.input.value.trim();
        const emailRgx  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRgx.test(emailVal)) {
            showError('email');
            valid = false;
        }

        // Status harus dipilih
        if (!fields.status.input.value) {
            showError('status');
            valid = false;
        }

        return valid;
    }

    function showError(fieldName) {
        fields[fieldName].input.classList.add('invalid');
        fields[fieldName].error.style.display = 'block';
    }

    function submitForm() {
        const name   = fields.name.input.value.trim();
        const status = fields.status.input.options[fields.status.input.selectedIndex].text;

        // Manipulasi DOM: ganti form dengan pesan sukses
        const formCard = registrationSection.querySelector('.form-card');
        formCard.innerHTML = `
            <div class="success-box">
                <span class="success-icon">🎉</span>
                <h2>Pendaftaran Berhasil!</h2>
                <p>Terima kasih, <strong>${name}</strong>.</p>
                <p>Tiket sebagai <strong>${status}</strong> telah dipesan.</p>
                <p style="margin-top:8px">Konfirmasi akan dikirim ke email Anda.</p>
            </div>
        `;

        // Scroll ke form card agar user melihat pesan sukses
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }


    // ============================================================
    // FITUR 4: Header shadow on scroll
    // ============================================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 10
            ? '0 4px 20px rgba(0,0,0,0.1)'
            : 'none';
    }, { passive: true });

});
