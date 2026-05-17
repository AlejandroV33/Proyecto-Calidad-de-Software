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

    // Actualizar el Header basado en el estado de autenticación
    actualizarHeader();
});

async function actualizarHeader() {
    const { data: { session } } = await supabase.auth.getSession();
    const navLinks = document.querySelector('.nav-links');

    if (session && navLinks) {
        // Obtener datos del perfil
        const { data: perfil } = await supabase
            .from('perfiles')
            .select('nombre_completo, rol')
            .eq('id', session.user.id)
            .single();

        if (perfil) {
            // Limpiar enlaces de auth actuales (Iniciar Sesión / Registrarse)
            const authLinks = navLinks.querySelectorAll('a[href*="login"], a[href*="registro"]');
            authLinks.forEach(link => link.remove());

            // Crear el contenedor de perfil
            const profileDiv = document.createElement('div');
            profileDiv.style.display = 'flex';
            profileDiv.style.alignItems = 'center';
            profileDiv.style.gap = '1rem';
            profileDiv.style.marginLeft = '1rem';

            // Nombre y Rol
            const userInfo = document.createElement('span');
            userInfo.innerHTML = `<strong>${perfil.nombre_completo}</strong> (${perfil.rol})`;
            userInfo.style.color = 'white';

            // Icono (Simple con CSS)
            const profileIcon = document.createElement('div');
            profileIcon.style.width = '32px';
            profileIcon.style.height = '32px';
            profileIcon.style.borderRadius = '50%';
            profileIcon.style.backgroundColor = 'var(--primary-color)';
            profileIcon.style.display = 'flex';
            profileIcon.style.alignItems = 'center';
            profileIcon.style.justifyContent = 'center';
            profileIcon.style.color = 'white';
            profileIcon.innerHTML = '👤';

            // Botón Cerrar Sesión
            const btnLogout = document.createElement('button');
            btnLogout.textContent = 'Cerrar Sesión';
            btnLogout.className = 'btn btn-outline';
            btnLogout.style.padding = '0.4rem 1rem';
            btnLogout.style.fontSize = '0.9rem';
            btnLogout.onclick = async () => {
                await supabase.auth.signOut();
                // Redirigir al index relativo a la ubicación actual
                const prefix = getPathPrefix();
                window.location.href = `${prefix}index.html`;
            };

            profileDiv.appendChild(profileIcon);
            profileDiv.appendChild(userInfo);
            profileDiv.appendChild(btnLogout);
            navLinks.appendChild(profileDiv);

            // Si es vendedor, añadir link al dashboard si no está
            if (perfil.rol === 'vendedor') {
                const dashboardLink = document.createElement('a');
                const prefix = getPathPrefix();
                dashboardLink.href = `${prefix}vendedor/dashboard.html`;
                dashboardLink.textContent = 'Panel Vendedor';
                navLinks.insertBefore(dashboardLink, profileDiv);
            }
        }
    }
}

function getPathPrefix() {
    const path = window.location.pathname;
    if (path.includes('/login/') || path.includes('/vendedor/') || path.includes('/carrito/') || path.includes('/cliente/')) {
        return '../';
    }
    return '';
}
