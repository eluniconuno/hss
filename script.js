document.addEventListener('DOMContentLoaded', () => {
        // Hamburger menu logic
        const hamburger = document.getElementById('hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('open');
            });
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    navLinks.classList.toggle('open');
                }
            });
            // Fecha o menu ao clicar em um link (mobile UX)
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                });
            });
        }
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 1)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ROI Simulator Logic (atualizado)
    const medicosInput = document.getElementById('num-medicos');
    const medicosVal = document.getElementById('medicos-val');
    const horasVal = document.getElementById('horas-val');
    const economiaVal = document.getElementById('economia-val');
    const paybackVal = document.getElementById('payback-val');

    if (medicosInput && medicosVal && horasVal && economiaVal && paybackVal) {
        medicosInput.addEventListener('input', (e) => {
            const val = Number(e.target.value);
            medicosVal.textContent = `${val} médicos`;

            // Horas salvas
            const horasEconomizadas = val * 4;
            animateValue(horasVal, parseInt(horasVal.textContent), horasEconomizadas, 400, 'h');

            // Economia operacional
            const economia = horasEconomizadas * 25;
            animateValue(economiaVal, parseInt(economiaVal.textContent.replace(/\D/g, '')), economia, 400, 'R$ ');

            // Payback
            const mensalidade = 2500;
            let paybackMsg = '';
            if (economia >= mensalidade) {
                paybackMsg = 'Positivo no 1º mês';
            } else {
                const meses = Math.ceil(mensalidade / economia);
                paybackMsg = `Positivo no ${meses}º mês`;
            }
            paybackVal.textContent = paybackMsg;
        });
    }

    function animateValue(obj, start, end, duration, prefix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let value = Math.floor(progress * (end - start) + start);
            if (prefix === 'h') {
                obj.innerHTML = value + 'h';
            } else if (prefix === 'R$ ') {
                obj.innerHTML = 'R$ ' + value.toLocaleString('pt-BR');
            } else {
                obj.innerHTML = prefix + value;
            }
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
