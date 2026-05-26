import { supabase } from './supabaseClient.js';

const gridProductos = document.getElementById('gridProductos');
const formFiltros = document.getElementById('formFiltros');

// Cargar categorías en el select de filtros
async function cargarCategorias() {
    const select = document.getElementById('filtroCategoria');
    const { data, error } = await supabase.from('categorias').select('*');
    if (!error && data) {
        data.forEach(cat => {
            select.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
        });
    }
}

// Cargar catálogo con los criterios de aceptación (Filtros)
async function cargarCatalogo() {
    gridProductos.innerHTML = '<p>Cargando productos...</p>';

    const nombre = document.getElementById('filtroNombre').value;
    const precioMax = document.getElementById('filtroPrecio').value;
    const categoria = document.getElementById('filtroCategoria').value;

    let query = supabase.from('productos').select('*, categorias(nombre)');

    // Filtrar productos con stock disponible
    query = query.gt('stock', 0);

    // Aplicar filtros según la historia de usuario
    if (nombre) query = query.ilike('nombre', `%${nombre}%`);
    if (precioMax) query = query.lte('precio', precioMax);
    if (categoria) query = query.eq('categoria_id', categoria);

    const { data, error } = await query;

    if (error) {
        gridProductos.innerHTML = '<p>Error al cargar el catálogo.</p>';
        return;
    }

    gridProductos.innerHTML = '';
    if (data.length === 0) {
        gridProductos.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    data.forEach(prod => {
        gridProductos.innerHTML += `
            <div class="card fade-in visible">
                <img src="${prod.imagen_url || 'https://via.placeholder.com/150'}" alt="${prod.nombre}" style="width:100%; height: 200px; object-fit: cover; border-radius:8px;">
                <h3 style="margin-top: 1rem;">${prod.nombre}</h3>
                <p style="color: var(--text-muted);">${prod.categorias.nombre}</p>
                <p>${prod.descripcion.substring(0, 60)}...</p>
                <h2 style="color: var(--primary-color); margin: 0.5rem 0;">$${prod.precio}</h2>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <button class="btn btn-outline" onclick="verDetalles('${prod.id}')" style="width: 100%;">Ver Detalles</button>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${prod.id}')" style="width: 100%;">Agregar al Carrito</button>
                </div>
            </div>
        `;
    });
}

// Función para ver detalles del producto
window.verDetalles = async (id) => {
    const { data: prod, error } = await supabase
        .from('productos')
        .select('*, categorias(nombre)')
        .eq('id', id)
        .single();

    if (error || !prod) {
        alert("No se pudo cargar la información del producto.");
        return;
    }

    const modal = document.getElementById('modalDetalles');
    const contenido = document.getElementById('detalleContenido');

    contenido.innerHTML = `
        <div style="flex: 1; min-width: 300px;">
            <img src="${prod.imagen_url || 'https://via.placeholder.com/150'}" alt="${prod.nombre}" style="width:100%; border-radius:12px; box-shadow: var(--shadow-md);">
        </div>
        <div style="flex: 1.2; min-width: 300px; display: flex; flex-direction: column; justify-content: center;">
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${prod.nombre}</h1>
            <p style="color: var(--primary-color); font-weight: bold; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">${prod.categorias.nombre}</p>
            <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">${prod.descripcion}</p>
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h2 style="color: var(--primary-color); font-size: 2rem; margin-bottom: 0.5rem;">$${prod.precio}</h2>
                <p style="color: ${prod.stock > 0 ? '#28a745' : '#dc3545'}; font-weight: 600;">
                    ${prod.stock > 0 ? `Stock Disponible: ${prod.stock}` : 'Sin Stock'}
                </p>
            </div>
            <button class="btn btn-primary" onclick="agregarAlCarrito('${prod.id}')" style="padding: 1rem; font-size: 1.1rem;">Agregar al Carrito</button>
        </div>
    `;

    modal.style.display = 'block';
};

// Cerrar modal
document.getElementById('cerrarModal').onclick = () => {
    document.getElementById('modalDetalles').style.display = 'none';
};

window.onclick = (event) => {
    const modal = document.getElementById('modalDetalles');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Para usar en el botón de agregar al carrito
window.agregarAlCarrito = async (id) => {
    // 1. Verificar si el usuario está logueado
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        alert("Debes iniciar sesión para añadir productos al carrito.");
        window.location.href = 'login/login.html';
        return;
    }

    const usuarioId = session.user.id;

    // 2. Verificar si el producto ya está en el carrito de la base de datos
    const { data: itemExistente, error: errorBusqueda } = await supabase
        .from('carrito')
        .select('*')
        .eq('usuario_id', usuarioId)
        .eq('producto_id', id)
        .single();

    if (errorBusqueda && errorBusqueda.code !== 'PGRST116') { // PGRST116 es "no se encontraron filas"
        console.error('Error al buscar en el carrito:', errorBusqueda);
        return;
    }

    if (itemExistente) {
        // Actualizar cantidad
        const { error: errorUpdate } = await supabase
            .from('carrito')
            .update({ cantidad: itemExistente.cantidad + 1 })
            .eq('id', itemExistente.id);
        
        if (errorUpdate) console.error('Error al actualizar cantidad:', errorUpdate);
    } else {
        // Insertar nuevo item
        const { error: errorInsert } = await supabase
            .from('carrito')
            .insert([{ usuario_id: usuarioId, producto_id: id, cantidad: 1 }]);
        
        if (errorInsert) console.error('Error al insertar en el carrito:', errorInsert);
    }

    alert("¡Producto agregado al carrito!");
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    cargarCatalogo();

    // Escuchar el botón de buscar
    if(formFiltros) {
        formFiltros.addEventListener('submit', (e) => {
            e.preventDefault();
            cargarCatalogo();
        });
    }
});