const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// getting cart
let cartStr = localStorage.getItem('cart') || '[]';
let cartArray = JSON.parse(cartStr);

// creating object that represents product
const product = {
    name: '',
    id: '',
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

        const priceHolder = document.getElementById('price'); const price = document.createElement('price');
        price.innerText = object.price;
        priceHolder.appendChild(price);

        const descriptionHolder = document.getElementById('description');
        const description = document.createElement('description');
        description.innerText = object.description;
        descriptionHolder.appendChild(description);

        const pulldown = document.getElementById('colors');

        addPulldown(object.colors);

        pulldown.addEventListener('change', handlePullDown)
    }

    function handlePullDown(event){
        console.log(event.target.value);
        product.color = event.target.value;

        console.log('product', product);
    }

    function addPulldown(colorArray){
        const container = createElement('');
        for (let index=0; index<colorArray.length; i++){
            const colorList = document.createElement('')
            colorList = `<option value="${colorArray[index].colors}">${colorArray[index].colors}"</option> `;

            
            colorList.appendChild(container);
        }
    }
        

         


    const button = document.getElementById('addToCart');
    button.addEventListener('click', checkCart);

    function initProduct(dataObj) {
        product.name = dataObj.name
    }

    // function that handles add to cart click
    function checkCart(event) {
        console.log(event.target)
    }