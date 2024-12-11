# Proyecto: Tienda de Ropa con Carrito de Compras

Este proyecto es una **página web funcional** para una tienda de ropa que incluye un **sistema de carrito de compras dinámico**. El objetivo principal es simular una experiencia de compra real en línea, desde la selección de productos hasta el envío del formulario con los datos de compra.

## Características Principales

1. **Catálogo de Productos:**

   - Muestra una lista de productos disponibles con su nombre, precio y botón para agregar al carrito.
   - Alterna los productos disponibles por categoría según la selección del usuario entre productos para hombres y productos para mujeres.

2. **Carrito de Compras Dinámico:**

   - Los productos seleccionados se agrupan en el carrito.
   - Se calcula automáticamente la cantidad de cada producto y el precio total.
   - Permite agregar o quitar unidades de un producto directamente desde el carrito.

3. **Resumen de Compra:**

   - Muestra el desglose de productos agrupados por nombre, con su cantidad y precio.
   - Calcula el precio total a pagar en tiempo real.

4. **Formulario de Compra:**

   - Incluye campos para ingresar los datos de contacto del cliente.
   - El carrito se envía junto con los datos del cliente a través de un formulario.

5. **Persistencia Local:**

   - El carrito se almacena en **LocalStorage**, por lo que los productos seleccionados se conservan aunque se recargue la página.

## Tecnologías Utilizadas

- **HTML5**: Estructura de la página.
- **CSS3**: Estilización de la interfaz.
- **JavaScript**: Lógica dinámica del carrito y manejo del DOM.

## Estructura del Proyecto

```plaintext
├── index.html       # Página principal
├── compra.html       # Página de pago
├── css/
│   └── styles.css  # Estilos de la página principal
│   └── styles.css  # Estilos de la página de compra
├── js/
│   └── tienda.js  # Lógica de la tienda
│   └── compra.js  # Lógica del carrito y formulario
└── img/        # Imágenes y recursos
```

## Instalación y Uso

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Oliver-92/Beverly-Indumentaria
   ```

2. **Abrir el archivo `index.html` en un navegador:**

   - Simplemente haz doble clic en el archivo o utiliza una extensión como **Live Server** si trabajas en un entorno de desarrollo.

3. **Agregar productos al carrito:**

   - Haz clic en el botón "Agregar al carrito" debajo de cada producto.

4. **Revisar el carrito:**

   - Consulta los productos seleccionados, ajusta cantidades y revisa el total.

5. **Completar el formulario:**

   - Llena los campos de contacto y envía el formulario para completar la compra.

## Funcionalidades Avanzadas

- **Agrupación de productos:** Los productos iguales se agrupan en una sola entrada dentro del carrito, indicando su cantidad.
- **Botones de ajuste:** Puedes aumentar o disminuir la cantidad de un producto directamente en el resumen.
- **Manejo de errores:** Se asegura que todos los campos del formulario estén completos antes de permitir el envío.

## Próximas Mejoras (To-Do)

- Implementar un sistema de login y registro de usuarios.
- Conectar la aplicación a una base de datos para gestionar los productos y los pedidos.
- Integrar pasarelas de pago como PayPal o Stripe.
- Añadir un sistema de filtros y búsqueda para los productos.

## Contribuciones

Este proyecto está abierto a mejoras y contribuciones. Si deseas contribuir:

1. Haz un fork del repositorio.
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`).
3. Haz commit de tus cambios (`git commit -m 'Agregada nueva característica'`).
4. Haz push a tu rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Autor

Este proyecto fue desarrollado por **Ezequiel Oliver**. Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- **GitHub:** [https://github.com/Oliver-92](https://github.com/Oliver-92)
- **LinkedIn:** [https://linkedin.com/in/ezequiel-oliver](https://linkedin.com/in/ezequiel-oliver)

---

© 2024. Todos los derechos reservados.

