const params = new URLSearchParams(window.location.search);
const id = params.get('id');

let cartStr = localStorage.getItem('cart') || '[]';
let cartArray = JSON.parse(cartStr);

const product = {
    name: '',
    imageUrl: '',
    id: '',
    price: 0,
    alt: '',
    color: '',
    qty: 1
}

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        createCard(data)
        initProduct(data);
    })
    .catch((error) =>console.log(error))

    function createCard(object){
        const imgHolder = document.getElementsByClassName('item__img')[0];
        const image = document.createElement('img');
        image.setAttribute ('src', object.imageUrl);
        image.setAttribute ('alt', `picture of ${object.name}`);
        imgHolder.appendChild(image);

        const headingHolder = document.getElementById('title');
        const heading = document.createElement('h1');
        heading.innerText = object.name;
        headingHolder.appendChild(heading);

        const priceHolder = document.getElementById('price'); 
        const price = document.createElement('price');
        price.innerText = object.price;
        priceHolder.appendChild(price);

        const descriptionHolder = document.getElementById('description');
        const description = document.createElement('description');
        description.innerText = object.description;
        descriptionHolder.appendChild(description);


       

        addPulldown(object.colors);
        updateQuantity();
        
    }

    function handlePullDown(event){
        console.log(event.target.value);
        product.color = event.target.value;

        console.log('product', product);
    }

    function addPulldown(colorArray){
        const pulldown = document.getElementById('colors');
        pulldown.addEventListener('change', handlePullDown);

        for (let i=0; i<colorArray.length; i++){
            const colorList = document.createElement('option');
            colorList.setAttribute('value', colorArray[i]);
            colorList.innerText = colorArray[i];
            console.log(colorArray[i]);
            
            
            pulldown.appendChild(colorList);
        }
    }

    function updateQuantity(){
        const quantity = document.getElementById('quantity');
        quantity.addEventListener('change', handleQuantity);
    }

    function handleQuantity(event) {
        console.log(event.target.value);
        product.qty = event.target.value;
    }
        

         


    const button = document.getElementById('addToCart');
    button.addEventListener('click', checkCart);

    function initProduct(dataObj) {
        product.name = dataObj.name;
        product.imageUrl = dataObj.imageUrl;
        product.id = dataObj._id;
        product.price = dataObj.price
        product.alt = dataObj.altTxt
    }

    // function that handles add to cart click
    function checkCart(event) {
        let addToCart = true;
        console.log(event.target, addToCart);
        // cartArray.push(product);
       

        for (let i = 0; i < cartArray.length; i++) {
            if (product.id === cartArray[i].id && 
                product.color === cartArray[i].color){
                    cartArray[i].qty = product.qty;
                    addToCart = false;
                }
            
        }

        if (addToCart) {
            console.log(cartArray);
            cartArray.push(product);
        }

        syncCart();

    }

    function syncCart(){
        cartStr = JSON.stringify(cartArray);
        localStorage.setItem('cart', cartStr);
        cartArray = JSON.parse(localStorage.getItem('cart'));
    }
