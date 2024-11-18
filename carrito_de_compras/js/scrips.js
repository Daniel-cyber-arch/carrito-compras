// Inicializamos el carrito como un arreglo vacío
let carrito = [];

// Función para añadir productos al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    // Verificar si el producto ya existe en el carrito
    let productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya existe, aumentar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si el producto no existe, añadir un nuevo objeto al carrito
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }
    actualizarCarrito();
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(producto => producto.nombre !== nombre);
    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const carritoBody = document.querySelector('.tbody');
    const totalElement = document.querySelector('.itemCartTotal');
    carritoBody.innerHTML = '';  // Limpiar el contenido actual

    // Llenar la tabla con los productos del carrito
    carrito.forEach((producto, index) => {
        carritoBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${producto.imagen}" width="50" alt="${producto.nombre}"> ${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td>
                    <input type="number" class="form-control" value="${producto.cantidad}" min="1" 
                    onchange="actualizarCantidad('${producto.nombre}', this.value)">
                </td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
                </td>
            </tr>
        `;
    });

    // Calcular el total
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalElement.textContent = `Total: $ ${total.toFixed(2)}`;
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(nombre, cantidad) {
    const producto = carrito.find(producto => producto.nombre === nombre);
    if (producto) {
        producto.cantidad = parseInt(cantidad);
    }
    actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Función para comprar (simulación)
function comprar() {
    if (carrito.length > 0) {
        alert('¡Gracias por tu compra!');
        vaciarCarrito();
    } else {
        alert('Tu carrito está vacío.');
    }
}

// Asignar eventos a los botones "Añadir a Carrito"
document.querySelectorAll('.button').forEach((btn, index) => {
    const producto = document.querySelectorAll('.card')[index];
    const nombre = producto.querySelector('.card-title').textContent;
    const precio = parseFloat(producto.querySelector('.Precio').textContent.replace('$', '').replace('.', ''));
    const imagen = producto.querySelector('img').src;

    btn.addEventListener('click', () => agregarAlCarrito(nombre, precio, imagen));
});

// Evento de compra
document.querySelector('.btn-success').addEventListener('click', comprar);

// Inicializar el carrito
actualizarCarrito();

