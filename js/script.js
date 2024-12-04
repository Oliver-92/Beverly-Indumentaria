// Tienda
let productos = [];
let total = 0;

const agregarProducto = (producto, precio) => {

    // Agrega productos al array
    productos.push({nombre: producto, precio: precio});

    // Actualizar total y count
    total += precio;
    count = productos.length;

    document.querySelector(".cart-info").style.display = "flex";
    document.querySelector(".cart-count").innerText = `(${count})`;
    document.querySelector(".cart-total").innerText = `$${total}`;

    console.log(productos)

}

// Muestra solo la categoría de productos seleccionada
document.getElementById('select-man-shop').addEventListener('click', function() {
    document.getElementById('man-shop').style.display = 'flex'; 
    document.getElementById('woman-shop').style.display = 'none'; 
});

document.getElementById('select-woman-shop').addEventListener('click', function() {
    document.getElementById('man-shop').style.display = 'none';  
    document.getElementById('woman-shop').style.display = 'flex'; 
});



document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-buy")) {
        const producto = e.target.dataset.product; // Recupera el valor del atributo data-product
        const precio = parseFloat(e.target.dataset.price); // Recupera el valor del atributo data-price
        agregarProducto(producto, precio); // Llama a la función con los datos del producto
    }
});