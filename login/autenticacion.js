import { supabase } from '../js/supabaseClient.js';

// --- Lógica de Registro ---
const registroForm = document.getElementById('registroForm');
if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('btnRegistro');
        const errorDiv = document.getElementById('registroError');
        btn.textContent = 'Cargando...';
        btn.disabled = true;
        errorDiv.style.display = 'none';

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rol = document.getElementById('rol').value;

        try {
            // 1. Registrar al usuario en el sistema de Auth de Supabase
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (authError) throw authError;

            // 2. Si el registro fue exitoso, insertamos sus datos en nuestra tabla 'perfiles'
            if (authData.user) {
                const { error: profileError } = await supabase
                    .from('perfiles')
                    .insert([
                        {
                            id: authData.user.id,
                            email: email,
                            nombre_completo: nombre,
                            rol: rol
                        }
                    ]);

                if (profileError) throw profileError;

                alert('Registro exitoso. Revisa tu correo o inicia sesión directamente (según la configuración de tu Supabase).');
                window.location.href = 'login.html';
            }
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        } finally {
            btn.textContent = 'Registrarse';
            btn.disabled = false;
        }
    });
}

// --- Lógica de Login ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('btnLogin');
        const errorDiv = document.getElementById('loginError');
        btn.textContent = 'Verificando...';
        btn.disabled = true;
        errorDiv.style.display = 'none';

        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passwordLogin').value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            // Consultar el rol del usuario para redirigirlo
            const { data: perfilInfo, error: perfilError } = await supabase
                .from('perfiles')
                .select('rol')
                .eq('id', data.user.id)
                .single();

            if (perfilError) throw perfilError;

            alert(`¡Bienvenido de vuelta! Ingresaste como: ${perfilInfo.rol}`);

            // Redirección basada en el rol
            if (perfilInfo.rol === 'vendedor') {
                // Aquí iría el panel del vendedor
                window.location.href = '../index.html';
            } else {
                // Catálogo del cliente
                window.location.href = '../index.html';
            }

        } catch (error) {
            errorDiv.textContent = 'Credenciales inválidas. Inténtalo de nuevo.';
            errorDiv.style.display = 'block';
        } finally {
            btn.textContent = 'Entrar';
            btn.disabled = false;
        }
    });
}