import { supabase } from '../js/supabaseClient.js';

const listaCarrito = document.getElementById('listaCarrito');
const totalCarritoEl = document.getElementById('totalCarrito');
const btnConfirmar = document.getElementById('btnConfirmar');
const msgError = document.getElementById('msgError');

let carritoActual = [];

// Mostrar productos del carrito (Desde Base de Datos)
async function renderizarCarrito() {
    listaCarrito.innerHTML = '<p>Cargando carrito...</p>';
    
    // 1. Verificar sesión
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        listaCarrito.innerHTML = '<p>Debes iniciar sesión para ver tu carrito.</p>';
        btnConfirmar.disabled = true;
        return;
    }

    // 2. Obtener items del carrito junto con info de productos
    const { data: items, error } = await supabase
        .from('carrito')
        .select(`
            id,
            cantidad,
            producto_id,
            productos (
                id,
                nombre,
                precio,
                imagen_url
            )
        `)
        .eq('usuario_id', session.user.id);

    if (error) {
        listaCarrito.innerHTML = '<p>Error al cargar el carrito.</p>';
        return;
    }

    carritoActual = items;
    listaCarrito.innerHTML = '';
    let total = 0;

    if (carritoActual.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalCarritoEl.textContent = '0.00';
        btnConfirmar.disabled = true;
        return;
    }

    btnConfirmar.disabled = false;

    carritoActual.forEach((item) => {
        const prod = item.productos;
        const subtotal = prod.precio * item.cantidad;
        total += subtotal;

        listaCarrito.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #eee;">
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <img src="${prod.imagen_url || 'https://via.placeholder.com/50'}" style="width: 50px; height: 50px; border-radius: 4px;">
                    <div>
                        <h4>${prod.nombre}</h4>
                        <p style="color: var(--text-muted);">$${prod.precio} c/u</p>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <input type="number" min="1" value="${item.cantidad}" onchange="actualizarCant('${item.id}', this.value)" style="width: 60px; padding: 0.3rem;">
                    <button class="btn btn-outline" onclick="eliminarItem('${item.id}')" style="color: red; border-color: red; padding: 0.3rem 0.6rem;">X</button>
                </div>
            </div>
        `;
    });
    totalCarritoEl.textContent = total.toFixed(2);
}

// Actualizar cantidad en la BD
window.actualizarCant = async (itemId, nuevaCantidad) => {
    let cant = parseInt(nuevaCantidad);
    
    // Evitar valores negativos o cero en el input
    if (isNaN(cant) || cant < 1) {
        cant = 1;
    }

    const { error } = await supabase
        .from('carrito')
        .update({ cantidad: cant })
        .eq('id', itemId);

    if (error) {
        console.error('Error al actualizar:', error);
    }
    
    // Siempre renderizar para corregir el valor en el input visualmente
    renderizarCarrito();
};

// Eliminar item de la BD
window.eliminarItem = async (itemId) => {
    if (!confirm('¿Quitar este producto del carrito?')) return;
    const { error } = await supabase
        .from('carrito')
        .delete()
        .eq('id', itemId);

    if (error) {
        console.error('Error al eliminar:', error);
    } else {
        renderizarCarrito();
    }
};

// Confirmar Compra
btnConfirmar.addEventListener('click', async () => {
    // Validación de seguridad adicional
    if (carritoActual.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const tieneCantidadesInvalidas = carritoActual.some(item => item.cantidad < 1);
    if (tieneCantidadesInvalidas) {
        alert("Hay productos con cantidades no válidas. Por favor corrígelas.");
        return;
    }

    btnConfirmar.textContent = 'Procesando...';
    btnConfirmar.disabled = true;
    msgError.style.display = 'none';

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = '../login/login.html';
        return;
    }

    try {
        // Llamar a la función atómica en la base de datos
        const { data: pedidoId, error: errorProcesamiento } = await supabase.rpc('procesar_pedido_v2', {
            p_usuario_id: session.user.id
        });

        if (errorProcesamiento) {
            // Manejar errores de stock lanzados por la BD
            if (errorProcesamiento.message.includes('Stock insuficiente')) {
                alert(errorProcesamiento.message);
            } else {
                throw errorProcesamiento;
            }
            return;
        }

        alert("¡Compra confirmada! Tu pedido ha sido registrado y el stock actualizado.");
        window.location.href = '../cliente/historial.html';

    } catch (error) {
        console.error(error);
        msgError.textContent = "Hubo un error al procesar tu compra.";
        msgError.style.display = 'block';
    } finally {
        btnConfirmar.textContent = 'Confirmar Compra';
        btnConfirmar.disabled = false;
    }
});

document.addEventListener('DOMContentLoaded', renderizarCarrito);
