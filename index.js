let carts = document.querySelectorAll('.add-cart');


let products = [
    {
        name: 'Lawson Sofa',
        tag: 'Lawson Sofa',
        price: 24,
        incart: 0
    },
    {
        name: 'Cabriole Sofa',
        tag: 'Cabriole Sofa',
        price: 25,
        incart: 0
    },
    {
        name: 'Settee Sofa',
        tag: 'Settee Sofa',
        price: 27,
        incart: 0
    },
    {
        name: 'Modular Sofa',
        tag: 'Modular Sofa',
        price: 26,
        incart: 0
    },
    {
        name: 'Daybed Sofa',
        tag: 'Daybed Sofa',
        price: 24,
        incart: 0
    },
    {
        name: 'Chaise Sofa',
        tag: 'Chaise Sofa',
        price: 25,
        incart: 0
    },
    {
        name: 'Tuxedo Sofa',
        tag: 'Tuxedo Sofa',
        price: 28,
        incart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);

}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }
    else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }

    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {

    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {// cartNumbers(products[i]);
    // totalCost(products[i]);
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector(".shop-cart-products");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <!-- <div id="${item.tag}"> -->
                <div class="product">
                    <ion-icon class="removeBtn" name="close-circle-outline"></ion-icon>
                    <img src="./assets/images/${item.tag}.png">
                    <span>${item.name}</span>
                </div>
                <div class="prices" >$${item.price}.00</div>
                <div class="quantity" >
                    <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
                    <span>${item.incart}</span>
                    <ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>
                </div>
                <div class="total">
                    $${item.incart * item.price}.00
                </div>
            <!-- </div> -->
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}.00
                </h4>
            `;

    }

    // let removeBtn = document.getElementsByClassName('removeBtn');
    // Array.from(removeBtn).forEach(cur => {
    //     cur.addEventListener('click', (e) => {
    //         // delete cartItems[e.target.parentElement.parentElement.id];
    //         // localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    //         console.log('price:', parseFloat(e.target.parentElement.nextSibling.nextSibling.innerText.split('$')[1]));
            
    //         displayCart();
    //     })
    // })




    // let itemDec = document.getElementsByClassName('.decrease');
    // Array.from(itemDec).forEach(cur => {
    //     cur.addEventListener('click', (e) => {
    //         cartItems[products.tag].incart -= 1;
    //         localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    //         displayCart();

    //     })
    // })

}

onLoadCartNumbers();
displayCart();
