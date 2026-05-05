import { supabase } from '../js/supabaseClient.js';

const listaCarrito = document.getElementById('listaCarrito');
const totalCarritoEl = document.getElementById('totalCarrito');
const btnConfirmar = document.getElementById('btnConfirmar');
const msgError = document.getElementById('msgError');

let carritoActual = JSON.parse(localStorage.getItem('techcart_carrito')) || [];

// Mostrar productos del carrito (01H7)
async function renderizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    if (carritoActual.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalCarritoEl.textContent = '0.00';
        btnConfirmar.disabled = true;
        return;
    }

    btnConfirmar.disabled = false;

    // Obtener detalles de los productos desde Supabase
    const ids = carritoActual.map(item => item.id);
    const { data: productos, error } = await supabase
        .from('productos')
        .select('id, nombre, imagen_url')
        .in('id', ids);

    if (productos) {
        carritoActual.forEach((item, index) => {
            const infoProd = productos.find(p => p.id === item.id);
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            listaCarrito.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #eee;">
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <img src="${infoProd.imagen_url || 'https://via.placeholder.com/50'}" style="width: 50px; height: 50px; border-radius: 4px;">
                        <div>
                            <h4>${infoProd.nombre}</h4>
                            <p style="color: var(--text-muted);">$${item.precio} c/u</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <input type="number" min="1" value="${item.cantidad}" onchange="actualizarCant(${index}, this.value)" style="width: 60px; padding: 0.3rem;">
                        <button class="btn btn-outline" onclick="eliminarItem(${index})" style="color: red; border-color: red; padding: 0.3rem 0.6rem;">X</button>
                    </div>
                </div>
            `;
        });
        totalCarritoEl.textContent = total.toFixed(2);
    }
}

// 01H7: Actualizar cantidad y Eliminar
window.actualizarCant = (index, nuevaCantidad) => {
    carritoActual[index].cantidad = parseInt(nuevaCantidad);
    localStorage.setItem('techcart_carrito', JSON.stringify(carritoActual));
    renderizarCarrito();
};

window.eliminarItem = (index) => {
    carritoActual.splice(index, 1);
    localStorage.setItem('techcart_carrito', JSON.stringify(carritoActual));
    renderizarCarrito();
};

// 01H10: Confirmar Compra
btnConfirmar.addEventListener('click', async () => {
    btnConfirmar.textContent = 'Procesando...';
    btnConfirmar.disabled = true;
    msgError.style.display = 'none';

    // 1. Verificar que el usuario tenga sesión iniciada
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        alert("Debes iniciar sesión para confirmar tu compra.");
        window.location.href = '../login/login.html';
        return;
    }

    try {
        const total = parseFloat(totalCarritoEl.textContent);

        // 2. Crear el pedido con estado inicial "pendiente" (01H10)
        const { data: pedido, error: errorPedido } = await supabase
            .from('pedidos')
            .insert([{ cliente_id: session.user.id, estado: 'pendiente', total: total }])
            .select()
            .single();

        if (errorPedido) throw errorPedido;

        // 3. Insertar los detalles del pedido
        const detalles = carritoActual.map(item => ({
            pedido_id: pedido.id,
            producto_id: item.id,
            cantidad: item.cantidad,
            precio_unitario: item.precio
        }));

        const { error: errorDetalles } = await supabase.from('detalles_pedido').insert(detalles);
        if (errorDetalles) throw errorDetalles;

        // 4. Limpiar carrito y finalizar
        localStorage.removeItem('techcart_carrito');
        alert("¡Compra confirmada! Tu pedido está pendiente.");
        window.location.href = '../cliente/historial.html';

    } catch (error) {
        msgError.textContent = "Hubo un error al procesar tu compra.";
        msgError.style.display = 'block';
        btnConfirmar.textContent = 'Confirmar Compra';
        btnConfirmar.disabled = false;
    }
});

document.addEventListener('DOMContentLoaded', renderizarCarrito);
