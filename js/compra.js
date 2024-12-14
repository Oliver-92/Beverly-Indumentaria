// Recuperar los datos del localStorage
let productos = JSON.parse(localStorage.getItem('productos')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

// Mostrar el resumen de la compra
const resumen = document.getElementById("details");

// Función para agrupar productos
const agruparProductos = () => {
    let productosAgrupados = {};

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        if (productosAgrupados[producto.nombre]) {
            productosAgrupados[producto.nombre].cantidad += 1;
        } else {
            productosAgrupados[producto.nombre] = {
                cantidad: 1,
                precio: producto.precio,
            };
        }
    }

    return productosAgrupados;
};

// Función para actualizar el resumen

const actualizarResumen = () => {
    const productosAgrupados = agruparProductos();

    // Ordenar productos por su nombre
    const productosOrdenados = Object.entries(productosAgrupados).sort((a, b) =>
        a[0].localeCompare(b[0])
    );

    let resumenTexto = "Resumen de la compra:<br><br>";

    for (const [nombre, info] of productosOrdenados) {
        resumenTexto += `
            <div class="d-flex align-items-center justify-content-between mb-2">
                <!-- Columna del nombre -->
                <div class="text-start text-truncate" style="flex: 2; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${nombre}
                </div>
    
                <!-- Columna de botones y cantidad (en la misma fila) -->
                <div class="d-flex align-items-center justify-content-center" style="flex: 1; min-width: 150px;">
                    <button class="btn btn-outline-danger btn-sm me-2" onclick="modificarCantidad('${nombre}', 'restar')" title="Quitar">
                        <i class="bi bi-dash-circle"></i>
                    </button>
                    <span>(x${info.cantidad})</span>
                    <button class="btn btn-outline-success btn-sm ms-2" onclick="modificarCantidad('${nombre}', 'sumar')" title="Agregar">
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
    
                <!-- Columna del precio -->
                <div class="text-end fw-bold" style="flex: 1; min-width: 80px;">
                    $${(info.precio * info.cantidad)}
                </div>
            </div>
        `;
    }

    resumenTexto += `<br>Total a pagar: $${total}`;
    resumen.innerHTML = resumenTexto;
};


// Función para modificar la cantidad de un producto
const modificarCantidad = (nombre, accion) => {
    const index = productos.findIndex(producto => producto.nombre === nombre);

    if (accion === "sumar") {
        // Agregar el producto al carrito
        productos.push({ nombre, precio: agruparProductos()[nombre].precio });
        total += agruparProductos()[nombre].precio;
    } else if (accion === "restar" && index !== -1) {
        // Eliminar el producto del carrito
        total -= productos[index].precio;
        productos.splice(index, 1);
    }

    // Actualizar localStorage
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('total', total.toFixed(2));

    // Actualizar el resumen
    actualizarResumen();
};

// Inicializar el resumen al cargar la página
actualizarResumen();


function limpiarCarrito() {
    if (confirm("Vaciar carrito?")) {
        productos = [];
        total = 0;
        resumenTexto = ""
        resumen.innerHTML = "";
        const inputs = document.getElementsByTagName("input");

        // Recorre cada input y limpia su valor
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }

        // Limpia los datos del sessionStorage
        localStorage.removeItem('productos');
        localStorage.removeItem('total');
    }
};

// Función envío del Formulario
function enviarFormulario(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (confirm('¿Confirmar compra?')) {
        // Obtiene datos de contacto
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('contactoEmail').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        if (!nombre || !apellido || !email || !telefono) {
            alert("Por favor, completa todos los campos de contacto.");
            return; // Detiene la ejecución de la función hasta que pase el `if`
        }

        // Agrupar productos por nombre
        const productosAgrupados = agruparProductos();

        // Crear el resumen del carrito con cantidades
        let carritoContenido = '';
        for (const [nombre, info] of Object.entries(productosAgrupados)) {
            carritoContenido += `${nombre} (x${info.cantidad}) - $${(info.precio * info.cantidad).toFixed(2)}\n`;
        }

        // Agrega al valor total el signo de pesos $
        const totalConPesos = `$${parseFloat(total).toFixed(2)}`;

        // Asigna los datos al formulario
        document.getElementById('carritoData').value = carritoContenido;
        document.getElementById('totalCarrito').value = totalConPesos;

        // Envía el formulario a Formspree
        document.getElementById('formulario').submit();
    }
}

// Asociamos el evento al botón de enviar
document.getElementById('btn-send').addEventListener('click', enviarFormulario);
document.getElementById('btn-remove').addEventListener('click', limpiarCarrito);