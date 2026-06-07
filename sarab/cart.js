setTimeout(() => {
    const btnEl = document.querySelectorAll('.addProduct');
    // console.log(btnEl);
    btn = '';
    let elementId = null;
        btnEl.forEach(el => {
            el.addEventListener('click', (event) => {
                elementId = event.currentTarget.dataset.id;
                console.log('EventListener1', elementId);

                const productToCart = {
                    'qty': 1,
                    'product_id': parseInt(elementId)
                }

                async function productCart() {
                    try {
                        const token = localStorage.getItem('jwt_token');
                        console.log(token)
                        const api = await fetch('http://127.0.0.1:8000/api/cart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization':  `Bearer ${token}`
                            },
                            body: JSON.stringify(productToCart)
                        })

                        if(!api.ok) {
                            throw new Error(`HTTP error! Status: ${api.status}`);            
                        }

                        const { data } = await api.json()
                        console.log('id Cart: ', data.id)
                        localStorage.setItem('id_cart', data.id);
                        console.log('EventListener2', data)
                    } catch (error) {
                        console.log('Fetch Failed', error.message);
                    }
                }

                productCart();
            });        
        });

let dataParams = localStorage.getItem('id_cart');
const dataCart = localStorage.getItem('user');
// console.log('userss', JSON.parse(dataCart));

const getCart = `http://127.0.0.1:8000/api/cart/${dataParams.toString()}`;
const addCart = `http://127.0.0.1:8000/api/cart`;
const getProducts = `http://127.0.0.1:8000/api/product`;

const checkout = `http://127.0.0.1:8000/api/checkout/${dataParams.toString()}`;

async function getCartData() {
    try {
        const api = await fetch(getCart);        

        if(!api) {
            throw new Error('No product data available yet');
        }

        const { data } = await api.json();
        RenderCart(data)
        // console.log('Cart Data:', data)

        // const token = localStorage.getItem('jwt_token')
        // console.log(token)

    } catch (error) {
        console.error('Fetch Failed:', error.message);
        document.getElementById('data-cart').innerHTML = 'Failed to load data.';
    }
}

const btnCk = document.querySelector('.btn-checkout');

const clickHandler = () => {
    async function checkoutCart() {
        try {
            const token = localStorage.getItem('jwt_token');
            // console.log(token)
            const api = await fetch(checkout, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const { data } = await api.json();
            // console.log('Checkout', data)
            window.location.replace(data);
        } catch (error) {
            console.error('Fetch Failed:', error.message);
        }
    }

    checkoutCart();
};

btnCk.addEventListener('click', clickHandler);

async function getProductsData() {
    try {
        const api = await fetch(getProducts);
        const { data } = await api.json();
        // console.log('Products data: ', data)

        return data;
    } catch (error) {

    }
}

function RenderCart(cart) {
    // console.log(cart.products)
    const container = document.getElementById('data-cart');
    let htmlContent = '';

    cart.products.forEach(cart => {
        htmlContent += `
        <div class="card">
            <div>
               <h5>${cart.name}</h5>
               <p>${cart.price}</p>
            </div>
            <div class="items-center">
               
            </div>
        </div>            
        `;
    });

    container.innerHTML = htmlContent;
}

getProductsData();
getCartData();

}, 1500);
