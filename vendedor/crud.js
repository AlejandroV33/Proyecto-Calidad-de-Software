import { supabase } from '../js/supabaseClient.js';

let usuarioActual = null;
const formProducto = document.getElementById('formProducto');
const listaMisProductos = document.getElementById('listaMisProductos');

// Verificar sesión y rol
async function verificarSesion() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = '../login/login.html';
        return;
    }

    // Verificar que sea vendedor
    const { data: perfil } = await supabase
        .from('perfiles')
        .select('rol')
        .eq('id', session.user.id)
        .single();

    if (perfil.rol !== 'vendedor') {
        alert('Acceso denegado. No eres vendedor.');
        window.location.href = '../index.html';
        return;
    }

    usuarioActual = session.user.id;
    cargarCategorias();
    cargarMisProductos();
}

// Cargar categorías en el formulario
async function cargarCategorias() {
    const select = document.getElementById('prodCategoria');
    const { data } = await supabase.from('categorias').select('*');
    if (data) {
        data.forEach(cat => {
            select.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
        });
    }
}

// Mostrar los productos que pertenecen solo a este vendedor
async function cargarMisProductos() {
    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('vendedor_id', usuarioActual);

    listaMisProductos.innerHTML = '';
    if (data && data.length > 0) {
        data.forEach(prod => {
            listaMisProductos.innerHTML += `
                <div class="card">
                    <h4>${prod.nombre}</h4>
                    <p>Precio: $${prod.precio} | Stock: ${prod.stock}</p>
                    <button class="btn btn-outline" onclick="eliminarProducto('${prod.id}')" style="margin-top: 1rem; color: red; border-color: red;">Eliminar</button>
                </div>
            `;
        });
    } else {
        listaMisProductos.innerHTML = '<p>No has agregado ningún producto.</p>';
    }
}

// Crear producto
if (formProducto) {
    formProducto.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nuevoProducto = {
            vendedor_id: usuarioActual,
            nombre: document.getElementById('prodNombre').value,
            descripcion: document.getElementById('prodDesc').value,
            precio: parseFloat(document.getElementById('prodPrecio').value),
            stock: parseInt(document.getElementById('prodStock').value),
            imagen_url: document.getElementById('prodImg').value,
            categoria_id: parseInt(document.getElementById('prodCategoria').value)
        };

        const { error } = await supabase.from('productos').insert([nuevoProducto]);

        if (error) {
            alert('Error al guardar el producto');
        } else {
            formProducto.reset();
            cargarMisProductos(); // Recargar la lista
        }
    });
}

// Eliminar producto (Requisito CRUD)
window.eliminarProducto = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        await supabase.from('productos').delete().eq('id', id);
        cargarMisProductos();
    }
};

// Cerrar sesión
document.getElementById('btnCerrarSesion').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = '../login/login.html';
});

document.addEventListener('DOMContentLoaded', verificarSesion);