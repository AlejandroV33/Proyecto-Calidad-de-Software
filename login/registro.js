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

                alert('Registro exitoso.');
                window.location.href = 'login.html';
            }
        } catch (error) {
            if (error.message === 'User already registered') {
                errorDiv.textContent = 'Este correo ya está registrado. Por favor, inicia sesión o usa otro correo.';
                errorDiv.style.display = 'block';
            } else {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            }
        } finally {
            btn.textContent = 'Registrarse';
            btn.disabled = false;
        }
    });
}