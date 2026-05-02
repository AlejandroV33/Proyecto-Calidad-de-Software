// Manejo de animaciones globales y comportamientos compartidos
document.addEventListener('DOMContentLoaded', () => {
    // Animación de aparición suave (Fade-in)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach((el) => observer.observe(el));

    // Efecto de sombra en el navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.8rem 5%';
            } else {
                navbar.style.padding = '1rem 5%';
            }
        });
    }
});