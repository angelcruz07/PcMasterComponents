// Variables globales
let contProduct = null;

// Función para mover el producto
function moveProduct(event) {
  contProduct = event.target;
}

// // Función para agregar el producto al carrito
function addProductToCart(imageSrc) {
  const cartItems = document.getElementById('cart-items');
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = imageSrc;
  li.appendChild(img);
  cartItems.appendChild(li);
}



// Configuración del drop en el contenedor del carrito
const cart = document.querySelector('.cart');
cart.addEventListener('dragover', (event) => {
  event.preventDefault(); // Permite soltar el elemento en el contenedor
});

cart.addEventListener('drop', (event) => {
  event.preventDefault(); // Previene el comportamiento predeterminado del drop
  const imageSrc = contProduct.src;
  addProductToCart(imageSrc);
});



// Automatización de todos los productos
const products = document.getElementsByClassName('article-item');

for (const product of products) {
  product.addEventListener('dragstart', moveProduct);
}


// Evento clic para los botones "Añadir al carro"
const buttons = document.getElementsByClassName('btn-cart');

for (const button of buttons) {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const imageSrc = event.target.parentElement.querySelector('.article-img').src;
        addProductToCart(imageSrc);
    });
}


// Suma del precio

// Capturamos el elemento donde se mostrará el total
const totalElement = document.getElementById("total");

// Capturamos el contenedor del carrito y los botones de agregar
const cartItems = document.getElementById("cart-items");
const buttonsAgregar = document.getElementsByClassName("btn-cart");

// Creamos una variable para almacenar el total actual
let total = 0;

// Función para formatear el precio con comas separadoras y moneda mexicana
function formatPrice(price) {
  return price.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    currencyDisplay: "symbol",
  });
}

// Función para sumar el precio al total
function addPriceToTotal(price) {
  total += price;
  totalElement.textContent = formatPrice(total);
}

// Recorremos cada botón para agregar un evento al hacer clic
for (const button of buttonsAgregar) {
  button.addEventListener("click", () => {
    // Obtenemos el precio del producto desde el atributo "data-price"
    const precioProducto = parseInt(button.getAttribute("data-price"));
    addPriceToTotal(precioProducto);
  });
}


const articleItems = document.getElementsByClassName("article-item");

// Recorremos cada elemento con la clase "article-item" para agregar el evento de arrastrar
for (const articleItem of articleItems) {
  articleItem.addEventListener("dragstart", drag);
}

// Función para iniciar el arrastre del producto
function drag(event) {
  const precioProducto = parseInt(event.target.getAttribute("data-price"));
  event.dataTransfer.setData("text/plain", precioProducto);
}