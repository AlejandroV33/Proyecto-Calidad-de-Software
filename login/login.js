import { supabase } from '../js/supabaseClient.js';

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('btnLogin');
        const errorDiv = document.getElementById('loginError');

        // Estado de carga
        btn.textContent = 'Verificando...';
        btn.disabled = true;
        errorDiv.style.display = 'none';

        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passwordLogin').value;

        try {
            // 1. Autenticar con Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            // 2. Consultar el rol del usuario en la tabla 'perfiles'
            // Esto es vital para cumplir con la historia de usuario de "Autenticación por roles"
            const { data: perfilInfo, error: perfilError } = await supabase
                .from('perfiles')
                .select('rol')
                .eq('id', data.user.id)
                .single();

            if (perfilError) throw perfilError;

            // 3. Redirección basada en el rol
            if (perfilInfo.rol === 'vendedor') {
                // Si es vendedor, lo mandamos a su panel de administración
                window.location.href = '../vendedor/dashboard.html';
            } else {
                // Si es cliente, lo mandamos al catálogo principal
                window.location.href = '../index.html';
            }

        } catch (error) {
            // Mostrar mensaje de error (Credenciales incorrectas)
            errorDiv.textContent = 'Credenciales inválidas. Verifica tu correo y contraseña.';
            errorDiv.style.display = 'block';
        } finally {
            // Restaurar el botón
            btn.textContent = 'Entrar';
            btn.disabled = false;
        }
    });
}