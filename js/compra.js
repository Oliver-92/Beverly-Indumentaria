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
    let resumenTexto = "Resumen de la compra:<br><br>";

    for (const [nombre, info] of Object.entries(productosAgrupados)) {
        resumenTexto += `
            ${nombre} 
            <br>
            <button onclick="modificarCantidad('${nombre}', 'restar')">-</button> (x${info.cantidad}) 
            <button onclick="modificarCantidad('${nombre}', 'sumar')">+</button>:
            <br>
            $${(info.precio * info.cantidad).toFixed(2)}<br>
            <br><br>
        `;
    }

    resumenTexto += `<br>Total a pagar: $${total.toFixed(2)}`;
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