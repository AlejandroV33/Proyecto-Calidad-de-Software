import { supabase } from './supabaseClient.js';

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

    // Actualizar el Header basado en el estado de autenticación y la página actual
    actualizarHeader();
});

async function actualizarHeader() {
    const { data: { session } } = await supabase.auth.getSession();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const prefix = getPathPrefix();
    const path = window.location.pathname;

    // 1. Limpiar el contenedor para reconstruirlo de forma consistente
    navLinks.innerHTML = '';

    // 2. Definir las pestañas principales (Links de la izquierda)
    const pestañas = [
        { nombre: 'Catálogo', href: `${prefix}catalogo.html`, pattern: 'catalogo.html' },
        { nombre: '🛒 Mi Carrito', href: `${prefix}carrito/carrito.html`, pattern: 'carrito/carrito.html' },
        { nombre: 'Mis Pedidos', href: `${prefix}cliente/historial.html`, pattern: 'historial.html' }
    ];

    // Añadir "Seguir Comprando" solo si estamos en el carrito
    if (path.includes('carrito.html')) {
        pestañas.push({ nombre: 'Seguir Comprando', href: `${prefix}catalogo.html`, pattern: 'fake-never-active' });
    }

    pestañas.forEach(p => {
        const link = document.createElement('a');
        link.href = p.href;
        link.textContent = p.nombre;
        // Lógica para marcar pestaña activa
        if (path.includes(p.pattern)) {
            link.classList.add('active');
        }
        navLinks.appendChild(link);
    });

    // 3. Contenedor de Auth/Perfil (A la derecha)
    const authContainer = document.createElement('div');
    authContainer.className = 'auth-container-header';

    if (session) {
        const { data: perfil } = await supabase
            .from('perfiles')
            .select('nombre_completo, rol')
            .eq('id', session.user.id)
            .single();

        if (perfil) {
            // Si es vendedor, añadir link al panel antes del perfil
            if (perfil.rol === 'vendedor') {
                const dashboardLink = document.createElement('a');
                dashboardLink.href = `${prefix}vendedor/dashboard.html`;
                dashboardLink.textContent = 'Panel Vendedor';
                dashboardLink.style.color = 'white';
                dashboardLink.style.marginRight = '1rem';
                if (path.includes('dashboard.html')) dashboardLink.classList.add('active');
                authContainer.appendChild(dashboardLink);
            }

            // Nombre y Rol
            const userInfo = document.createElement('span');
            userInfo.innerHTML = `<strong>${perfil.nombre_completo}</strong> <small style="opacity:0.8">(${perfil.rol})</small>`;
            userInfo.style.color = 'white';

            // Icono
            const profileIcon = document.createElement('div');
            profileIcon.style.width = '30px';
            profileIcon.style.height = '30px';
            profileIcon.style.borderRadius = '50%';
            profileIcon.style.backgroundColor = 'rgba(255,255,255,0.2)';
            profileIcon.style.display = 'flex';
            profileIcon.style.alignItems = 'center';
            profileIcon.style.justifyContent = 'center';
            profileIcon.style.color = 'white';
            profileIcon.innerHTML = '👤';

            // Botón Cerrar Sesión
            const btnLogout = document.createElement('button');
            btnLogout.textContent = 'Cerrar Sesión';
            btnLogout.className = 'btn btn-logout';
            btnLogout.style.padding = '0.3rem 0.8rem';
            btnLogout.style.fontSize = '0.85rem';
            btnLogout.onclick = async () => {
                await supabase.auth.signOut();
                window.location.href = `${prefix}index.html`;
            };

            authContainer.appendChild(profileIcon);
            authContainer.appendChild(userInfo);
            authContainer.appendChild(btnLogout);
        }
    } else {
        // Enlaces de Iniciar Sesión / Registro para usuarios no logueados
        const loginLink = document.createElement('a');
        loginLink.href = `${prefix}login/login.html`;
        loginLink.textContent = 'Iniciar Sesión';
        loginLink.style.color = 'white';
        if (path.includes('login.html')) loginLink.classList.add('active');

        const registroLink = document.createElement('a');
        registroLink.href = `${prefix}login/registro.html`;
        registroLink.textContent = 'Registrarse';
        registroLink.className = 'btn btn-outline';
        registroLink.style.color = 'white';
        registroLink.style.borderColor = 'white';
        if (path.includes('registro.html')) registroLink.classList.add('active');

        authContainer.appendChild(loginLink);
        authContainer.appendChild(registroLink);
    }

    navLinks.appendChild(authContainer);
}

function getPathPrefix() {
    const path = window.location.pathname;
    if (path.includes('/login/') || path.includes('/vendedor/') || path.includes('/carrito/') || path.includes('/cliente/')) {
        return '../';
    }
    return '';
}
