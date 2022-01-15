let cartStr = localStorage.getItem('cart') || '[]';
let cartArray = JSON.parse(cartStr);
console.log('cartArray', cartArray);

function createCards (cartArray) {
    const cartItems = document.getElementById('cart__items');

    for (let index = 0; index < cartArray.length; index++) {
    
        const cartItem = document.createElement('article');
        cartItem.classList.add('cart__item');
      
        const imgHolder = document.createElement('div');
        imgHolder.classList.add('cart__item__img');
        const img = document.createElement('img');
        img.setAttribute('src', cartArray[index].imageUrl);
        img.setAttribute('alt', cartArray[index].altTxt);
        imgHolder.appendChild(img);

        const itemHolder = document.createElement('div');
        itemHolder.classList.add('cart__item__content');

        const headingHolder = document.createElement('div');
        headingHolder.classList.add('cart__item__content__titlePrice');
        const heading = document.createElement('h2');
        heading.innerText = cartArray[index].name;
        const price = document.createElement('p');
        price.innerText = cartArray[index].price;
        headingHolder.appendChild(heading);
        headingHolder.appendChild(price);
        itemHolder.appendChild(headingHolder);

        const settings = document.createElement('div');
        settings.classList.add('cart__item__content__settings');
        const qtyHolder = document.createElement('div');
        qtyHolder.classList.add('cart__item__content__settings__quantity');
        const qty = document.createElement('p');
        qty.innerText = cartArray[index].qty;
        qtyHolder.appendChild(qty);
        settings.appendChild(qtyHolder);
        itemHolder.appendChild(settings);


        cartItem.appendChild(imgHolder);
        cartItem.appendChild(itemHolder);
        cartItems.appendChild(cartItem);




        

        // const qtyHolder = document.getElementsByClassName('cart__item__content__settings')[0];
        // const qty = document.createElement('p');
        // qtyHolder.appendChild(qty);

        // productHolder.appendChild(headingHolder);
        // productHolder.appendChild(qtyHolder);

        // cartItem.appendChild(productHolder);
        // cartItem.appendChild(imgHolder);
    }
}

createCards(cartArray);
